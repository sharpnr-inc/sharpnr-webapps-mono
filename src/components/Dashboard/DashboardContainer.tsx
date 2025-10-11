import { useState } from "react";
import Header from "../shared/Header";
import MainContentContainer from "./MainContentContainer";

export default function DashboardContainer() {
  const [isSidebarVisible, setIsSidebarVisible] = useState(true);
  
  const handleToggleSidebar = () => {
    setIsSidebarVisible((prev) => !prev);
  };

  return (
    <div className="">
      <Header 
        onToggleSidebar={handleToggleSidebar}
        isSidebarVisible={isSidebarVisible}
      />
      <MainContentContainer
        isSidebarVisible={isSidebarVisible}
        onToggleSidebar={handleToggleSidebar}
      />
    </div>
  );
}