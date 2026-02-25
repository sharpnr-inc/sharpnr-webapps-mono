import HRRecruitmentAddEmployeePage from '@/_hrapp/pages/HRRecruitmentPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_appuser/dashboard/sharp_hr/recruitment/')({
  component: HRRecruitmentAddEmployeePage,
})
