export default function RequestInfoComponents({ p_amount, p_address, p_userName, transferSuccess: p_transferSuccess }) {
  return (
    <div className="flex flex-col w-full  place-content-center place-items-center justify-items-center">
      {truncateAndEllipsis(p_address)}
      <div className="relative w-full my-4 place-self-center flex place-content-center">
        <div className={`"transition duration-500 w-4/5 h-4 bg-base-300 flex  rounded-lg"`}></div>
        <div
          className={`"transition duration-500 absolute w-40  bg-white  top-0 left-15" ${
            p_transferSuccess ? "h-56 w-64" : "h-6 w-40 "
          }`}
        >
          <div
            className={`${
              p_transferSuccess ? "visible" : "invisible"
            } transition duration-500 flex flex-col place-content-center place-items-center justify-items-center`}
          >
            <div className="pt-10">You transferred</div>
            <div className="text-2xl font-bold py-2">${p_amount}</div>
            <div>to</div>
            <div className="text-2xl font-bold">{p_userName}</div>
            <div className="text font-bold w-28 text-ellipsis truncate">{truncateAndEllipsis(p_address)}</div>
          </div>
        </div>
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
      <div className="text font-bold w-28 text-ellipsis truncate">{truncateAndEllipsis(p_address)}</div>
    </div>
  );
}

function truncateAndEllipsis(inputString: string): string {
  inputString = inputString.toString();
  if (!inputString) return "";
  const first3Words = inputString.substr(0, 6);

  // Extract the last 4 words
  const last4Words = inputString.substr(-4);

  // Combine the extracted words with "..." in the middle
  return `${first3Words} ... ${last4Words}`;
}
