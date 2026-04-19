import { Outlet } from "@tanstack/react-router";
interface UserRootLayoutProps {}

const UserRootLayout: React.FC<UserRootLayoutProps> = () => {
  return (
    <div className="">
      <Outlet />
    </div>
  );
};

export default UserRootLayout;
