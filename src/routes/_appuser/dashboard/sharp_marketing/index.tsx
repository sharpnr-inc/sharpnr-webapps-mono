import SharpMarketingWelcomePage from '@/_marketingapp/SharpMarketingWelcomePage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_appuser/dashboard/sharp_marketing/')({
  component: SharpMarketingWelcomePage,
})

