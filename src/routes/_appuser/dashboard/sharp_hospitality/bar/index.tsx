import BarOverviewPage from '@/_hospitalityapp/Bar/pages/BarOverviewPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_appuser/dashboard/sharp_hospitality/bar/')({
  component: BarOverviewPage,
  staticData:{
    breadcrumb:"Overview"
  }
})
