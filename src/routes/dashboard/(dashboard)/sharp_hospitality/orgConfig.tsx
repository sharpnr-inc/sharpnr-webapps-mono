import HospitalityOrgConfigPage from "@/components/RoutesPages/sharpHospitality/HospitalityOrgConfigPage";
import { createFileRoute } from "@tanstack/react-router";
import {OrigamiIcon} from "lucide-react"

export const Route = createFileRoute("/dashboard/(dashboard)/sharp_hospitality/orgConfig")(
  {
    component: HospitalityOrgConfigPage,
     context: () => ({
    heading: "Organization Configurations",
    subheading: "Configure the Organizations",
    HeaderIcon:OrigamiIcon
  }),
  }
);
