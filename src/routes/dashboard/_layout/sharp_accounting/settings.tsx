import AccountingSettingsPage from '@/components/UiModuels/SharpAccounting/SettingsPage'
import { createFileRoute } from '@tanstack/react-router'
import { Settings } from 'lucide-react'

export const Route = createFileRoute(
  '/dashboard/_layout/sharp_accounting/settings',
)({
  component: AccountingSettingsPage,
  context: () => ({
    heading: "Settings",
    subheading: "Configure fiscal year, taxes, and default accounts",
    HeaderIcon: Settings,
  }),
})
