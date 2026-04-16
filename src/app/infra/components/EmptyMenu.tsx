import React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { UtensilsCrossed } from "lucide-react"

interface EmptyMenuProps {
  onCreateClick?: () => void
}

const EmptyMenu: React.FC<EmptyMenuProps> = ({ onCreateClick }) => {
  return (
    <div className="flex h-full w-full items-center justify-center p-6">
      <Card className="w-full border-dashed">
        <CardContent className="flex flex-col items-center justify-center gap-4 py-10 text-center">
          
          <div className="rounded-full bg-muted p-4">
            <UtensilsCrossed className="h-8 w-8" />
          </div>

          <div className="space-y-1">
            <h3 className="text-lg font-semibold">No Menu Available</h3>
            <p className="text-sm text-muted-foreground">
              You haven’t created any menu groups yet. Start by adding your first menu.
            </p>
          </div>

          <Button onClick={onCreateClick}>
            Create Menu
          </Button>

        </CardContent>
      </Card>
    </div>
  )
}

export default EmptyMenu
