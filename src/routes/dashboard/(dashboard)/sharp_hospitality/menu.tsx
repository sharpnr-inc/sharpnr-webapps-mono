import MenuPage from '@/_hospitalityapp/shared/Menu/pages/MenuPage'
import { createFileRoute } from '@tanstack/react-router'
import { LucideMenuSquare } from 'lucide-react'

export const Route = createFileRoute('/dashboard/(dashboard)/sharp_hospitality/menu')({
  component: MenuPage,
    context: () => ({
    heading: "Menu",
    subheading: "Manage Menu operations",
    HeaderIcon:LucideMenuSquare
  }),
})

