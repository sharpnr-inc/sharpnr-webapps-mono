import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";

export function OverviewPage() {
  const orgInfo = {
    name: "Dearie Club",
    legalName: "Dearie Club and Hospitality Pvt. Ltd.",
    gst: "08AGEPA5085F1ZM",
    cin: "U55101MH2018PTC304562",
    contact: "9828823314",
    address: `Dearie Club and Hospitality Pvt. Ltd.
3rd Floor, Palm Grove Heights,
Near Hiranandani Gardens, Powai,
Mumbai, Maharashtra – 400076`,
  };

  const hotelInfo = {
    displayName: "Dearie Club",
    legalName: "Dearie Club and Hospitality Pvt. Ltd.",
    gst: "08AGEPA5085F1ZM",
    cin: "U55101MH2018PTC304562",
    contact: "9828823314",
    address: `Dearie Club and Hospitality Pvt. Ltd.
3rd Floor, Palm Grove Heights,
Near Hiranandani Gardens, Powai,
Mumbai, Maharashtra – 400076`,
  };

  const barInfo = {
    displayName: "Dearie Club Bar",
    legalName: "Dearie Club and Hospitality Pvt. Ltd.",
    gst: "08AGEPA5085F1ZM",
    cin: "U55101MH2018PTC304562",
    contact: "9828823314",
    address: `Dearie Club and Hospitality Pvt. Ltd.
3rd Floor, Palm Grove Heights,
Near Hiranandani Gardens, Powai,
Mumbai, Maharashtra – 400076`,
  };

  const bankAccounts = [
    {
      entity: "Parent Organization",
      bank: "HDFC Bank",
      accountNumber: "XXXXXX1234",
      ifsc: "HDFC0000451",
    },
    {
      entity: "Hotel Account",
      bank: "ICICI Bank",
      accountNumber: "XXXXXX6789",
      ifsc: "ICIC0000998",
    },
    {
      entity: "Bar Account",
      bank: "Axis Bank",
      accountNumber: "XXXXXX3456",
      ifsc: "UTIB0001209",
    },
  ];

  const InfoItem = ({ label, value }: { label: string; value: string }) => (
    <div className="space-y-1.5 hover:scale-[1.03] transition-transform">
      <Label className="text-muted-foreground text-sm">{label}</Label>
      <p className="whitespace-pre-line break-words font-medium">{value}</p>
    </div>
  );

  const BankAccountTable = () => (
    <div className="mt-4 border rounded-xl p-4 bg-muted/30">
      <h4 className="font-semibold mb-2 text-sm text-muted-foreground">
        Linked Bank Accounts
      </h4>
      <div className="grid md:grid-cols-3 sm:grid-cols-2 gap-3 text-sm">
        {bankAccounts.map((acc) => (
          <div
            key={acc.accountNumber}
            className="border rounded-lg p-3 bg-background"
          >
            <p className="font-medium">{acc.entity}</p>
            <p>
              <span className="text-muted-foreground">Bank:</span> {acc.bank}
            </p>
            <p>
              <span className="text-muted-foreground">A/C:</span>{" "}
              {acc.accountNumber}
            </p>
            <p>
              <span className="text-muted-foreground">IFSC:</span> {acc.ifsc}
            </p>
          </div>
        ))}
      </div>
    </div>
  );

  const SharedInfoNote = () => (
    <div className="flex items-center gap-2 mb-2">
      <Badge variant="outline" className="text-blue-600 border-blue-200">
        Info Shared with Parent Organization
      </Badge>
    </div>
  );

  return (
    <div className="p-2 space-y-2">
      {/* Parent Organization Section */}
      <Card>
        <CardHeader>
          <CardTitle>Parent Organization</CardTitle>
          <CardDescription>
            Overview of the parent organization details
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-2">
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            <InfoItem label="Name" value={orgInfo.name} />
            <InfoItem label="Legal Name" value={orgInfo.legalName} />
            <InfoItem label="GST Number" value={orgInfo.gst} />
            <InfoItem label="CIN Number" value={orgInfo.cin} />
            <InfoItem label="Contact Number" value={orgInfo.contact} />
            <InfoItem label="Registered Address" value={orgInfo.address} />
          </div>

          <div>
            <p>Total Employees Across All Units</p>
            <p className="text-blue-500 font-bold text-lg">46</p>
          </div>

          <div className="grid grid-cols-4 sm:grid-cols-6 gap-2 border p-3 rounded-xl">
            {["Paytm", "PhonePe", "GPay", "Amazon Pay"].map((gateway) => (
              <div key={gateway}>
                <p>{gateway}</p>
                <p className="text-green-500 font-bold">Yes</p>
              </div>
            ))}
          </div>

          <div>
            <p>Sharpnr Verified</p>
            <p className="text-red-500 font-bold">NO</p>
            <p className="text-xs text-muted-foreground">
              Learn more about Sharpnr Verification
            </p>
          </div>

          {/* ✅ Bank Account Section (shared across all) */}
          <BankAccountTable />
        </CardContent>

        <CardFooter className="text-sm text-muted-foreground border-t pt-4">
          These details represent the legally registered information of your
          parent organization. They are used for compliance, tax filing, and
          internal reference across all connected hotels or business units.
        </CardFooter>
      </Card>

      {/* Hotel Section */}
      <Card>
        <CardHeader>
          <CardTitle>Hotel Settings Overview</CardTitle>
          <CardDescription>
            Overview of the hotel configuration details
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            <InfoItem label="Display Name" value={hotelInfo.displayName} />
            <InfoItem label="Legal Name" value={hotelInfo.legalName} />
            <InfoItem label="GST Number" value={hotelInfo.gst} />
            <InfoItem label="CIN Number" value={hotelInfo.cin} />
            <InfoItem label="Contact Number" value={hotelInfo.contact} />
            <InfoItem label="Registered Address" value={hotelInfo.address} />
          </div>

          {/* ✅ Hotel-specific Bank Details */}
          <BankAccountTable />

          <div className="border rounded-xl p-4 bg-muted/30">
            <p>Kitchen</p>
            <p className="text-red-500 font-bold">NO</p>
            <p className="text-xs text-muted-foreground">
              You can switch on the Kitchen in Hotel Config Tab
            </p>
          </div>
        </CardContent>

        <CardFooter className="text-sm text-muted-foreground border-t pt-4">
          These details represent the operational and compliance information of
          your hotel unit. They help manage financial and regulatory operations.
        </CardFooter>
      </Card>

      {/* Bar Section */}
      <Card>
        <CardHeader>
          <CardTitle>Bar Configuration Overview</CardTitle>
          <CardDescription>
            Overview of the bar configuration details
          </CardDescription>
        </CardHeader>

        <CardContent className="space-y-4">
          {/* ✅ Info same as Parent Organization */}
          <SharedInfoNote />

          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4">
            <InfoItem label="Display Name" value={barInfo.displayName} />
            <InfoItem label="Legal Name" value={barInfo.legalName} />
            <InfoItem label="GST Number" value={barInfo.gst} />
            <InfoItem label="CIN Number" value={barInfo.cin} />
            <InfoItem label="Contact Number" value={barInfo.contact} />
            <InfoItem label="Registered Address" value={barInfo.address} />
          </div>

          <div className="border rounded-xl p-4 bg-muted/30">
            <p>Liquor License</p>
            <p className="text-red-500 font-bold">Pending</p>
            <p className="text-xs text-muted-foreground">
              Upload or verify your bar license in the Bar Config tab
            </p>
          </div>
        </CardContent>

        <CardFooter className="text-sm text-muted-foreground border-t pt-4">
          This section summarizes the operational and licensing details for your
          bar unit. Bar configuration can inherit parent organization data or
          maintain its own.
        </CardFooter>
      </Card>
    </div>
  );
}
