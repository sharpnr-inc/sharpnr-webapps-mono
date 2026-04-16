import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"

interface RestaurantKitchenSettingsProps {}

const RestaurantKitchenSettings: React.FC<
  RestaurantKitchenSettingsProps
> = () => {
  const [kitchenOpen, setKitchenOpen] = useState(true)
  const [acceptOrders, setAcceptOrders] = useState(true)
  const [lastOrderTime, setLastOrderTime] = useState("21:30")
  const [prepTime, setPrepTime] = useState(30)
  const [notes, setNotes] = useState("")

  return (
    <Card className="">
      <CardHeader>
        <CardTitle>Kitchen Settings</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        {/* Kitchen Status */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label>Kitchen Status</Label>
            <p className="text-sm text-muted-foreground">
              Enable or disable the kitchen
            </p>
          </div>
          <Switch checked={kitchenOpen} onCheckedChange={setKitchenOpen} />
        </div>

        <Separator />

        {/* Accept Orders */}
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <Label>Accept Orders</Label>
            <p className="text-sm text-muted-foreground">
              Temporarily stop accepting new orders
            </p>
          </div>
          <Switch
            checked={acceptOrders}
            onCheckedChange={setAcceptOrders}
            disabled={!kitchenOpen}
          />
        </div>

        <Separator />

        {/* Last Order Time */}
        <div className="space-y-2">
          <Label>Last Order Time</Label>
          <Input
            type="time"
            value={lastOrderTime}
            onChange={(e) => setLastOrderTime(e.target.value)}
            disabled={!kitchenOpen}
          />
          <p className="text-xs text-muted-foreground">
            Orders after this time will be rejected
          </p>
        </div>

        <Separator />

        {/* Preparation Time */}
        <div className="space-y-2">
          <Label>Average Preparation Time (minutes)</Label>
          <Input
            type="number"
            min={5}
            step={5}
            value={prepTime}
            onChange={(e) => setPrepTime(Number(e.target.value))}
            disabled={!kitchenOpen}
          />
          <p className="text-xs text-muted-foreground">
            Used for delivery & pickup ETA calculations
          </p>
        </div>

        <Separator />

        {/* Internal Notes */}
        <div className="space-y-2">
          <Label>Internal Kitchen Notes</Label>
          <Textarea
            placeholder="E.g. Short staff today, expect delays after 8 PM"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
          />
        </div>

        {/* Actions */}
        <div className="flex justify-end pt-4">
          <Button>Save Kitchen Settings</Button>
        </div>
      </CardContent>
    </Card>
  )
}

export default RestaurantKitchenSettings
