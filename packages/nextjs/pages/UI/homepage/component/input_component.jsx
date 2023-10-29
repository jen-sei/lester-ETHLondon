import { useState } from "react";
import ClearIcon from "../../Icons/clear_icon";
import { BalanceAndExport } from "./balance_and_scan";
import VirtualKeyBoard from "./virtual_keyboard";

export default function InputComponent() {
  const [inputData, setCount] = useState("0");

  function InputField(params) {
    return (
      <div className="flex flex-row w-full place-content-center place-self-center">
        <div className="flex flex-1 text-5xl place-content-center">{inputData}</div>
        <div
          className={`place-self-center transition-all  ease-in-out duration-1000 ${
            inputData == "0" ? "opacity-0" : "opacity-100"
          }`}
          onClick={() => {
            setCount("0");
          }}
        >
          <ClearIcon></ClearIcon>
        </div>
      </div>
    );
  }

  function handleInputSelection(data) {
    setCount(prevData => {
      if (prevData == "0") {
        return data;
      } else {
        return prevData + data;
      }
    });
  }
  return (
    <div className="flex flex-col flex-1 p-10 pb-20  h-full">
      <div className="flex flex-1 place-content-center">
        <InputField></InputField>{" "}
      </div>
      <div className=" justify-end">
        <BalanceAndExport></BalanceAndExport>
        <VirtualKeyBoard onClick={handleInputSelection} data={inputData}></VirtualKeyBoard>
      </div>
    </div>
  );
}
