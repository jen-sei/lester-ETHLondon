export default function TPendingApprovalList({ escrowID, p_amount, p_escrowId, refreshTranscation }) {
  // const { writeAsync, isLoading, isMining } = useScaffoldContractWrite({
  //   contractName: "EscrowSingleChain",
  //   functionName: "confirmPayment",
  //   args: [p_escrowId],
  //   // For payable functions
  //   value: 0, //parseEther(amount),
  //   // The number of block confirmations to wait for before considering transaction to be confirmed (default : 1).
  //   blockConfirmations: 1,
  //   // The callback function to execute when the transaction is confirmed.
  //   onBlockConfirmation: txnReceipt => {
  //     console.log("Transaction blockHash", txnReceipt.blockHash);
  //   },
  // });

  async function handleApproval() {
    // await writeAsync();
    // refreshTranscation();
  }
  return (
    <div className="flex flex-row place-content-between collapse px-5 py-3 shadow-sm ">
      <div className="flex flex-col flex-1 font-light text-sm">
        <div className="w-20 text-ellipsis text-sm truncate ">{escrowID}</div>
        <div className="w-20 text-ellipsis text-sm  ">{p_amount} waiting for confirmation</div>
      </div>
      <div className="flex flex-row ">
        <div
          class="grid h-10 w-10 flex-grow card bg-base-300 rounded-none place-items-center"
          onClick={refreshTranscation}
        >
          YES
        </div>
        <div class="divider divider-horizontal p-0  text-xs font-thin"></div>
        <div class="grid h-10 w-10 flex-grow card bg-base-300 rounded-none place-items-center">NO</div>
      </div>
    </div>
  );
}
