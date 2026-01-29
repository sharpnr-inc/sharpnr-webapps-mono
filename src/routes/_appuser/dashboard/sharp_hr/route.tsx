import SharpHRRootLayout from '@/_hrapp/components/SharpHRRootLayout'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_appuser/dashboard/sharp_hr')({
  component: SharpHRRootLayout,
})
