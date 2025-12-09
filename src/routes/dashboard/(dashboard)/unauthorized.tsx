import { createFileRoute } from "@tanstack/react-router"
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

export const Route = createFileRoute("/dashboard/(dashboard)/unauthorized")({
  component: RouteComponent,
})

function RouteComponent() {
  return (
    <div className="flex h-screen items-center justify-center bg-muted/30 p-4">
      <Card className="max-w-md w-full shadow-md border rounded-2xl text-center">
        <CardHeader>
          <div className="flex justify-center mb-3">
            <AlertTriangle className="w-10 h-10 text-destructive" />
          </div>
          <CardTitle className="text-2xl font-semibold">Access Denied</CardTitle>
          <CardDescription>
            You are not authorized to access this page.
          </CardDescription>
        </CardHeader>

        <CardContent>
          <p className="text-sm text-muted-foreground">
            Please contact your organization administrator or Sharp support team
            for assistance.
          </p>
        </CardContent>

        <CardFooter className="flex justify-center gap-3">
          {/* <Button variant="default" onClick={() => window.location.href = "mailto:support@sharp.com"}>
            Contact Sharp Support
          </Button> */}
          <Button variant="outline" onClick={() => alert("Contact your Org Admin for access.")}>
            Contact Org Admin
          </Button>
        </CardFooter>
      </Card>
    </div>
  )
}

export default RouteComponent
