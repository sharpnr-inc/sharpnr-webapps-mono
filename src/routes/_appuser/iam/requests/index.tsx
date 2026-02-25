import AdminRequestPage from '@/_app_user_/AdminRequestPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_appuser/iam/requests/')({
  component: AdminRequestPage,
})


