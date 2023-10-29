import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useState } from "react";
import { useScaffoldContractWrite } from "~~/hooks/scaffold-eth";
import AddCommentAndCameraIcon from "./components/comment_camera";
import RequestInfoComponents from "./components/request_info";
import SelectAddress from "./components/select_address";

export default function FinalPage() {
  const searchParams = useSearchParams();
  //   const searchParams = new URLSearchParams(props.location.search);
  let name = searchParams.get("name");
  let amount = searchParams.get("amount");
  let payerAddress = searchParams.get("address");
  let takerAddress = "0xe7f1725E7734CE288F8367e1Bb143E90bb3F0512";
  let comment = "Eth London";

  const [inputText, setInputText] = useState("");
  const [transferSuccess, setTransferSuccess] = useState(false);

  const handleInputChange = text => {
    setInputText(text);
  };

  if (!amount) {
    amount = "10";
  }
  if (!payerAddress) {
    payerAddress = "0x1348D26849889658880ae2b568544f1535ab0852";
  }

  const { writeAsync, isLoading, isMining } = useScaffoldContractWrite({
    contractName: "EscrowSingleChain",
    functionName: "requestPayment",
    args: [takerAddress, payerAddress, amount, inputText],
    // For payable functions
    value: 0, //parseEther(amount),
    // The number of block confirmations to wait for before considering transaction to be confirmed (default : 1).
    blockConfirmations: 1,
    // The callback function to execute when the transaction is confirmed.
    onBlockConfirmation: txnReceipt => {
      console.log("Transaction blockHash", txnReceipt.blockHash);
    },
  });

  return (
    <div className="flex flex-col w-full">
      {isLoading ? (
        <div className="flex flex-col pt-10 place-content-center place-items-center justify-items-center">
          <div className="mr-4"> Transfering the Amount </div>
          <span className=" ml-3 loading loading-dots loading-lg"> </span>
        </div>
      ) : (
        <div></div>
      )}

      <BackButtonWithTitle></BackButtonWithTitle>

      <RequestInfoComponents
        p_address={transferSuccess ? "" : payerAddress}
        p_amount={amount}
        p_userName={name}
        transferSuccess={transferSuccess}
      ></RequestInfoComponents>
      <div className={transferSuccess ? "invisible" : "visible"}>
        {" "}
        <AddCommentAndCameraIcon onInputChange={handleInputChange}></AddCommentAndCameraIcon>
      </div>
      <div className={transferSuccess ? "invisible" : "visible"}>
        <div className="px-4">
          <SelectAddress p_address={takerAddress}></SelectAddress>
        </div>
      </div>
      <div
        onClick={async () => {
          await writeAsync();
          await new Promise(f => setTimeout(f, 300));
          setTransferSuccess(true);
        }}
      >
        <RequestButton></RequestButton>
      </div>
    </div>
  );
}

function BackButtonWithTitle() {
  return (
    <div className="flex flex-row place-items-center px-2 pt-4 pb-2">
      <Link href="./">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          className="w-6 h-6 mr-4"
        >
          <path stroke-linecap="round" stroke-linejoin="round" d="M15.75 19.5L8.25 12l7.5-7.5" />
        </svg>
      </Link>
      <div className="font-bold text-lg">Request money</div>
    </div>
  );
}

function RequestButton() {
  return <div className="w-full btn">Request</div>;
}
