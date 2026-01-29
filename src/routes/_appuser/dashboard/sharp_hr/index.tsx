import SharpHRWelcomePage from '@/_hrapp/components/SharpHRWelcomePage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_appuser/dashboard/sharp_hr/')({
  component: SharpHRWelcomePage,
})

