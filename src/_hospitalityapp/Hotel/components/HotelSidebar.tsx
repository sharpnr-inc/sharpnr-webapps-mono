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
  User,
  Calendar,
  DoorClosedIcon,
  CalendarCheck2,
  BarChart3,
  BedDoubleIcon,
} from "lucide-react";

export function HotelSidebar() {
  const { location } = useRouterState();
  const pathname = location.pathname;

  return (
    <SidebarContent className="sm:pt-16 md:pt-16">
      <SidebarGroup>
        <SidebarGroupLabel>Hotel Management</SidebarGroupLabel>

        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={pathname === "/dashboard/sharp_hospitality/hotel"}
            >
              <Link to="/dashboard/sharp_hospitality/hotel">
                <BarChart3 />
                <span>Overview</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={
                pathname === "/dashboard/sharp_hospitality/hotel/bookings"
              }
            >
              <Link to="/dashboard/sharp_hospitality/hotel/bookings">
                <CalendarCheck2 />
                <span>Booking</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={
                pathname === "/dashboard/sharp_hospitality/hotel/houseKeeping"
              }
            >
              <Link to="/dashboard/sharp_hospitality/hotel/houseKeeping">
                <DoorClosedIcon />
                <span>Room Management</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={
                pathname === "/dashboard/sharp_hospitality/hotel/reservations"
              }
            >
              <Link to="/dashboard/sharp_hospitality/hotel/reservations">
                <Calendar />
                <span>Reservations</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={
                pathname === "/dashboard/sharp_hospitality/hotel/guests"
              }
            >
              <Link to="/dashboard/sharp_hospitality/hotel/guests">
                <User />
                <span>Guests(Pending)</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={
                pathname === "/dashboard/sharp_hospitality/hotel/houseKeeping"
              }
            >
              <Link to="/dashboard/sharp_hospitality/hotel/houseKeeping">
                <BedDoubleIcon />
                <span>Housekeeping(Pending)</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={
                pathname ===
                "/dashboard/sharp_hospitality/hotel/genral-settings"
              }
            >
              <Link to="/dashboard/sharp_hospitality/hotel/genral-settings">
                <BedDoubleIcon />
                <span>General Settings(Pending)</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={
                pathname ===
                "/dashboard/sharp_hospitality/hotel/genral-settings"
              }
            >
              <Link to="/dashboard/sharp_hospitality/hotel/genral-settings">
                <BedDoubleIcon />
                <span>Table Service(Pending)</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarGroup>
    </SidebarContent>
  );
}
