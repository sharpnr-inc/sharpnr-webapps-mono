
import AppUserAttendancePage from '@/app_user/AppUserAttendancePage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_appuser/iam/my-attendance')(
  {
    component: AppUserAttendancePage,
  },
)

