import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  useMenuGroup,
  useMenuGroupDetails,
} from "@/api_service/queries/HospitalityQueries/Menu";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";


export function RestaurantOrderTerminal({ tableId }: any) {
  const { data, isLoading, error } = useMenuGroup();
  const [menuId, setMenuId] = useState("");

  const {
    data: menu,
    isLoading: menuIsLoading,
    error: menuIsError,
  } = useMenuGroupDetails(menuId);


  if (isLoading || menuIsLoading) return <div>Loading...</div>;
  if (error || menuIsError) return <div>Error loading menus</div>;

  const menuGroups = data?.data ?? [];

  const invoices = [
    {
      invoice: "INV001",
      paymentStatus: "Paid",
      totalAmount: "$250.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV002",
      paymentStatus: "Pending",
      totalAmount: "$150.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV003",
      paymentStatus: "Unpaid",
      totalAmount: "$350.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV004",
      paymentStatus: "Paid",
      totalAmount: "$450.00",
      paymentMethod: "Credit Card",
    },
    {
      invoice: "INV005",
      paymentStatus: "Paid",
      totalAmount: "$550.00",
      paymentMethod: "PayPal",
    },
    {
      invoice: "INV006",
      paymentStatus: "Pending",
      totalAmount: "$200.00",
      paymentMethod: "Bank Transfer",
    },
    {
      invoice: "INV007",
      paymentStatus: "Unpaid",
      totalAmount: "$300.00",
      paymentMethod: "Credit Card",
    },
  ];

  return (
    <>
      <div className="flex p-2 gap-2">
        {/* LEFT SIDE - KOT & Order Management */}
        <div className="w-8/12 space-y-3 border p-4 rounded-lg h-full max-h-[calc(90vh-8.5rem)] overflow-y-scroll relative flex flex-col">
          <Table>
            <TableCaption>A list of your recent invoices.</TableCaption>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Invoice</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Method</TableHead>
                <TableHead className="text-right">Amount</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoices.map((invoice) => (
                <TableRow key={invoice.invoice}>
                  <TableCell className="font-medium">
                    {invoice.invoice}
                  </TableCell>
                  <TableCell>{invoice.paymentStatus}</TableCell>
                  <TableCell>{invoice.paymentMethod}</TableCell>
                  <TableCell className="text-right">
                    {invoice.totalAmount}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
            <TableFooter>
              <TableRow>
                <TableCell colSpan={3}>Total</TableCell>
                <TableCell className="text-right">$2,500.00</TableCell>
              </TableRow>
            </TableFooter>
          </Table>
        </div>

        {/* RIGHT SIDE - MENU */}
        <div className="w-4/12 border p-2 rounded-lg max-h-[calc(90vh-8.5rem)] overflow-y-scroll">
          <div className="p-2 space-y-3">
            {/* Menu Select */}
            <Select value={menuId} onValueChange={setMenuId}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Menu group" />
              </SelectTrigger>

              <SelectContent>
                <SelectGroup>
                  {menuGroups?.map((grp: any) => (
                    <SelectItem key={grp.Id} value={grp.Id}>
                      {grp.Name}
                    </SelectItem>
                  ))}
                </SelectGroup>
              </SelectContent>
            </Select>

            <Input placeholder="Search Item"></Input>

            {/* Loading State */}
            {menuIsLoading && (
              <div className="text-sm text-muted-foreground">
                Loading menu...
              </div>
            )}

            {/* Menu Tree */}
            {menu?.data?.length > 0 && (
              <Accordion type="multiple" className="w-full">
                {menu.data.map((cat: any) => (
                  <AccordionItem key={cat.id} value={cat.id}>
                    <AccordionTrigger>{cat.name}</AccordionTrigger>

                    <AccordionContent>
                      <Accordion type="multiple" className="w-full space-y-2">
                        {cat.sub_categories?.map((subCat: any) => (
                          <AccordionItem key={subCat.id} value={subCat.id}>
                            <AccordionTrigger>{subCat.name}</AccordionTrigger>

                            <AccordionContent className="space-y-2">
                              {subCat.menu_items?.map((mti: any) => (
                                <div
                                  key={mti.id}
                                  className="border p-2 rounded-md shadow-sm"
                                >
                                  <div className="flex justify-between font-medium">
                                    <span>{mti.name}</span>
                                    <span>{mti.price}</span>
                                  </div>

                                  <div className="flex justify-between items-center mt-1">
                                    <span className="text-xs text-muted-foreground">
                                      {mti.variant_groups ? "Customize" : ""}
                                    </span>

                                    <Button
                                      size="sm"
                                      onClick={() => console.log(mti.id)}
                                    >
                                      Add
                                    </Button>
                                  </div>
                                </div>
                              ))}
                            </AccordionContent>
                          </AccordionItem>
                        ))}
                      </Accordion>
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
