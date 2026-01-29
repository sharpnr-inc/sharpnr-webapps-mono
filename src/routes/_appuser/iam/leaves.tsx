
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/_appuser/iam/leaves')({
  component: MyLeavesPage,
})

function MyLeavesPage(){
  return(<div>Thsi is Leaves Pages</div>)
}


