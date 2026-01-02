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
              <img src="https://img.icons8.com/?size=100&id=64714&format=png&color=000000" height={20} width={20}/>
                {/* <BarChart3 /> */}
                <span>Overview</span>
              </Link>
            </SidebarMenuButton>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              isActive={
                pathname === "/dashboard/sharp_hospitality/hotel/booking"
              }
            >
              <Link to="/dashboard/sharp_hospitality/hotel/booking">
                {/* <CalendarCheck2 /> */}
                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAACAAAAAgCAYAAABzenr0AAAACXBIWXMAAAsTAAALEwEAmpwYAAABkElEQVR4nO1Xu0oDURA9PkCwcLGxsBLRQrCytAlCNDO7NilsrYKtn6ClRVoLK3srS8HGQrC00kaLWKiYzI1BEUSCVwYVlmVvnrvxQQYGlp05c86dva8FurAagml1/IQJeN2AngzoRcCbFhjoCfE9licM6NCAbdgFfFRBdjJVcgPyDfguSh4SURZQPnFiAY0JeM9FHOMHNQTjiZBXQRkBleJHTKfqjlhJsR0TW9CIgHcEVI9p9ZsBb1usDVlsDeokFPBrTN67du4Wq6NtkRsE8wI6d7T3oozcQhKYmFF3N5pWuxYLfkRuSsAnju95U4G/1HoH/UUBXzu6cVZGMBsBcMGAnx2AfV0FaNMUo1hHTeUqhAWktqYb7R1OAUnvaq7dM6n6/8S8fNGGvef1vd8uwLR+EMVOsL4Ary8g3xdQbE+AF0nsVECzun9XgIDqensyoI2v207vBAioKshlv2P6rO+6EtDMQsWvBP5cNP6AlRkDukztrDefhY8b/XBoTHNSESDgXYvMcLM8zdHcxAWkZR+5Un1JGUXfmgAAAABJRU5ErkJggg==" alt="booking" height={20} width={20}></img>
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
                "/dashboard/sharp_hospitality/hotel/general-settings"
              }
            >
              <Link to="/dashboard/sharp_hospitality/hotel/general-settings">
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
                "/dashboard/sharp_hospitality/hotel/general-settings"
              }
            >
              <Link to="/dashboard/sharp_hospitality/hotel/general-settings">
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
