import React from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { 
  Plus, 
  Search, 
  Download, 
  Package, 
  AlertTriangle, 
  ArrowUpDown 
} from "lucide-react";

interface RestaurantInventoryPageProps {}

const RestaurantInventoryPage: React.FC<RestaurantInventoryPageProps> = () => {
  // Mock data to demonstrate the Bar and Kitchen modules
  const inventoryItems = [
    { id: "1", name: "Tomato Sauce", category: "Kitchen", stock: 15, unit: "Cans", status: "In Stock" },
    { id: "2", name: "Vodka (Premium)", category: "Bar", stock: 2, unit: "Bottles", status: "Low Stock" },
    { id: "3", name: "Chicken Breast", category: "Kitchen", stock: 25, unit: "Kg", status: "In Stock" },
    { id: "4", name: "Craft Beer", category: "Bar", stock: 0, unit: "Cases", status: "Out of Stock" },
  ];

  return (
    <div className="mt-6 space-y-6">
      {/* HEADER SECTION */}
      <div className="flex justify-between items-end border-b-4 pb-4">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tighter">Inventory Management</h1>
          <p className="text-sm opacity-60">Track stock levels for Kitchen and Bar modules.</p>
        </div>
        <div className="flex gap-2">
          <Button variant="outline" className="border-black font-bold uppercase text-xs">
            <Download className="mr-2 h-4 w-4" /> Export CSV
          </Button>
          <Button className="bg-black text-white font-bold uppercase text-xs">
            <Plus className="mr-2 h-4 w-4" /> Add New Item
          </Button>
        </div>
      </div>

      {/* QUICK STATS CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="border-2 border-black">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold uppercase text-muted-foreground">Total Items</CardTitle>
            <Package className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black">1,284</div>
          </CardContent>
        </Card>
        <Card className="border-2 border-black">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold uppercase text-muted-foreground">Low Stock Alerts</CardTitle>
            <AlertTriangle className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black underline decoration-2 underline-offset-4">12 Items</div>
          </CardContent>
        </Card>
        <Card className="border-2 border-black bg-zinc-100">
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-xs font-bold uppercase text-muted-foreground">Active Orders</CardTitle>
            <ArrowUpDown className="h-4 w-4" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-black italic">8 Pending</div>
          </CardContent>
        </Card>
      </div>

      {/* FILTERS & SEARCH */}
      <div className="flex gap-4 items-center">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 opacity-50" />
          <Input placeholder="Filter by item name or SKU..." className="pl-10 border-black ring-offset-white focus-visible:ring-black" />
        </div>
        <Button variant="outline" className="border-black">Filter: Kitchen</Button>
        <Button variant="outline" className="border-black">Filter: Bar</Button>
      </div>

      {/* INVENTORY TABLE */}
      <div className="rounded-md border-2 border-black overflow-hidden">
        <Table>
          <TableHeader className="bg-zinc-100">
            <TableRow className="border-b border-black hover:bg-zinc-100">
              <TableHead className="font-bold text-black w-[100px]">ID</TableHead>
              <TableHead className="font-bold text-black">Item Name</TableHead>
              <TableHead className="font-bold text-black">Category</TableHead>
              <TableHead className="font-bold text-black text-right">Stock Level</TableHead>
              <TableHead className="font-bold text-black">Unit</TableHead>
              <TableHead className="font-bold text-black text-center">Status</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {inventoryItems.map((item) => (
              <TableRow key={item.id} className="border-b border-zinc-200 hover:bg-zinc-50 transition-colors">
                <TableCell className="font-mono text-xs">{item.id}</TableCell>
                <TableCell className="font-bold uppercase">{item.name}</TableCell>
                <TableCell>{item.category}</TableCell>
                <TableCell className="text-right font-mono">{item.stock}</TableCell>
                <TableCell className="text-xs italic">{item.unit}</TableCell>
                <TableCell className="text-center">
                  <Badge 
                    variant={item.status === "In Stock" ? "outline" : "default"}
                    className={`uppercase text-[10px] font-black rounded-none border-black ${item.status === "In Stock" ? "bg-white text-black" : "bg-black text-white"}`}
                  >
                    {item.status}
                  </Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};

export default RestaurantInventoryPage;