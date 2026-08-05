import { Link, useRouterState } from "@tanstack/react-router";
import {
  SidebarContent,
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import {
  LayoutDashboard,
  CalendarCheck2,
  CalendarDays,
  DoorClosed,
  Users,
  BedDouble,
  Boxes,
  CheckSquare2Icon,
  ServerCogIcon,
  Settings,
} from "lucide-react";
import { Route } from "@/routes/workspace/_user/hotel/$hotelID/route";

type SidebarItem = {
  label: string;
  to: string;
  icon: React.ComponentType<any>;
};

// ✅ Now a function — receives hotelID at render time
function getHotelSidebarMenu(hotelID: string): SidebarItem[] {
  const base = `/hotel/${hotelID}`;

  return [
    { label: "Overview", to: `${base}/overview`, icon: LayoutDashboard },
    { label: "Booking", to: `${base}/booking`, icon: CalendarCheck2 },
    { label: "Room Requests", to: `${base}/room_requests`, icon: DoorClosed },
    { label: "Reservations", to: `${base}/reservations`, icon: CalendarDays },
    { label: "Guests", to: `${base}/guests`, icon: Users },
    { label: "Housekeeping", to: `${base}/housekeeping`, icon: BedDouble },
    { label: "Inventory", to: `${base}/inventory`, icon: Boxes },
    {
      label: "Order for Booking",
      to: `${base}/add-order-in-booking`,
      icon: ServerCogIcon,
    },
    { label: "Checkouts", to: `${base}/checkout`, icon: CheckSquare2Icon },
    { label: "General Settings", to: `${base}/settings`, icon: Settings },
  ];
}

export function HotelSidebar() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  const { hotelID } = Route.useParams(); // ✅ hotelID is available here

  const menuItems = getHotelSidebarMenu(hotelID); // ✅ build menu with real hotelID

  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Hotel Management</SidebarGroupLabel>

        <SidebarMenu>
          {menuItems.map((item) => {
            const Icon = item.icon;

            return (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton
                  asChild
                  isActive={pathname.startsWith(item.to)} // ✅ startsWith handles nested routes
                >
                  <Link to={item.to}>
                    <Icon />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            );
          })}
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
  );
}
