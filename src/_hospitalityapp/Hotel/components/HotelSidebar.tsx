import {
  Link,
  useRouterState,
  type ToPathOption,
} from "@tanstack/react-router";
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
} from "lucide-react";

type SidebarItem = {
  label: string;
  to: ToPathOption;
  icon: React.ComponentType<any>;
};

export const hotelSidebarMenu: SidebarItem[] = [
  {
    label: "Overview",
    to: "/dashboard/sharp_hospitality/hotel",
    icon: LayoutDashboard,
  },
  {
    label: "Booking",
    to: "/dashboard/sharp_hospitality/hotel/booking",
    icon: CalendarCheck2,
  },
  {
    label: "Room Requests",
    to: "/dashboard/sharp_hospitality/hotel/room-request",
    icon: DoorClosed,
  },
  {
    label: "Reservations",
    to: "/dashboard/sharp_hospitality/hotel/reservations",
    icon: CalendarDays,
  },
  {
    label: "Guests",
    to: "/dashboard/sharp_hospitality/hotel/guests",
    icon: Users,
  },
  {
    label: "Housekeeping",
    to: "/dashboard/sharp_hospitality/hotel/housekeeping",
    icon: BedDouble,
  },
  {
    label: "Inventory",
    to: "/dashboard/sharp_hospitality/hotel/inventory",
    icon: Boxes,
  },

  // ---- Settings / Operations ----
  {
    label: "Order for Booking",
    to: "/dashboard/sharp_hospitality/hotel/add-order-in-booking",
    icon: ServerCogIcon,
  },
  {
    label: "Checkouts",
    to: "/dashboard/sharp_hospitality/hotel/checkout",
    icon: CheckSquare2Icon,
  },
  // {
  //   label: "General Settings",
  //   to: "/dashboard/sharp_hospitality/hotel/hotel-settings",
  //   icon: Settings,
  // },
];

export function HotelSidebar() {
  const pathname = useRouterState({
    select: (state) => state.location.pathname,
  });

  return (
    <SidebarContent>
      <SidebarGroup>
        <SidebarGroupLabel>Hotel Management</SidebarGroupLabel>

        <SidebarMenu>
          {hotelSidebarMenu.map((item) => {
            const Icon = item.icon;

            return (
              <SidebarMenuItem key={item.label}>
                <SidebarMenuButton asChild isActive={pathname === item.to}>
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
