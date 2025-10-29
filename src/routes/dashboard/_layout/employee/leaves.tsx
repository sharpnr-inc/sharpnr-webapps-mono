
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/dashboard/_layout/employee/leaves')({
  component: MyLeavesPage,
})

function MyLeavesPage(){
  return(<div>Thsi is Leaves Pages</div>)
}


