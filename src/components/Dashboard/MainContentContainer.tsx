
import SidebarMain from "../Sidebar/Sidebar";


interface MainContentContainerProps {
  isSidebarVisible: boolean;
  onToggleSidebar: () => void;
}

export default function MainContentContainer({
  isSidebarVisible,
  onToggleSidebar,
}: MainContentContainerProps) {
  return (
    <div className="">
         {isSidebarVisible && (
        <SidebarMain onToggleSidebar={onToggleSidebar} />
      )}
    </div>
  );
}
