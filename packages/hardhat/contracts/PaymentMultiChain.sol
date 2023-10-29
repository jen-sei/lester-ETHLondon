//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";
import "./IWormholeRelayer.sol";
import "./IWormholeReceiver.sol";

contract PaymentMultiChain is Ownable, IWormholeReceiver {
	enum PaymentState {
		OPEN,
		PAID,
		COMPLETED,
		CANCELED
	}

	struct Escrow {
		address buyer;
		address payable seller;
		uint256 amount;
		PaymentState escrowStatus;
		string comment;
		uint16 sourceChain;
	}

	mapping(uint256 => Escrow) public escrows;
	uint256 public escrowCount;
	IERC20 public paymentCurrency;

	constructor(address _wormholeRelayer, IERC20 _token) Ownable() {
		paymentCurrency = _token;
        wormholeRelayer = IWormholeRelayer(_wormholeRelayer);
	}

    function getEscrowsForUser(address user) public view returns (Escrow[] memory) {
        uint256 escrowAmount = 0;
        for (uint256 i = 0; i < escrowCount; i++) {
            if (escrows[i].buyer == user || escrows[i].seller == user) {
                escrowAmount++;
            }
        }
        Escrow[] memory buyerEscrows = new Escrow[](escrowAmount);
        uint256 index = 0;
        for (uint256 i = 0; i < escrowCount; i++) {
            if (escrows[i].buyer == user || escrows[i].seller == user) {
                buyerEscrows[index] = escrows[i];
                index++;
            }
        }
        return buyerEscrows;
    }

	function requestPayment(
		address payable _taker,
		address payable _payer,
		uint256 _amount,
		string memory _comment,
		uint16 _sourceChain
	) public {
		escrows[escrowCount] = Escrow(
			_payer,
			_taker,
			_amount,
			PaymentState.OPEN,
			_comment,
			_sourceChain
		);
		escrowCount++;
	}

	function depositPayment(
		uint256 _escrowId
	) public doesEscrowExist(_escrowId) {
		Escrow storage escrow = escrows[_escrowId];
		require(
			escrow.escrowStatus == PaymentState.OPEN,
			"Funds were released before"
		);
		require(
			msg.sender == escrow.buyer,
			"Only the buyer can confirm"
		);
		escrow.escrowStatus = PaymentState.PAID;
		paymentCurrency.transferFrom(msg.sender, address(this), escrow.amount);
	}

	function confirmPayment(
		uint256 _escrowId
	) public doesEscrowExist(_escrowId) {
		Escrow storage escrow = escrows[_escrowId];
		require(
			escrow.escrowStatus == PaymentState.PAID,
			"Funds released already"
		);
		require(
			msg.sender == escrow.buyer,
			"Only the buyer can confirm"
		);
		escrow.escrowStatus = PaymentState.COMPLETED;
		paymentCurrency.transfer(escrow.seller, escrow.amount);
	}

	function cancelPayment(
		uint256 _escrowId
	) public doesEscrowExist(_escrowId) {
		Escrow storage escrow = escrows[_escrowId];
		require(
			(msg.sender == escrow.buyer && (escrow.escrowStatus == PaymentState.PAID || escrow.escrowStatus == PaymentState.OPEN)) || (msg.sender == escrow.seller && escrow.escrowStatus == PaymentState.OPEN),
			"Only the buyer or seller can cancel"
		);
		if (escrow.escrowStatus == PaymentState.PAID && msg.sender == escrow.buyer) {
			paymentCurrency.transfer(escrow.buyer, escrow.amount);
		}
		escrow.escrowStatus = PaymentState.CANCELED;
	}

	modifier doesEscrowExist(uint256 _escrowId) {
		require(
			_escrowId < escrowCount,
			"Payment request for this ID does not exist"
		);
		_;
	}

	/**
		WORMHOLE INTEGRATION
	**/

	event GreetingReceived(string greeting, uint16 senderChain, address sender);

    uint256 constant GAS_LIMIT = 600_000;

    IWormholeRelayer public immutable wormholeRelayer;

    string public latestGreeting;
	address public latestAddress;

    function quoteCrossChainGreeting(uint16 targetChain) public view returns (uint256 cost) {
        (cost,) = wormholeRelayer.quoteEVMDeliveryPrice(targetChain, 0, GAS_LIMIT);
    }

	mapping(bytes32 => bool) public seenDeliveryVaaHashes;

    function receiveWormholeMessages(
        bytes memory payload,
        bytes[] memory,
        bytes32,
        uint16 sourceChain,
        bytes32 deliveryHash 
    ) public payable override {
        require(msg.sender == address(wormholeRelayer), "Only relayer allowed");

        require(!seenDeliveryVaaHashes[deliveryHash], "Message already processed");
        seenDeliveryVaaHashes[deliveryHash] = true;

        // (string memory action, address sender) = abi.decode(payload, (string, address));
		(string memory action, address payable sender, bytes memory data) = abi.decode(payload, (string, address, bytes));
		// if (keccak256(abi.encodePacked(action)) == keccak256(abi.encodePacked("REQUEST"))) {
		// 	address zeroAddress;
		// 	abi.decode(data, (address));
        // 	latestGreeting = action;
		// 	latestAddress = zeroAddress;
		// }

		if (keccak256(abi.encodePacked(action)) == keccak256(abi.encodePacked("REQUEST"))) {
			(address payable payer, uint256 amount, string memory comment) = abi.decode(data, (address, uint256, string));
				requestPayment(
				 sender,
				 payer,
				 amount,
				 comment,
				 sourceChain
			);
		}

		if (keccak256(abi.encodePacked(action)) == keccak256(abi.encodePacked("DEPOSIT"))) {
			// ToDo - add token transfer
			(uint256 escrowId) = abi.decode(data, (uint256));
			depositPayment(escrowId);
		}

		if (keccak256(abi.encodePacked(action)) == keccak256(abi.encodePacked("CONFIRM"))) {
			(uint256 escrowId) = abi.decode(data, (uint256));
			confirmPayment(escrowId);
		}

		if (keccak256(abi.encodePacked(action)) == keccak256(abi.encodePacked("CANCEL"))) {
			(uint256 escrowId) = abi.decode(data, (uint256));
			cancelPayment(escrowId);
		}

        emit GreetingReceived(action, sourceChain, sender);
    }

	function crossChainActionPayment(uint16 targetChain, address targetAddress, string memory action, address payable payer, uint256 amount, string memory comment) public payable {
        uint256 cost = quoteCrossChainGreeting(targetChain);
        require(msg.value == cost);
        wormholeRelayer.sendPayloadToEvm{value: cost}(
            targetChain,
            targetAddress,
            abi.encode(action, msg.sender, abi.encode(payer, amount, comment)),
            0,
            GAS_LIMIT
        );
    }
}