import {
  Card,
  CardContent,
  CardFooter,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableHeader,
  TableRow,
  TableHead,
  TableBody,
  TableCell,
} from "@/components/ui/table";

/* -------------------------------------------------------------------------- */

export default function RestaurantMainTablePage() {

 
  return (
    <div className="p-2 space-y-2 pb-10">
      {/* CURRENT ORDER */}
      <Card className="mb-3">
        <CardContent className="p-3">
          <div className="flex justify-between mb-2">
            <div>
              <h3 className="font-semibold text-sm">Current Order</h3>
              <p className="text-xs text-muted-foreground">
               
              </p>
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

        <CardFooter className="p-3">
        
        </CardFooter>
      </Card>

      <Card className="w-full">
        <CardContent className="space-y-4">
          {/* Header */}
          <div className="text-sm font-medium">Order Status</div>

          {/* KOT List */}
          <div className="space-y-3">
         
          </div>
        </CardContent>
      </Card>

  
    </div>
  );
}
