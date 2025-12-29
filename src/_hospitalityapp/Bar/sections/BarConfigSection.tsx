import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import {
  useBarGeneralDetails,
  useBarLayout,
} from "@/_hospitalityapp/Bar/apis/queries/Bar";
import { Separator } from "@/components/ui/separator";
import { formatDateTime } from "@/lib/formatDate";
import { Button } from "@/components/ui/button";
import { UpdateBarGeneralDetailsForm } from "../forms/UpdateBarGeneralDetailsForm";
import { useFormsModal } from "@/context/FormModalContext";
import { PlusCircle, Users } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export default function BarConfigSection() {
  const { data,  } = useBarGeneralDetails();
  const { data: barl, isFetched } = useBarLayout();

  const layoutData = barl?.data;

  const getStatusColor = (status:string) => {
    switch (status) {
      case 'AVAILABLE':
        return 'bg-green-500 hover:bg-green-600';
      case 'OCCUPIED':
        return 'bg-red-500 hover:bg-red-600';
      case 'RESERVED':
        return 'bg-yellow-500 hover:bg-yellow-600';
      default:
        return 'bg-gray-500 hover:bg-gray-600';
    }
  };

  if (!isFetched || !layoutData) {
    return (
      <Card className="relative">
        <CardHeader>
          <CardTitle>Bar Layout</CardTitle>
          <CardDescription>Loading...</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-center h-40">
            <p className="text-muted-foreground">Loading bar layout...</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  const { showModal } = useFormsModal();

  const openEditForm = () => {
    showModal(
      "some",
      "CardDescription",
      <UpdateBarGeneralDetailsForm barGenDetail={data?.data} />
    );
  };

  return (
    <div className="p-2 flex flex-col gap-4">
      {/* --- Bar Configuration --- */}
      <Card className="w-full relative">
        <CardHeader>
          <CardTitle>Bar Configuration</CardTitle>
          <CardDescription>Configure your bar’s basic settings</CardDescription>
        </CardHeader>

        <Button onClick={openEditForm} className="absolute top-5 right-2.5">
          Update or Edit
        </Button>

        <CardContent className="space-y-4 flex items-start gap-2.5">
          {/* Opening Time */}
          <div className="space-y-1">
            <Label className="text-muted-foreground text-xs">
              Opening Time
            </Label>
            <div className="px-3 py-2 rounded-xl border bg-muted/20 text-sm">
              {formatDateTime(data?.data?.opening_time)}
            </div>
          </div>

          {/* Closing Time */}
          <div className="space-y-1">
            <Label className="text-muted-foreground text-xs">
              Closing Time
            </Label>
            <div className="px-3 py-2 rounded-xl border bg-muted/20 text-sm">
              {formatDateTime(data?.data?.closing_time)}
            </div>
          </div>
        </CardContent>

        <Separator />

        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 items-start gap-4">
            {/* FSSAI */}
            <div className="space-y-2">
              <Label className="text-muted-foreground text-xs">
                Bar Display Name
              </Label>
              <div className="font-semibold">
                {data?.data?.display_name ?? "N/A"}
              </div>
              <p className="text-xs text-muted-foreground">
                This will appear on bills & receipts.
              </p>
            </div>

            {/* Separator */}
            <Separator orientation="vertical" className="h-full mx-auto" />

            {/* GSN */}
            <div className="space-y-2">
              <Label className="text-muted-foreground text-xs">
                Bar Legal Name
              </Label>
              <div className="font-semibold">
                {data?.data?.bar_legal_name ?? "N/A"}
              </div>
              <p className="text-xs text-muted-foreground">
                Government-issued business number.
              </p>
            </div>
          </div>
        </CardContent>

        <Separator />

        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-6 items-start gap-4">
            {/* FSSAI */}
            <div className="space-y-2">
              <Label className="text-muted-foreground text-xs">
                FSSAI License
              </Label>
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
              <Label className="text-muted-foreground text-xs">
                GSTIN Number
              </Label>
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
              <Label className="text-muted-foreground text-xs">
                CIN Number
              </Label>
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

        <CardContent className="space-y-2">
          {/* Address line */}
          <div className="space-y-2">
            <Label className="text-muted-foreground">Address Line</Label>
            <div className="font-semibold">
              {data?.data?.address_line ?? "N/A"}
            </div>
          </div>

          <Separator />

          {/* City / State / Country */}
          <div className="grid grid-cols-1 md:grid-cols-6 items-start gap-6">
            {/* City */}
            <div className="space-y-1">
              <Label className="text-muted-foreground text-xs">City</Label>
              <div className="font-semibold">{data?.data?.city ?? "N/A"}</div>
            </div>

            {/* Separator */}
            <Separator
              orientation="vertical"
              className="hidden md:block h-full mx-auto"
            />

            {/* State */}
            <div className="space-y-1">
              <Label className="text-muted-foreground text-xs">State</Label>
              <div className="font-semibold">{data?.data?.state ?? "N/A"}</div>
            </div>

            {/* Separator */}
            <Separator
              orientation="vertical"
              className="hidden md:block h-full mx-auto"
            />

            {/* Country */}
            <div className="space-y-1">
              <Label className="text-muted-foreground text-xs">Country</Label>
              <div className="font-semibold">{data?.data?.state ?? "N/A"}</div>
            </div>
          </div>
          <Separator />
          {/* Pincode */}
          <div className="space-y-1">
            <Label className="text-muted-foreground text-xs">Pincode</Label>
            <div className="font-semibold">{data?.data?.pincode ?? "N/A"}</div>
          </div>
        </CardContent>

        <Separator />

        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 items-start gap-4">
            {/* FSSAI */}
            <div className="space-y-2">
              <Label className="text-muted-foreground text-xs">Kitchen</Label>
              <div className="font-semibold">
                {data?.data?.is_kitchen ? <div>Yes</div> : <div>NO</div>}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="relative">
        <CardHeader>
          <CardTitle>Payments</CardTitle>
          <CardDescription>
            Here you can add or Edit Floor and Tables
          </CardDescription>
        </CardHeader>
        <Button className="absolute top-5 right-2.5">Add Payment</Button>
        <CardContent>
          <div className="font-semibold text-red-300">
            NO PAYMENT GATEWAY AVAILABLE
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Order Routes</CardTitle>
          <CardDescription>Add Routes to the Order</CardDescription>
        </CardHeader>
        <CardContent></CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Kitchen Integration</CardTitle>
          <CardDescription>
            Here you can add or Edit Floor and Tables
          </CardDescription>
        </CardHeader>
        <CardContent></CardContent>
      </Card>

   <Card className="relative">
      <CardHeader>
        <CardTitle>Bar Layout</CardTitle>
        <CardDescription>
          Here you can add or Edit Floor and Tables
        </CardDescription>
      </CardHeader>
      <Button className="absolute top-5 right-2.5">Edit or Update</Button>
      
      <CardContent className="space-y-6">
        {layoutData.floors?.map((floor:any) => (
          <div key={floor.floor_id} className="space-y-4">
            {/* Floor Header */}
            <div className="flex items-center justify-between border-b pb-2">
              <div>
                <h3 className="text-lg font-semibold">{floor.floor_name}</h3>
                <p className="text-sm text-muted-foreground">
                  {floor.tables?.length || 0} tables
                </p>
              </div>
              <Button variant="outline" size="sm">
                <PlusCircle className="w-4 h-4 mr-2" />
                Add Table
              </Button>
            </div>

            {/* Tables Grid */}
            {floor.tables && floor.tables.length > 0 ? (
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3">
                {floor.tables.map((table:any) => (
                  <Card
                    key={table.table_id}
                    className="cursor-pointer hover:shadow-md transition-shadow"
                  >
                    <CardContent className="p-4 flex flex-col items-center justify-center space-y-2">
                      <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                        <Users className="w-6 h-6 text-primary" />
                      </div>
                      <p className="font-semibold text-sm">{table.table_name}</p>
                      <Badge
                        className={`${getStatusColor(table.table_status)} text-white text-xs`}
                      >
                        {table.table_status}
                      </Badge>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                No tables available. Click "Add Table" to get started.
              </div>
            )}
          </div>
        ))}

        {/* Empty State */}
        {(!layoutData.floors || layoutData.floors.length === 0) && (
          <div className="text-center py-12">
            <Users className="w-16 h-16 mx-auto text-muted-foreground mb-4" />
            <h3 className="text-lg font-semibold mb-2">No Floors Available</h3>
            <p className="text-muted-foreground mb-4">
              Create your first floor to start adding tables
            </p>
            <Button>
              <PlusCircle className="w-4 h-4 mr-2" />
              Add Floor
            </Button>
          </div>
        )}
      </CardContent>
    </Card>
    </div>
  );
}
