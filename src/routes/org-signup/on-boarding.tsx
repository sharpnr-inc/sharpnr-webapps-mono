import { OrgOnBoardingPage } from '@/signup/on-boarding/OnBoradingPage'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/org-signup/on-boarding')({
  component: OrgOnBoardingPage,
})
