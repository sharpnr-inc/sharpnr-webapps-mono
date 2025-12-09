import AccountingSettingsPage from '@/components/RoutesPages/SharpAccounting/SettingsPage'
import { createFileRoute } from '@tanstack/react-router'
import { Settings } from 'lucide-react'

export const Route = createFileRoute(
  '/dashboard/(dashboard)/sharp_accounting/settings',
)({
  component: AccountingSettingsPage,
  context: () => ({
    heading: "Settings",
    subheading: "Configure fiscal year, taxes, and default accounts",
    HeaderIcon: Settings,
  }),
})
