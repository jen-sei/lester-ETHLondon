import Link from "next/link";

export default function SelectUser() {
  return (
    <div className="flex flex-col">
      <input type="text" placeholder="Type here" className=" input input-bordered w-full max-w-xl my-3 px-2" />
      <Sugesstion></Sugesstion>
    </div>
  );
}

function Sugesstion() {
  return (
    <div className="m-2 grid grid-cols-4 gap-2">
      <Item p_user_name={"John"}></Item>
      <Item p_user_name={"Alice"}></Item>
      <Item p_user_name={"Bob"}></Item>
      <Item p_user_name={"Suzan"}></Item>
      <Item p_user_name={"Sarah"}></Item>
      <Item p_user_name={"David"}></Item>
    </div>
  );
}

function Item({ p_user_name, p_amount = "100" }) {
  return (
    <Link
      href={`/final_page?name=${p_user_name}&amount=${p_amount}`}
      className="h-10 w-full rounded flex  card bg-base-300 place-content-center items-center justify-items-center "
    >
      {p_user_name}
    </Link>
  );
}
