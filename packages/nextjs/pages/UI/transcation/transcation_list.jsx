import { useAccount } from "wagmi";
import { useScaffoldContractRead } from "~~/hooks/scaffold-eth";
import TListItem, { TranscationType } from "./components/t_list_item";
import TPendingApprovalList from "./components/t_pending_approval_list";

let currentLoginAddress;
// 14: Sello 6 : Fugi
export default function TranscationsList() {
  const { address } = useAccount();
  currentLoginAddress = address;
  const { data: totalTranscation, isLoading: isLoadingList } = useScaffoldContractRead({
    contractName: "EscrowSingleChain",
    functionName: "getEscrowsForUser",
    args: ["0x1348D26849889658880ae2b568544f1535ab0852"],
  });
  let openTranscation, completedTranscationList;
  console.log("isLoadingList", isLoadingList);
  console.log("totalTranscation", totalTranscation);
  if (!isLoadingList) {
    openTranscation = filterArrayByEscrowStatus(totalTranscation, "0");
    completedTranscationList = filterArrayByEscrowStatus(totalTranscation, "2");
    console.log("openTranscation", openTranscation);
  }

  return (
    <div className="flex flex-col pb-16">
      <PendingApprovalSection></PendingApprovalSection>
      <InCompleteTranscation list={openTranscation}></InCompleteTranscation>
      <CompletedTranscation list={completedTranscationList}></CompletedTranscation>
    </div>
  );
}

function InCompleteTranscation({ list }) {
  if (!list) {
    return <div></div>;
  }
  return (
    <div className="flex flex-col mb-3">
      <div className="text-lg font-bold px-4 pt-3">In Complete</div>
      {list.map((data, i) => (
        <TListItem
          transcationType={getTranscationType(data)}
          amount={data.amount.toString()}
          comment={data.comment}
          address={data.seller}
        ></TListItem>
      ))}
    </div>
  );
}

function CompletedTranscation({ list }) {
  let render;
  console.log("!list", list);
  if (list === undefined || list.length == 0) {
    render = <div className="pt-3"> No Completed Transcation</div>;
  } else {
    render = (
      <div>
        {list.map((data, i) => (
          <TListItem
            transcationType={getTranscationType(data)}
            amount={data.amount.toString()}
            comment={data.comment}
            address={data.seller}
          ></TListItem>
        ))}
      </div>
    );
  }
  return (
    <div className="flex flex-col mb-3 px-4">
      <div className="text-lg font-bold  pt-3">Complete</div>
      {render}
    </div>
  );
}

function PendingApprovalSection() {
  return (
    <div className="flex flex-col mb-3">
      <div className="text-lg font-bold px-4 pt-3">Approval</div>
      {[...Array(1)].map((x, i) => (
        <TPendingApprovalList></TPendingApprovalList>
      ))}
    </div>
  );
}

function filterArrayByEscrowStatus(inputArray, targetStatus) {
  if (!inputArray) return inputArray;
  // Use the filter method to create a new array that includes only objects with the target escrowStatus.
  const filteredArray = inputArray.filter(item => item.escrowStatus == targetStatus);

  return filteredArray;
}

function getTranscationType(transcation) {
  return transcation.buyer == currentLoginAddress ? TranscationType.OutGoing : TranscationType.InComing;
}
