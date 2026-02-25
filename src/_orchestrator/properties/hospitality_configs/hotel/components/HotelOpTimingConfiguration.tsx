import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2, Clock, Edit2, Loader2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";

interface HotelOperationTimingConfigProps {
  hotelID: string;
  propertyID: string;
}

export function HotelOpTimingConfiguration({
  hotelID,
  propertyID,
}: HotelOperationTimingConfigProps) {
  const [status, setStatus] = useState<"idle" | "saving" | "saved">("idle");

  // Form State
  const [isReception24x7, setIsReception24x7] = useState(false);
  const [hotelName, setHotelName] = useState("");
  const [checkInTime, setCheckInTime] = useState("14:00");
  const [checkOutTime, setCheckOutTime] = useState("11:00");

  const handleSave = async () => {
    setStatus("saving");
    // Simulate API Call
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setStatus("saved");
  };

  return (
    <div className="w-full mx-auto">
      <AnimatePresence mode="wait">
        {status !== "saved" ? (
          /* --- FORM VIEW --- */
          <motion.div
            key="form"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
          >
            <Card className="shadow-sm">
              <CardHeader className="border-b">
                <CardTitle>Hotel Operation Timing</CardTitle>
                <CardDescription>
                  Configure timings for {hotelID}
                </CardDescription>
              </CardHeader>

              <CardContent className="space-y-6 pt-6">
                <div className="space-y-2">
                  <Label>Hotel Display Name</Label>
                  <Input
                    placeholder="Enter hotel name..."
                    value={hotelName}
                    onChange={(e) => setHotelName(e.target.value)}
                  />
                </div>

                <div className="flex items-start gap-3 rounded-md border p-4">
                  <Checkbox
                    id="reception-24x7"
                    checked={isReception24x7}
                    onCheckedChange={(value) => setIsReception24x7(!!value)}
                  />
                  <div className="space-y-1">
                    <Label htmlFor="reception-24x7" className="cursor-pointer">
                      Reception Open 24×7
                    </Label>
                    <p className="text-xs text-muted-foreground">
                      Reception operates round the clock
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Clock size={14} /> Check-In
                    </Label>
                    <Input
                      type="time"
                      value={checkInTime}
                      onChange={(e) => setCheckInTime(e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label className="flex items-center gap-2">
                      <Clock size={14} /> Check-Out
                    </Label>
                    <Input
                      type="time"
                      value={checkOutTime}
                      onChange={(e) => setCheckOutTime(e.target.value)}
                    />
                  </div>
                </div>
              </CardContent>

              <CardFooter className="flex gap-3 border-t p-6">
                <Button
                  className="flex-1"
                  onClick={handleSave}
                  disabled={status === "saving"}
                >
                  {status === "saving" ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                      Saving...
                    </>
                  ) : (
                    "Save Configuration"
                  )}
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setHotelName("")}
                  disabled={status === "saving"}
                >
                  Reset
                </Button>
              </CardFooter>
            </Card>
          </motion.div>
        ) : (
          /* --- SUMMARY VIEW --- */
          <motion.div
            key="summary"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ type: "spring", damping: 20, stiffness: 100 }}
          >
            <Card className="shadow-sm border-2">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <div className="space-y-1">
                  <Badge variant="secondary" className="mb-1">
                    Configured
                  </Badge>
                  <CardTitle className="text-2xl">
                    {hotelName || "Hotel Property"}
                  </CardTitle>
                </div>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setStatus("idle")}
                >
                  <Edit2 size={14} className="mr-2" /> Edit
                </Button>
              </CardHeader>

              <CardContent className="grid grid-cols-2 gap-4 py-6">
                <div className="p-4 rounded-md border shadow-sm">
                  <p className="text-[10px] text-muted-foreground font-bold uppercase mb-2">
                    Availability
                  </p>
                  <div className="flex items-center gap-2">
                    <CheckCircle2 size={14} />
                    <span className="text-sm font-medium">
                      {isReception24x7 ? "24/7 Reception" : "Standard Hours"}
                    </span>
                  </div>
                </div>

                <div className="p-4 rounded-md border shadow-sm">
                  <p className="text-[10px] text-muted-foreground font-bold uppercase mb-2">
                    Guest Cycle
                  </p>
                  <div className="flex items-center gap-2 text-sm font-mono font-medium">
                    <span>{checkInTime}</span>
                    <span>→</span>
                    <span>{checkOutTime}</span>
                  </div>
                </div>
              </CardContent>

              <div className="px-6 pb-4">
                <p className="text-[9px] text-muted-foreground font-mono italic">
                  Ref: {propertyID} / {hotelID}
                </p>
              </div>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
