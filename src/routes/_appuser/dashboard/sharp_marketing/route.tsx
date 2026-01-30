import SharpMarktRootLayout from '@/_marketingapp/SharpMarktRootLayout'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_appuser/dashboard/sharp_marketing')({
  component: SharpMarktRootLayout,
})
