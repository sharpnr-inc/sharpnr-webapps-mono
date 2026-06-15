import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_user/payslips/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/_user/payslips/"!</div>
}
