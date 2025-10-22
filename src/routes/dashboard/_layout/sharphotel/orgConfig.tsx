import HospitalityOrgConfigPage from "@/components/UiModuels/sharpHospitality/HospitalityOrgConfigPage";
import { createFileRoute } from "@tanstack/react-router";
import {OrigamiIcon} from "lucide-react"

export const Route = createFileRoute("/dashboard/_layout/sharphotel/orgConfig")(
  {
    component: HospitalityOrgConfigPage,
     context: () => ({
    heading: "Organisation Configurations",
    subheading: "Configure the Organisations",
    HeaderIcon:OrigamiIcon
  }),
  }
);
