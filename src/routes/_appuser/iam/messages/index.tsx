import MessagePage from '@/_app_user_/MessagePage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_appuser/iam/messages/')({
  component: MessagePage,
})
