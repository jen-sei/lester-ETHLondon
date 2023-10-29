export default function RequestInfoComponents({ p_amount, p_address, p_userName }) {
  return (
    <div className="flex flex-col w-full  place-content-center place-items-center justify-items-center">
      <div className="relative w-full my-4 place-self-center flex place-content-center">
        <div className="w-3/5 h-4 bg-base-300 flex  rounded-lg"></div>
        <div className="absolute w-40 h-6 bg-white  top-0 left-15"></div>
      </div>
      <div className="text-2xl font-bold py-2">${p_amount}</div>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        className="w-6 h-6 my-2"
      >
        <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
      </svg>

      <div className="text-2xl font-bold">{p_userName}</div>
      <div className="text font-bold w-28 text-ellipsis truncate">{p_address}</div>
    </div>
  );
}
