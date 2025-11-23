"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Switch } from "@/components/ui/switch";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import { PlusCircle, Trash2 } from "lucide-react";
import { useGetBarConfig } from "@/api_service/queries/HospitalityQueries/Bar";
import { Separator } from "@/components/ui/separator";

export default function BarConfigSection() {
  const { data, isLoading, error } = useGetBarConfig();
  console.log(data);
  // State for bar timing and floors
  const [openingTime, setOpeningTime] = useState("");
  const [closingTime, setClosingTime] = useState("");
  const [isMultiFloor, setIsMultiFloor] = useState(false);

  // Floors and Tables
  const [floors, setFloors] = useState<
    { id: string; name: string; tables: string[] }[]
  >([]);
  const [tables, setTables] = useState<string[]>([]); // For single-floor bars
  const [newFloorName, setNewFloorName] = useState("");
  const [newTableName, setNewTableName] = useState("");

  return (
    <div className="p-2 flex flex-col gap-4">
      {/* --- Bar Configuration --- */}
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Bar Configuration</CardTitle>
          <CardDescription>Configure your bar’s basic settings</CardDescription>
        </CardHeader>
        <CardContent>
          <div>{data?.data?.OpeningTime}</div>
          <div>{data?.data?.ClosingTime}</div>
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
              <Label>GSN Number</Label>
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
                {data?.data?.gst_number ?? "N/A"}
              </div>
              <p className="text-xs text-muted-foreground">
                Corporate Identification Number.
              </p>
            </div>
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
              <Label>GSN Number</Label>
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
                {data?.data?.gst_number ?? "N/A"}
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
          <div className="space-y-1">
            <Label>Address Line</Label>
            <div className="font-semibold">{data?.data?.address ?? "N/A"}</div>
          </div>

          {/* City / State / Country */}
          <div className="grid grid-cols-1 md:grid-cols-6 items-start gap-6">
            {/* City */}
            <div className="space-y-1">
              <Label>City</Label>
              <div className="font-semibold">{data?.data?.city ?? "N/A"}</div>
              <p className="text-xs text-muted-foreground">
                This will appear on bills & receipts.
              </p>
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
              <p className="text-xs text-muted-foreground">
                Registered state information.
              </p>
            </div>

            {/* Separator */}
            <Separator
              orientation="vertical"
              className="hidden md:block h-full mx-auto"
            />

            {/* Country */}
            <div className="space-y-1">
              <Label>Country</Label>
              <div className="font-semibold">{data?.data?.state ?? "N/A"}</div>
              <p className="text-xs text-muted-foreground">
                Legal registered country.
              </p>
            </div>
          </div>

          {/* Pincode */}
          <div className="space-y-1">
            <Label>Pincode</Label>
            <div className="font-semibold">{data?.data?.pincode ?? "N/A"}</div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Bar Layout</CardTitle>
          <CardDescription>
            Here you can add or Edit Floor and Tables
          </CardDescription>
        </CardHeader>
        <CardContent>
          
        </CardContent>
      </Card>
    </div>
  );
}
