import React, { useEffect, useState } from "react";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus, Package } from "lucide-react";
import { useRestaurantInventories } from "../apis/queries";
import { useSelectedRestaurantID } from "../store/selectors";
import { useFormsModal } from "@/context/FormModalContext";
import { AddRestaurantInventoryForm } from "../components/AddRestaurantInventory";

interface RestaurantInventoryPageProps {}

const RestaurantInventoryPage: React.FC<RestaurantInventoryPageProps> = () => {
  const restaurantID = useSelectedRestaurantID();
  const { data, isLoading } = useRestaurantInventories(restaurantID!!);
  

  const warehouses = data?.data ?? [];
  const [selectedWarehouseID, setSelectedWarehouseID] = useState<string>("");
  const selectedWarehouse = warehouses.find(
    (w: any) => w.ID === selectedWarehouseID,
  );

  /*
    Auto select first warehouse after load
  */
  useEffect(() => {
    if (!selectedWarehouseID && warehouses.length > 0) {
      setSelectedWarehouseID(warehouses[0].ID);
    }
  }, [warehouses]);

  const { showModal } = useFormsModal();

  const handleAddInventory = (selectedWarehouseID: string) => {
    if (!selectedWarehouseID) {
      return;
    }
    showModal(
      "New Inventory",
      "Add New Inventory ",
      <AddRestaurantInventoryForm inventoryAccountID={selectedWarehouseID} />,
    );
  };

  return (
    <div className="space-y-6 mt-6">
      {/* PAGE HEADER */}
      <div className="flex justify-between items-end border-b-4 pb-4">
        <div>
          <h1 className="text-3xl font-black uppercase tracking-tight">
            Inventory
          </h1>

          <p className="text-sm opacity-60">
            Manage stock per warehouse / inventory account
          </p>
        </div>

        <div className="flex gap-3">
          {/* WAREHOUSE SELECTOR */}
          <Select
            value={selectedWarehouseID}
            onValueChange={setSelectedWarehouseID}
          >
            <SelectTrigger className="w-[260px] border-black">
              <SelectValue placeholder="Select Warehouse" />
            </SelectTrigger>

            <SelectContent>
              {warehouses.map((warehouse: any) => (
                <SelectItem key={warehouse.ID} value={warehouse.ID}>
                  {warehouse.Name} ({warehouse.Type})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* ADD INVENTORY BUTTON */}
          <Button
            disabled={!selectedWarehouseID}
            className="bg-black text-white font-bold uppercase text-xs"
            onClick={() => handleAddInventory(selectedWarehouseID)}
          >
            <Plus className="mr-2 h-4 w-4" />
            Add Inventory
          </Button>
        </div>
      </div>

      {/* SELECTED WAREHOUSE INFO CARD */}
      {selectedWarehouse && (
        <Card className="border-2 border-black">
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle className="text-xs uppercase font-bold opacity-60">
              Selected Warehouse
            </CardTitle>

            <Package className="h-4 w-4" />
          </CardHeader>

          <CardContent className="flex gap-4 items-center">
            <div className="text-lg font-black uppercase">
              {selectedWarehouse.Name}
            </div>

            <Badge variant="outline" className="border-black uppercase">
              {selectedWarehouse.Type}
            </Badge>

            {selectedWarehouse.IsShared && (
              <Badge className="bg-black text-white uppercase">Shared</Badge>
            )}
          </CardContent>
        </Card>
      )}

      {/* EMPTY STATE */}
      {!isLoading && warehouses.length === 0 && (
        <Card className="border-2 border-dashed border-black">
          <CardContent className="py-10 text-center">
            <div className="text-lg font-bold">No Inventory Accounts Found</div>

            <p className="text-sm opacity-60 mt-2">
              Create a warehouse before adding inventory
            </p>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default RestaurantInventoryPage;
