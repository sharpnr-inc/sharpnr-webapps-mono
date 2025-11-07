import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { PlusCircle } from "lucide-react";

export default function RestaurantConfigSection() {
  return (
    <div className="p-4 flex flex-col gap-4">
      {/* 🧾 FSSAI License Section */}
      <Card>
        <CardHeader>
          <CardTitle>FSSAI License</CardTitle>
          <CardDescription>
            Enter your Food Safety and Standards Authority of India License number
          </CardDescription>
        </CardHeader>
        <CardContent className="flex gap-2 items-center">
          <Input placeholder="Enter FSSAI License Number" className="w-[300px]" />
          <Button variant="outline">Save License</Button>
        </CardContent>
      </Card>

      {/* 🍽️ Add Table + Floor Section */}
      <div className="flex flex-wrap gap-4">
        {/* Add Tables */}
        <Card className="flex-1 min-w-[350px]">
          <CardHeader>
            <CardTitle>Add Tables</CardTitle>
            <CardDescription>Configure tables under a floor</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3">
            <div>
              <Select>
                <SelectTrigger className="w-[200px]">
                  <SelectValue placeholder="Select floor" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="1">1st Floor</SelectItem>
                  <SelectItem value="2">2nd Floor</SelectItem>
                  <SelectItem value="3">3rd Floor</SelectItem>
                  <SelectItem value="4">4th Floor</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex gap-2">
              <Input placeholder="Enter Table Name" className="flex-1" />
              <Input placeholder="Capacity" className="w-[150px]" />
              <Button size="icon" variant="secondary">
                <PlusCircle className="w-4 h-4" />
              </Button>
            </div>
          </CardContent>
          <CardFooter>
            <Button className="w-fit">Add Table</Button>
          </CardFooter>
        </Card>

        {/* Add Floors */}
        <Card className="w-[250px]">
          <CardHeader>
            <CardTitle>Add Floor</CardTitle>
            <CardDescription>Create a new floor for the restaurant</CardDescription>
          </CardHeader>
          <CardContent>
            <Input placeholder="Enter Floor Name" />
          </CardContent>
          <CardFooter>
            <Button className="w-full">
              <PlusCircle className="mr-2 h-4 w-4" /> Add Floor
            </Button>
          </CardFooter>
        </Card>
      </div>

      {/* 🧩 Restaurant Layout */}
      <Card>
        <CardHeader>
          <CardTitle>Restaurant Layout</CardTitle>
          <CardDescription>Preview your current restaurant layout</CardDescription>
        </CardHeader>
        <CardContent className="flex justify-center items-center py-4">
          <img
            src="https://cdn-icons-png.flaticon.com/512/1046/1046784.png"
            alt="Eat icon"
            width="64"
            height="64"
            className="opacity-80"
          />
        </CardContent>
      </Card>
    </div>
  );
}
