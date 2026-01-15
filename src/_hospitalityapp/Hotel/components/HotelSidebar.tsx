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
  ChefHat,
  Boxes,
  Settings,
} from "lucide-react";

export function HotelSidebar() {
  const { location } = useRouterState();
  const pathname = location.pathname;

  return (
    <SidebarContent className="sm:pt-16 md:pt-16">
      <SidebarGroup>
        <SidebarGroupLabel>Hotel Management</SidebarGroupLabel>

        <SidebarMenu>
          {/* Overview */}
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname === "/dashboard/sharp_hospitality/hotel"}
            >
              <Link to="/dashboard/sharp_hospitality/hotel">
                <LayoutDashboard />
                <span>Overview</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {/* Booking */}
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname === "/dashboard/sharp_hospitality/hotel/booking"}
            >
              <Link to="/dashboard/sharp_hospitality/hotel/booking">
                <CalendarCheck2 />
                <span>Booking</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {/* Room Requests */}
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname === "/dashboard/sharp_hospitality/hotel/room-request"}
            >
              <Link to="/dashboard/sharp_hospitality/hotel/room-request">
                <DoorClosed />
                <span>Room Requests</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {/* Reservations */}
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname === "/dashboard/sharp_hospitality/hotel/reservations"}
            >
              <Link to="/dashboard/sharp_hospitality/hotel/reservations">
                <CalendarDays />
                <span>Reservations</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {/* Guests */}
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname === "/dashboard/sharp_hospitality/hotel/guests"}
            >
              <Link to="/dashboard/sharp_hospitality/hotel/guests">
                <Users />
                <span>Guests</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {/* Housekeeping */}
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname === "/dashboard/sharp_hospitality/hotel/housekeeping"}
            >
              <Link to="/dashboard/sharp_hospitality/hotel/housekeeping">
                <BedDouble />
                <span>Housekeeping</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {/* Kitchen */}
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname === "/dashboard/sharp_hospitality/hotel/kitchen"}
            >
              <Link to="/dashboard/sharp_hospitality/hotel/kitchen">
                <ChefHat />
                <span>Kitchen</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {/* Inventory */}
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname === "/dashboard/sharp_hospitality/hotel/inventory"}
            >
              <Link to="/dashboard/sharp_hospitality/hotel/inventory">
                <Boxes />
                <span>Inventory</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          {/* Settings */}
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname === "/dashboard/sharp_hospitality/hotel/hotel-settings"}
            >
              <Link to="/dashboard/sharp_hospitality/hotel/hotel-settings">
                <Settings />
                <span>General Settings</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
  );
}
