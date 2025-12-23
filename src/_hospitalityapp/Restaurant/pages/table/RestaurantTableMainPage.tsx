import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";
import { useMenuGroup } from "@/api_service/queries/HospitalityQueries/Menu";
import {
  selectSetMenuGroups,
  useMenuGroupStore,
} from "@/store/Hospitality/restaurant/menuTerminal/menuTerminal.store";
import { useEffect } from "react";
import { MenuTerminal } from "@/_hospitalityapp/shared/Menu/MenuTerminal";

/* -------------------------------------------------------------------------- */

export default function RestaurantMainTablePage() {
  const setMenuGroups = useMenuGroupStore(selectSetMenuGroups);
  const { data, isSuccess } = useMenuGroup();

  useEffect(() => {
    if (isSuccess && data) {
      setMenuGroups(data.data); // assuming your API returns {data: [...]}
    }
  }, [isSuccess, data, setMenuGroups]);

  return (
    <div className="p-2 space-y-2 pb-10">
      {/* CURRENT ORDER */}
      <Card className="mb-3">
        <CardContent className="p-3">
          <div className="flex justify-between mb-2">
            <div>
              <h3 className="font-semibold text-sm">Current Order</h3>
              <p className="text-xs text-muted-foreground"></p>
            </div>
            <Badge variant="outline">{status}</Badge>
          </div>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Item</TableHead>
                <TableHead className="text-right">Price</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              <TableRow className="font-semibold">
                <TableCell>Total</TableCell>
                <TableCell className="text-right">₹{""}</TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </CardContent>

        <CardFooter className="p-3"></CardFooter>
      </Card>

      <Card className="w-full">
        <CardContent className="space-y-4">
          {/* Header */}
          <div className="text-sm font-medium">Order Status</div>
        </CardContent>
      </Card>

      <MenuTerminal>
        <MenuTerminal.Body>
          <MenuTerminal.CategorySection/>
        </MenuTerminal.Body>
      </MenuTerminal>
    </div>
  );
}
