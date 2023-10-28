import AddCommentAndCameraIcon from "./components/comment_camera";
import RequestInfoComponents from "./components/request_info";
import SelectAddress from "./components/select_address";

export default function FinalPage(props) {
  //   const searchParams = new URLSearchParams(props.location.search);
  console.log(props);
  const name = "John";
  const amount = "100";
  const address = "0x1348D26849889658880ae2b568544f1535ab0852";
  return (
    <div className="flex flex-col w-full">
      <BackButtonWithTitle></BackButtonWithTitle>
      <RequestInfoComponents p_address={address} p_amount={amount} p_userName={name}></RequestInfoComponents>
      <AddCommentAndCameraIcon></AddCommentAndCameraIcon>
      <div className="px-4">
        <SelectAddress p_address={address}></SelectAddress>
      </div>
      <RequestButton></RequestButton>
    </div>
  );
}

function BackButtonWithTitle() {
  return (
    <div className="flex flex-row place-items-center px-2 pt-4 pb-2">
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
      <div className="font-bold text-lg">Request money</div>
    </div>
  );
}

function RequestButton() {
  return <div className="w-full btn">Request</div>;
}
