export default function SelectAddress({ p_address }) {
  return (
    <div className="flex flex-row shadow-xl h-10 w-full my-4 bg-base-100 px-2 place-item-center place-content-center">
      {truncateAndEllipsis(p_address)}
      <div className=" text-ellipsis truncate">{truncateAndEllipsis(p_address)}</div>
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

function truncateAndEllipsis(inputString: string): string {
  inputString = inputString.toString();
  if (!inputString) return "";
  const first3Words = inputString.substr(0, 6);

  // Extract the last 4 words
  const last4Words = inputString.substr(-4);

  // Combine the extracted words with "..." in the middle
  return `${first3Words} ... ${last4Words}`;
}
