import AppUserProfilePage from '@/_app_user_/AppUserProfilePage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_appuser/iam/profile/')({
  component: AppUserProfilePage,
})

