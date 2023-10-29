import Link from "next/link";

export default function VirtualKeyBoard({ onClick, data }) {
  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-3">
        {[...Array(9)].map((x, i) => (
          <div onClick={() => onClick(i + 1 + "")}>
            <GridItem data={i + 1}></GridItem>
          </div>
        ))}
      </div>
      <div className="grid grid-cols-3">
        <div onClick={() => onClick(",")}>
          <GridItem data={","}></GridItem>
        </div>
        <div onClick={() => onClick("0")}>
          <GridItem data={0}></GridItem>
        </div>
        <Link href={`./select_user?amount=${data}`}>
          <GridItem data={"NEXT"}></GridItem>
        </Link>
      </div>
    </div>
  );
}

function GridItem({ data }) {
  return <div className="m-1 btn shadow rounded-none flex place-content-center">{data}</div>;
}
