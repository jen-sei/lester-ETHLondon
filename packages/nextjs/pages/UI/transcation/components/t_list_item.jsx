export const TranscationType = {
  OutGoing: "outgoing",
  InComing: "incoming",
};

export default function TListItem({
  transcationType = TranscationType.InComing,
  amount = "",
  comment = "",
  address,
  date = new Date(),
}) {
  const fee = `"$${generateRandomNumberWithPrecision()}`;
  const chain = getRandomChain();

  return (
    <div class="collapse collapse-arrow bg-base-200 border-b-[0.5px]">
      <input type="checkbox" name="my-accordion-2" />
      <div class="collapse-title flex flex-row w-full place-content-between ">
        <AddressAndMessage p_address={address} p_date={date}></AddressAndMessage>
        <AmountRecievedOrSend p_amount={amount} p_transcationType={transcationType}></AmountRecievedOrSend>
      </div>
      <div class="collapse-content opacity-60">
        <ExpandedComponent p_fee={fee} p_chain={chain} p_comment={comment}></ExpandedComponent>
      </div>
    </div>
  );
}

function ExpandedComponent({ p_fee, p_chain, p_comment }) {
  let commentTag, feeTag, chainTag;
  if (p_comment) {
    commentTag = <div> Comment : {p_comment}</div>;
  }
  if (p_fee) {
    feeTag = <div> fee : {p_fee}</div>;
  }
  if (p_chain) {
    chainTag = <div> chain : {p_chain}</div>;
  }
  return (
    <div className="flex flex-col text-xs font-extralight p-3">
      {chainTag}
      {feeTag}
      {commentTag}
    </div>
  );
}

function AmountRecievedOrSend({ p_amount, p_transcationType }) {
  return (
    <div
      className={`text-2xl flex place-self-center ${
        p_transcationType == TranscationType.InComing ? "text-green-500" : "text-red-500"
      }`}
    >
      {p_transcationType == TranscationType.InComing ? "+" : "-"} {numberToScientificNotation(p_amount)}
    </div>
  );
}

function AddressAndMessage({ p_address, message, p_date }) {
  return (
    <div className="text-xs pr-4 flex flex-col">
      <div className="w-20 text-ellipsis text-sm truncate ">{p_address}</div>
      <div className="font-extralight">{formatDMY(p_date)}</div>
    </div>
  );
}

function formatDMY(d) {
  // Default to today
  d = d || new Date();
  return (
    ("0" + d.getDate()).slice(-2) +
    "/" +
    ("0" + (d.getMonth() + 1)).slice(-2) +
    "/" +
    ("000" + d.getFullYear()).slice(-4)
  );
}

function generateRandomNumberWithPrecision() {
  // Generate a random number between 0 and 1
  const randomNumber = Math.random();

  // Multiply the random number by 1000 to shift 3 decimal places to the right
  const scaledNumber = randomNumber * 1000;

  // Round the scaled number to an integer
  const roundedNumber = Math.round(scaledNumber);

  // Divide the rounded number by 1000 to get the desired precision
  const result = roundedNumber / 100000;

  return result;
}

function getRandomChain() {
  const options = ["Gnosis", "Sello", "Fugi"];
  const randomIndex = Math.floor(Math.random() * options.length);
  return options[randomIndex];
}

function numberToScientificNotation(number) {
  const numericValue = parseFloat(number);

  if (!isNaN(numericValue) && Math.abs(numericValue) < 1000) {
    return number; // Return the input string for values less than 1000.
  } else {
    return numericValue.toExponential();
  }
}
