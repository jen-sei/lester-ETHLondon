import { useState } from "react";
import TranscationsList from "../transcation/transcation_list";
import { BottomNavigationBar, MainPages } from "./component/bottom_navigation";
import InputComponent from "./component/input_component";

export default function HomePage() {
  const [activePage, setActiveTab] = useState(MainPages.Landing);

  let renderPage;
  if (activePage == MainPages.Landing) {
    renderPage = <InputComponent />;
  }
  if (activePage == MainPages.Transcation) {
    renderPage = <TranscationsList />;
  }
  if (activePage == MainPages.Contacts) {
    renderPage = <div>Contacts</div>;
  }
  return (
    <div className="h-full w-screen flex flex-1 flex-col">
      {renderPage}
      <BottomNavigationBar
        currentActivePage={activePage}
        onPageChange={data => {
          setActiveTab(data);
        }}
      ></BottomNavigationBar>
    </div>
  );
}
