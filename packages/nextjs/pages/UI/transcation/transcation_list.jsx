import TListItem, { TranscationType } from "./components/t_list_item";
import TPendingApprovalList from "./components/t_pending_approval_list";

export default function TranscationsList() {
  return (
    <div className="flex flex-col pb-16">
      <PendingApprovalSection></PendingApprovalSection>
      <InCompleteTranscation></InCompleteTranscation>
      <CompletedTranscation></CompletedTranscation>
    </div>
  );
}

function InCompleteTranscation() {
  return (
    <div className="flex flex-col mb-3">
      <div className="text-lg font-bold px-4 pt-3">In Complete</div>
      {[...Array(2)].map((x, i) => (
        <TListItem transcationType={i == 1 ? TranscationType.OutGoing : TranscationType.InComing}></TListItem>
      ))}
    </div>
  );
}

function CompletedTranscation() {
  return (
    <div className="flex flex-col mb-3">
      <div className="text-lg font-bold px-4 pt-3">Complete</div>
      {[...Array(3)].map((x, i) => (
        <TListItem transcationType={i == 1 ? TranscationType.InComing : TranscationType.OutGoing}></TListItem>
      ))}
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
