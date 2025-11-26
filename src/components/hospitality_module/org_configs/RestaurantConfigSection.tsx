import {
  useRestaurantDetails,
  useRestaurantLayout,
} from "@/api_service/queries/HospitalityQueries/Restaurant";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Edit, Pen } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { useFormsModal } from "@/context/FormModalContext";
import UpdateRestaurantGeneralDetailsForms from "./forms/UpdateRestaurantGeneralDetailsForms";
import { useDialogModal } from "@/context/DialogModalContext";
import CreateAddTableInRestaurantForm from "./forms/CreateAddTableInRestaurantForm";

export default function RestaurantConfigSection() {
  const { data, error, fetchStatus } = useRestaurantDetails();
  const { data: resLayout } = useRestaurantLayout();
  const { openModal, closeModal } = useDialogModal();
  console.log(resLayout);

  const { showModal } = useFormsModal();

  const handleEditGeneralDetail = () => {
    showModal(
      "Update Restaurant",
      "Edit Update Restaurant General Details",
      <UpdateRestaurantGeneralDetailsForms resData={data?.data} />
    );
  };

  const onAddTable = (floor: any) => {
    openModal(
      <CreateAddTableInRestaurantForm
        floorId={floor}
        restaurantId={resLayout?.restaurant_id}
      />,
      `Add Table`,
      `Add table in Floor ${floor.name}`
    );
  };

  return (
    <div className=" space-y-4">
      <Card className="relative">
        <CardHeader>
          <CardTitle>General Details</CardTitle>
          <CardDescription>
            Here you can Edit and Configure the Details
          </CardDescription>
        </CardHeader>
        <Button
          className="absolute top-4 right-4"
          onClick={handleEditGeneralDetail}
        >
          <Pen />
          Update
        </Button>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
            {/* Left block */}
            <div className="space-y-2">
              <Label>Display Name</Label>
              <div className="font-semibold">
                {data?.data?.display_name ?? "N/A"}
              </div>
              <p className="text-xs text-muted-foreground">
                This will appear on bills & receipts.
              </p>
            </div>

            {/* Right block */}
            <div className="space-y-2">
              <Label>Legal Name</Label>
              <div className="font-semibold">
                {data?.data?.legal_name ?? "N/A"}
              </div>
              <p className="text-xs text-muted-foreground">
                Registered legal entity name.
              </p>
            </div>

            {/* Separator that visually splits the grid */}
            <Separator
              orientation="vertical"
              className="hidden md:block absolute left-1/2 top-0 h-full"
            />
          </div>
        </CardContent>

        <Separator />

        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
            {/* Left block */}
            <div className="space-y-2">
              <Label>Opening Time</Label>
              <div className="font-semibold">
                {data?.data?.opening_time ?? "N/A"}
              </div>
            </div>

            {/* Right block */}
            <div className="space-y-2">
              <Label>Closing Time</Label>
              <div className="font-semibold">
                {data?.data?.closing_time ?? "N/A"}
              </div>
            </div>

            {/* Separator that visually splits the grid */}
            <Separator
              orientation="vertical"
              className="hidden md:block absolute left-1/2 top-0 h-full"
            />
          </div>
        </CardContent>

        <Separator />

        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-6 items-start gap-4">
            {/* FSSAI */}
            <div className="space-y-2">
              <Label>FSSAI License Number</Label>
              <div className="font-semibold">
                {data?.data?.fssai_number ?? "N/A"}
              </div>
              <p className="text-xs text-muted-foreground">
                This will appear on bills & receipts.
              </p>
            </div>

            {/* Separator */}
            <Separator orientation="vertical" className="h-full mx-auto" />

            {/* GSN */}
            <div className="space-y-2">
              <Label>GSTIN Number</Label>
              <div className="font-semibold">
                {data?.data?.gst_number ?? "N/A"}
              </div>
              <p className="text-xs text-muted-foreground">
                Government-issued business number.
              </p>
            </div>

            {/* Separator */}
            <Separator orientation="vertical" className="h-full mx-auto" />

            {/* CIN */}
            <div className="space-y-2">
              <Label>CIN Number</Label>
              <div className="font-semibold">
                {data?.data?.cin_number ?? "N/A"}
              </div>
              <p className="text-xs text-muted-foreground">
                Corporate Identification Number.
              </p>
            </div>
          </div>
        </CardContent>

        <Separator />

        <CardContent className="space-y-4">
          {/* Address line */}
          <div className="space-y-1">
            <Label>Address Line</Label>
            <div className="font-semibold">{data?.data?.address ?? "N/A"}</div>
          </div>

          <Separator />

          {/* City / State / Country */}
          <div className="grid grid-cols-1 md:grid-cols-6 items-start gap-3">
            {/* City */}
            <div className="space-y-1">
              <Label>City</Label>
              <div className="font-semibold">{data?.data?.city ?? "N/A"}</div>
            </div>

            {/* Separator */}
            <Separator
              orientation="vertical"
              className="hidden md:block h-full mx-auto"
            />

            {/* State */}
            <div className="space-y-1">
              <Label>State</Label>
              <div className="font-semibold">{data?.data?.state ?? "N/A"}</div>
            </div>

            {/* Separator */}
            <Separator
              orientation="vertical"
              className="hidden md:block h-full mx-auto"
            />

            {/* Country */}
            <div className="space-y-1">
              <Label>Country</Label>
              <div className="font-semibold">{data?.data?.country ?? "N/A"}</div>
            </div>
          </div>

          {/* Pincode */}
          <div className="space-y-1">
            <Label>Pincode</Label>
            <div className="font-semibold">{data?.data?.pincode ?? "N/A"}</div>
          </div>
        </CardContent>

        <Separator />

        <CardContent className="space-y-2">
          {/* City / State / Country */}
          <div className="grid grid-cols-1 md:grid-cols-6 items-start gap-6">
            {/* City */}
            <div className="space-y-1">
              <Label>Email Address</Label>
              <div className="font-semibold">
                {data?.data?.contact_email ?? "N/A"}
              </div>
              <p className="text-xs text-muted-foreground">
                This will appear on bills & receipts for customer this is only
                for the customer contact.
              </p>
            </div>

            {/* Separator */}
            <Separator
              orientation="vertical"
              className="hidden md:block h-full mx-auto"
            />

            {/* State */}
            <div className="space-y-1">
              <Label>Contact Number</Label>
              <div className="font-semibold">
                {data?.data?.contact_number ?? "N/A"}
              </div>
              <p className="text-xs text-muted-foreground">
                Registered state information.
              </p>
            </div>
          </div>
        </CardContent>

        <Separator />

        <CardContent className="space-y-2">
          {/* City / State / Country */}

          {/* City */}
          <div className="space-y-1">
            <Label>Manager Name</Label>
            <div className="font-semibold">
              {data?.data?.manager_name ?? "N/A"}
            </div>
            <p className="text-xs text-muted-foreground">
              This will appear on bills & receipts for customer this is only for
              the customer contact.
            </p>
          </div>
        </CardContent>

        <CardFooter className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground max-w-md">
            These are the general details of the restaurant. All details can be
            fetched from the Orchestrator organization service.
          </p>

          <Button>Fetch & Import Details</Button>
        </CardFooter>
        
      </Card>

      <Card className="relative">
        <CardHeader>
          <CardTitle>Payment Integration</CardTitle>
          <CardDescription>Edit or Add Payment integration</CardDescription>
        </CardHeader>
        <Button className="absolute top-5 right-3">
          <Edit />
          Edit
        </Button>
        <CardContent>
          <div className="grid grid-cols-2">
            <div className="space-y-1">
              <Label>Paytm</Label>
              <div className="font-semibold">{data?.data?.state ?? "N/A"}</div>
              <p className="text-xs text-muted-foreground">
                Registered state information.
              </p>
            </div>
            <div className="space-y-1">
              <Label>PhonePe</Label>
              <div className="font-semibold">{data?.data?.state ?? "N/A"}</div>
              <p className="text-xs text-muted-foreground">
                Registered state information.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Menu & Kitchen</CardTitle>
          <CardDescription>This for Details only </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            <Label>Menu Groupe ID</Label>
            <div className="font-semibold">{data?.data?.state ?? "N/A"}</div>
            <p className="text-xs text-muted-foreground">
              this is menu groupe ID
            </p>
          </div>
        </CardContent>
        <CardContent>
          <div className="space-y-1">
            <Label>Kitchen ID</Label>
            <div className="font-semibold">
              {data?.data?.kitchen_id ?? "N/A"}
            </div>
            <p className="text-xs text-muted-foreground">
              Registered state information.
            </p>
          </div>
        </CardContent>
      </Card>

      <Card className="relative">
        <CardHeader>
          <CardTitle>Restaurant Layout</CardTitle>
          <CardDescription>
            Edit layout and Add floors, Add Tables
          </CardDescription>
        </CardHeader>

        {/* GLOBAL ADD FLOOR BUTTON */}
        <Button className="absolute top-5 right-5" variant="outline">
          Add Floor
        </Button>

        <CardContent className="space-y-5">
          {resLayout?.floors.map((flr: any) => (
            <div
              key={flr.id}
              className="border p-4 rounded-xl space-y-3 relative"
            >
              {/* Floor Header */}
              <div className="flex items-center justify-between">
                <div className="font-semibold text-lg">{flr.name}</div>

                {/* ADD TABLE BUTTON */}
                <Button
                  size="sm"
                  variant="outline"
                  onClick={() => onAddTable(flr)}
                >
                  + Add Table
                </Button>
              </div>

              {/* TABLE GRID */}
              <div className="grid grid-cols-10 gap-3">
                {flr?.tables?.map((tbl: any) => (
                  <div
                    key={tbl.id}
                    className={`
                aspect-square w-full rounded-xl flex flex-col items-center justify-center 
                text-sm font-medium border shadow-sm cursor-pointer select-none transition-all
                ${
                  tbl.status === "AVAILABLE"
                    ? "border-green-400"
                    : tbl.status === "OCCUPIED"
                      ? "bg-red-50 border-red-400"
                      : "bg-yellow-50 border-yellow-400"
                }
              `}
                  >
                    <div>{tbl.name}</div>
                    <div className="text-xs opacity-70">
                      {tbl.capacity} seats
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
