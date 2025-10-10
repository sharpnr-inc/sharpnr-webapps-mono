import Header from "../shared/Header";
import SidebarMain from "../Sidebar/Sidebar";

export default function DashboardContainer() {
  return (
    <div className="flex">
      <SidebarMain></SidebarMain>
      <Header></Header>
    </div>
  );
}
