export const TranscationType = {
  OutGoing: "outgoing",
  InComing: "incoming",
};

export default function TListItem({ transcationType = TranscationType.InComing }) {
  const address = "0x1348D26849889658880ae2b568544f1535ab0852";
  const amount = "100";
  const fee = "$0.00005";
  const chain = "Gnosis";
  const comment = "I know what you did last summer!";
  return (
    <div class="collapse collapse-arrow bg-base-200 border-b-[0.5px]">
      <input type="checkbox" name="my-accordion-2" />
      <div class="collapse-title flex flex-row w-full place-content-between ">
        <AddressAndMessage p_address={address}></AddressAndMessage>
        <AmountRecievedOrSend p_amount={amount} p_transcationType={transcationType}></AmountRecievedOrSend>
      </div>
      <div class="collapse-content opacity-60">
        <ExpandedComponent p_fee={fee} p_chain={chain} p_comment={comment}></ExpandedComponent>
      </div>
    </div>
  );
}

function ExpandedComponent({ p_fee, p_chain, p_comment }) {
  let commentTag, feeTag, chainTag;
  if (p_comment) {
    commentTag = <div> Comment : {p_comment}</div>;
  }
  if (p_fee) {
    feeTag = <div> fee : {p_fee}</div>;
  }
  if (p_chain) {
    chainTag = <div> chain : {p_chain}</div>;
  }
  return (
    <div className="flex flex-col text-xs font-extralight p-3">
      {chainTag}
      {feeTag}
      {commentTag}
    </div>
  );
}

function AmountRecievedOrSend({ p_amount, p_transcationType }) {
  return (
    <div
      className={`text-2xl flex place-self-center ${
        p_transcationType == TranscationType.InComing ? "text-green-500" : "text-red-500"
      }`}
    >
      {p_transcationType == TranscationType.InComing ? "+" : "-"} {p_amount}
    </div>
  );
}

function AddressAndMessage({ p_address, message }) {
  return (
    <div className="text-xs pr-4 flex flex-col">
      <div className="w-20 text-ellipsis text-sm truncate ">{p_address}</div>
      <div className="font-extralight">You received money</div>
      <div className="font-extralight"> 15.10.2023</div>
    </div>
  );
}
