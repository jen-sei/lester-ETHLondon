export default function SelectAddress({ p_address }) {
  return (
    <div className="flex flex-row shadow-xl h-10 w-full my-4 bg-base-100 px-2 place-item-center place-content-center">
      <div className=" w-25  text-ellipsis truncate">{p_address}</div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        className="w-6 h-6 place-items-end"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
      </svg>
    </div>
  );
}
