import MenuPage from '@/components/UiModuels/sharpHospitality/MenuPage'
import { createFileRoute } from '@tanstack/react-router'
import { LucideMenuSquare } from 'lucide-react'

export const Route = createFileRoute('/dashboard/_layout/sharphotel/menu')({
  component: MenuPage,
    context: () => ({
    heading: "Menu",
    subheading: "Manage Menu operations",
    HeaderIcon:LucideMenuSquare
  }),
})

