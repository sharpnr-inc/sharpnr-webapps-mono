import MenuPage from '@/components/UiModuels/sharpHospitality/MenuPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/_layout/sharphotel/menu')({
  component: MenuPage,
})

