import IamRootLayout from '@/_app_user_/components/IamRootLayout'
import { createFileRoute} from '@tanstack/react-router'

export const Route = createFileRoute('/_appuser/iam')({
  component: IamRootLayout,
})
