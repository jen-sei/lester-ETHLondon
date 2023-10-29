//SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;
import "@openzeppelin/contracts/token/ERC20/IERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract EscrowSingleChain is Ownable {
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
	}

	mapping(uint256 => Escrow) public escrows;
	uint256 public escrowCount;
	IERC20 public paymentCurrency;

	constructor(IERC20 _token) Ownable() {
		paymentCurrency = _token;
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
		string calldata _comment
	) external {
		escrows[escrowCount] = Escrow(
			_payer,
			_taker,
			_amount,
			PaymentState.OPEN,
			_comment
		);
		escrowCount++;
	}

	function depositPayment(
		uint256 _escrowId
	) external doesEscrowExist(_escrowId) {
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
	) external doesEscrowExist(_escrowId) {
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
	) external doesEscrowExist(_escrowId) {
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
}