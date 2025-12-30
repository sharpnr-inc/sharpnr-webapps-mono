import HRRecruitmentAddEmployeePage from '@/_hrapp/pages/HRRecruitmentPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/sharp_hr/recruitment/')({
  component: HRRecruitmentAddEmployeePage,
})
