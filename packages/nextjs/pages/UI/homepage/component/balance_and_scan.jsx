import { Balance } from "~~/components/scaffold-eth";

export function BalanceAndExport() {
  var user_address = "0x1348D26849889658880ae2b568544f1535ab0852";
  return (
    <div className="flex flex-row pb-3 h-16">
      <div className="flex w-1/5 h-full mr-5 place-content-center place-items-center">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="w-8 h-8 "
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M21 12a2.25 2.25 0 00-2.25-2.25H15a3 3 0 11-6 0H5.25A2.25 2.25 0 003 12m18 0v6a2.25 2.25 0 01-2.25 2.25H5.25A2.25 2.25 0 013 18v-6m18 0V9M3 12V9m18 0a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 9m18 0V6a2.25 2.25 0 00-2.25-2.25H5.25A2.25 2.25 0 003 6v3"
          />
        </svg>
      </div>
      <div className="w-4/5 h-full flex place-content-center shadow place-items-center">
        <Balance address={user_address} />
      </div>
      <div></div>
    </div>
  );
}
