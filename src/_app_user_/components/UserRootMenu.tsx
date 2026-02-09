import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link } from "@tanstack/react-router";
import { Calendar, LogOut, Settings, User } from "lucide-react";
import type { ToPathOption } from "@tanstack/react-router";

interface MenuItem {
  label: string;
  icon: React.ReactNode;
  to?: ToPathOption;
  onClick?: () => void;
  danger?: boolean;
  separatorBefore?: boolean;
}

const menuItems: MenuItem[] = [
  {
    label: "Profile",
    icon: <User className="mr-2 h-4 w-4" />,
    to: "/iam",
  },
   {
    label: "Attendance & Leaves",
    icon: <Calendar className="mr-2 h-4 w-4" />,
    to: "/iam/my-attendance",
  },
  {
    label: "Organization Profile",
    icon: <User className="mr-2 h-4 w-4" />,
    to: "/iam",
  },
  {
    label: "Settings",
    icon: <Settings className="mr-2 h-4 w-4" />,
    to: "/",
  },
  {
    label: "Logout",
    icon: <LogOut className="mr-2 h-4 w-4" />,
    danger: true,
    separatorBefore: true,
    onClick: () => {
      // logout()
    },
  },
];

interface UserRootMenuProps {}

const UserRootMenu: React.FC<UserRootMenuProps> = () => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="h-10 w-10 grid place-items-center cursor-pointer hover:border-3 ">
          <AvatarFallback className="text-xs font-medium">U</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end" className="w-60">
        <DropdownMenuLabel>My Account</DropdownMenuLabel>

        {menuItems.map((item, index) => (
          <div key={index}>
            {item.separatorBefore && <DropdownMenuSeparator />}

            {item.to ? (
              <DropdownMenuItem asChild>
                <Link to={item.to}>
                  {item.icon}
                  {item.label}
                </Link>
              </DropdownMenuItem>
            ) : (
              <DropdownMenuItem
                onClick={item.onClick}
                className={
                  item.danger ? "text-red-600 focus:text-red-600" : undefined
                }
              >
                {item.icon}
                {item.label}
              </DropdownMenuItem>
            )}
          </div>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserRootMenu;
