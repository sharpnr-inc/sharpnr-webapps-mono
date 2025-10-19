import { createFileRoute } from '@tanstack/react-router'
import SharpHospitalitySettings from '@/components/UiModuels/sharpHospitality/SettingsPage'

export const Route = createFileRoute('/dashboard/_layout/sharphotel/settings')({
  component: SharpHospitalitySettings,
})


