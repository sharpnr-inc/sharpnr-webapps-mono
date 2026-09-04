import { Link } from "@tanstack/react-router";
import {
  Badge,
  Button,
  Card,
  CardContent,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  toast,
} from "@sharpnr/ui";

import { useMarketplaceStore, type RfqStatus } from "@/store/MarketplaceStore";

/** Status is a state, so it ships with a word, never colour alone. */
const statusTone: Record<RfqStatus, string> = {
  Sent: "text-amber-600 dark:text-amber-400",
  Quoted: "text-emerald-600 dark:text-emerald-400",
  Withdrawn: "text-muted-foreground",
};

export function RfqsPage() {
  const rfqs = useMarketplaceStore((s) => s.rfqs);
  const withdrawRfq = useMarketplaceStore((s) => s.withdrawRfq);

  const open = rfqs.filter((r) => r.status !== "Withdrawn").length;

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">
          Requests for quotation
        </h1>
        <p className="text-sm text-muted-foreground">
          {open} open · quotations come back through Cables or your preferred
          channel.
        </p>
      </div>

      {rfqs.length === 0 ? (
        <div className="rounded-lg border border-dashed py-16 text-center">
          <p className="text-sm font-medium">No RFQs yet</p>
          <p className="mt-1 text-sm text-muted-foreground">
            Request a quote from any listing and it will appear here.
          </p>
          <Button variant="outline" size="sm" className="mt-4" asChild>
            <Link to="/browse">Browse the network</Link>
          </Button>
        </div>
      ) : (
        <Card>
          <CardContent className="pt-1">
            {/* Wide content scrolls inside its own container so the page body
                never scrolls sideways on a narrow window. */}
            <div className="overflow-x-auto">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Reference</TableHead>
                    <TableHead>Listing</TableHead>
                    <TableHead>Supplier</TableHead>
                    <TableHead className="text-right">Quantity</TableHead>
                    <TableHead>Needed by</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className="text-right">Action</TableHead>
                  </TableRow>
                </TableHeader>

                <TableBody>
                  {rfqs.map((rfq) => (
                    <TableRow key={rfq.id}>
                      <TableCell className="whitespace-nowrap font-mono text-xs">
                        {rfq.id}
                      </TableCell>
                      <TableCell className="max-w-[280px]">
                        <Link
                          to="/listings/$listingId"
                          params={{ listingId: rfq.listingId }}
                          className="line-clamp-1 font-medium hover:underline"
                        >
                          {rfq.listingTitle}
                        </Link>
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-muted-foreground">
                        {rfq.supplierName}
                      </TableCell>
                      <TableCell className="text-right tabular-nums">
                        {rfq.quantity.toLocaleString("en-IN")}
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-muted-foreground">
                        {rfq.neededBy}
                      </TableCell>
                      <TableCell>
                        <span
                          className={`text-sm font-medium ${statusTone[rfq.status]}`}
                        >
                          {rfq.status}
                        </span>
                      </TableCell>
                      <TableCell className="text-right">
                        {rfq.status === "Withdrawn" ? (
                          <Badge variant="secondary">Closed</Badge>
                        ) : (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => {
                              withdrawRfq(rfq.id);
                              toast.success(`${rfq.id} withdrawn`, {
                                description: `${rfq.supplierName} has been notified.`,
                              });
                            }}
                          >
                            Withdraw
                          </Button>
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
}

export default RfqsPage;
