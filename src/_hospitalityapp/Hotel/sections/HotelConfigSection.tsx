import { useState } from "react";
import { useHotelQueryOptions } from "@/api_service/queries/HospitalityQueries/Hotel";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Skeleton } from "@/components/ui/skeleton";
import { PenBox, PlusCircle } from "lucide-react";
import CreateRoomForm from "../components/CreateRoomForm";
import UpdateHotelDetailsForm from "../components/UpdateHotelForm";
import { useFormsModal } from "@/context/FormModalContext";
import { motion, AnimatePresence } from "framer-motion";
import CreateTaxRuleOfHotel from "@/_hospitalityapp/Hotel/components/CreateTaxRuleForm";
// import { Route } from "@/routes/dashboard/(dashboard)/sharp_hospitality/hotel";

/*********************************
 * This is the Hotel Config Page *
 *********************************/
export default function HotelConfigSection() {
  const { data, isLoading, isError, refetch } = useHotelQueryOptions();
  // const navigate = Route.useNavigate();

  const [showTabs, setShowTabs] = useState(false);
  const { showModal } = useFormsModal();

  const handleUpdateHotel = () => {
    showModal(
      "Update Hotel Details",
      "Update or Configure Details",
      <UpdateHotelDetailsForm hotel={data?.data} />
    );
  };

  const handleToggleTabs = () => setShowTabs((prev) => !prev);

  // ------------------------------------------------------------
  // 1️⃣ Loading UI – Skeleton Version (Professional Dashboard)
  // ------------------------------------------------------------
  if (isLoading) {
    return (
      <div className="space-y-6">
        <Skeleton className="h-10 w-48" />
        <Skeleton className="h-48 w-full" />
        <Skeleton className="h-48 w-full" />
      </div>
    );
  }

  // ------------------------------------------------------------
  // 2️⃣ Error UI
  // ------------------------------------------------------------
  if (isError) {
    return (
      <div className="flex flex-col items-center justify-center py-16">
        <p className="text-red-500 text-lg font-semibold">
          Failed to load hotel details.
        </p>
        <Button className="mt-4" onClick={() => refetch()}>
          Retry
        </Button>
      </div>
    );
  }

  // SAFE DATA ACCESS
  const hotel = data?.data;

  return (
    <div className="flex flex-col gap-2">
      {/* ------------------------------------------------------
          GENERAL HOTEL DETAILS SECTION (READ-ONLY)
        ------------------------------------------------------ */}
      <Card className="rounded-2xl shadow-sm border relative">
        <CardHeader className="pb-2 ">
          <CardTitle className="text-xl font-semibold">
            General Details
          </CardTitle>
          <CardDescription>
            Configure the general details and information of the hotel.
          </CardDescription>
        </CardHeader>

        <Button className="absolute top-4 right-4" onClick={handleUpdateHotel}>
          <PenBox />
          Update Or Configure
        </Button>

        <Separator />

        {/* --- HOTEL NAMING --- */}
        <CardContent className="space-y-4">
          <div className="font-medium text-sm text-muted-foreground">
            Hotel Naming Details
          </div>

          <div className="flex flex-wrap gap-6">
            <InfoItem label="Display Name" value={hotel?.HotelDisplayName} />
            <InfoItem label="Legal Name" value={hotel?.HotelLegalName} />
          </div>
        </CardContent>

        <Separator />

        {/* --- REGISTRATION IDs --- */}
        <CardContent className="space-y-4">
          <div className="font-medium text-sm text-muted-foreground">
            Regulatory & Registration IDs
          </div>

          <InlineInfoGroup
            items={[
              { label: "GSTIN Number", value: hotel?.HotelGstNumber },
              { label: "CIN Number", value: hotel?.hotel_id },
              { label: "FSSAI Number", value: hotel?.HotelFSSAINumber },
            ]}
          />
        </CardContent>

        <Separator />

        {/* --- CONTACT DETAILS --- */}
        <CardContent className="space-y-4">
          <div className="font-medium text-sm text-muted-foreground">
            Contact Details
          </div>

          <InlineInfoGroup
            items={[
              { label: "Front Desk Number", value: hotel?.hotel_id },
              { label: "Contact Number", value: hotel?.hotel_id },
              { label: "Manager Name", value: hotel?.hotel_id },
            ]}
          />
        </CardContent>

        <Separator />

        {/* --- KITCHEN DETAILS --- */}
        <CardContent className="space-y-4">
          <div className="font-medium text-sm text-muted-foreground">
            Kitchen
          </div>

          <InlineKitchenStatus
            kitchenId={hotel?.KitchenId}
            isKitchen={hotel?.IsKitchen}
          />
        </CardContent>

        <Separator />

        {/* --- ADDRESS DETAILS --- */}
        <CardContent className="py-4 space-y-4">
          <div className="font-medium text-sm text-muted-foreground">
            Hotel Address Details
          </div>

          <InfoItem label="Full Address" value={hotel?.Address} full />

          <InlineInfoGroup
            items={[
              { label: "Country", value: hotel?.Country },
              { label: "State", value: hotel?.State },
              { label: "City", value: hotel?.City },
              { label: "Pincode", value: hotel?.Pincode },
            ]}
          />
        </CardContent>
      </Card>

      <CreateTaxRuleOfHotel/>

      <Card className="border-2 rounded-2xl shadow-sm relative">
        <CardHeader className="pb-3">
          <CardTitle className="text-xl font-semibold">Add Room</CardTitle>
          <CardDescription>
            Add amenities for this room on the selected floor.
          </CardDescription>
        </CardHeader>

        <Button
          variant={showTabs ? "destructive" : "default"}
          onClick={handleToggleTabs}
          className="absolute top-4 right-4"
          size="sm"
        >
          <PlusCircle className="mr-1 h-4 w-4" />
          {showTabs ? "Cancel" : "Add Room"}
        </Button>

        <AnimatePresence initial={false}>
          {showTabs && (
            <motion.div
              key="animated-form"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.35, ease: "easeInOut" }}
              className="overflow-hidden"
            >
              <Separator />

              <div className="">
                <CreateRoomForm />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Card>

      <div className="space-y-6">
        {hotel?.floors?.map((floor: any) => (
          <div
            key={floor.floor_id}
            className="border p-4 rounded-2xl space-y-4 bg-muted/30"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-lg font-semibold">
                Floor {floor.floor_number}
              </h2>
              {floor.floor_name && (
                <span className="text-sm text-muted-foreground">
                  {floor.floor_name}
                </span>
              )}
            </div>

            {floor.rooms?.length ? (
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {floor.rooms.map((room: any) => (
                  <Card
                    key={room.room_id}
                    className="hover:shadow-lg transition-shadow cursor-pointer"
                  >
                    <CardHeader>
                      <CardTitle className="text-base font-medium">
                        Room {room.room_name}
                      </CardTitle>
                    </CardHeader>

                    <CardContent className="space-y-2 text-sm">
                      <p>
                        <span className="font-medium">Price:</span> ₹
                        {room.room_price}
                      </p>

                      {room.description ? (
                        <p className="text-muted-foreground">
                          {room.description}
                        </p>
                      ) : (
                        <p className="text-muted-foreground italic">
                          No description
                        </p>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground italic">
                No rooms on this floor yet.
              </p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

/* ------------------------------------------------------
   ✨ REUSABLE COMPONENTS (CLEAN + PROFESSIONAL)
------------------------------------------------------ */

function InfoItem({ label, value, full = false }: any) {
  return (
    <div className={`space-y-1 ${full ? "" : "min-w-[240px]"}`}>
      <Label className="text-xs text-muted-foreground">{label}</Label>
      <p className="text-sm font-medium">{value ?? "N/A"}</p>
    </div>
  );
}

function InlineInfoGroup({ items }: any) {
  return (
    <div className="flex items-start flex-wrap gap-6">
      {items.map((item: any, idx: number) => (
        <div key={idx} className="flex items-start gap-6">
          <InfoItem label={item.label} value={item.value} />
          {idx < items.length - 1 && <div className="h-10 border-l" />}
        </div>
      ))}
    </div>
  );
}

function InlineKitchenStatus({ kitchenId, isKitchen }: any) {
  return (
    <div className="flex items-start flex-wrap gap-6">
      <InfoItem label="Kitchen ID" value={kitchenId} />

      <div className="h-10 border-l" />

      <div className="space-y-1 min-w-[200px]">
        <Label className="text-xs text-muted-foreground">Kitchen Status</Label>

        <div className="flex items-center gap-3">
          <p className="text-sm font-medium">
            {isKitchen ? "Enabled" : "Disabled"}
          </p>
          <Switch checked={isKitchen} disabled />
        </div>

        <p className="text-xs text-muted-foreground">
          Enable or disable this kitchen
        </p>
      </div>
    </div>
  );
}
