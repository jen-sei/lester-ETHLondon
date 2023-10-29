import Link from "next/link";

export default function VirtualKeyBoard({ onClick, moveToNextPage }) {
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
        <GridItem data={","} onClick={() => onClick(",")}></GridItem>
        <GridItem data={0}></GridItem>
        <Link href={`./select_user/`}>
          <GridItem data={"NEXT"}></GridItem>
        </Link>
      </div>
    </div>
  );
}

function GridItem({ data }) {
  return <div className="m-1 btn shadow rounded-none flex place-content-center">{data}</div>;
}
