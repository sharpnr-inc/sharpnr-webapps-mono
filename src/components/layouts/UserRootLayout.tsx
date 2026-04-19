import { Outlet } from "@tanstack/react-router";
interface UserRootLayoutProps {}

const UserRootLayout: React.FC<UserRootLayoutProps> = () => {
  return (
    <div className="relative">
      <Outlet />
    </div>
  );
};

export default UserRootLayout;
