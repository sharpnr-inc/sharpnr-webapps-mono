import MenuPage from '@/components/RoutesPages/sharpHospitality/MenuPage'
import { createFileRoute } from '@tanstack/react-router'
import { LucideMenuSquare } from 'lucide-react'

export const Route = createFileRoute('/dashboard/_layout/sharp_hospitality/menu')({
  component: MenuPage,
    context: () => ({
    heading: "Menu",
    subheading: "Manage Menu operations",
    HeaderIcon:LucideMenuSquare
  }),
})

