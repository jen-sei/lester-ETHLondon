import Link from "next/link";
import { useSearchParams } from "next/navigation";

export default function SelectUser() {
  const searchParams = useSearchParams();
  var data = searchParams.get("amount");
  return (
    <div className="flex flex-col">
      <input type="text" placeholder="Type here" className=" input input-bordered w-full max-w-xl my-3 mx-2" />
      <Sugesstion amount={data}></Sugesstion>
    </div>
  );
}

function Sugesstion({ amount }) {
  return (
    <div className="m-2 grid grid-cols-4 gap-2">
      <Item p_user_name={"John"} p_amount={amount}></Item>
    </div>
  );
}

function Item({ p_user_name, p_amount = "100", p_address = "0x1348D26849889658880ae2b568544f1535ab0852" }) {
  return (
    <Link
      href={`/final_page?name=${p_user_name}&amount=${p_amount}&address=${p_address}`}
      className="h-10 w-full rounded flex  card bg-base-300 place-content-center items-center justify-items-center "
    >
      {p_user_name}
    </Link>
  );
  
}
