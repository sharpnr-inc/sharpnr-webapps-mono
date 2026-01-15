
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_pathlessEmployeeWrapper/employee/leaves')({
  component: MyLeavesPage,
})

function MyLeavesPage(){
  return(<div>Thsi is Leaves Pages</div>)
}


