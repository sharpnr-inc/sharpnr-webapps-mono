import IamRootLayout from '@/app_user/components/IamRootLayout'
import { createFileRoute} from '@tanstack/react-router'

export const Route = createFileRoute('/_appuser/iam')({
  component: IamRootLayout,
})
