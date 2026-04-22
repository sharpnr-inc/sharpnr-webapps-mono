import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircle } from "lucide-react";
import type { Property } from "../api/service";
import { cn } from "@/lib/utils";
import { useDomainType } from "../api/queries";

interface PropertyDomainSelectionProps {
  property: Property;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onConfirm: (domainId: string) => void;
}

const PropertyDomainSelection: React.FC<PropertyDomainSelectionProps> = ({
  property,
  open,
  onOpenChange,
  onConfirm,
}) => {
  const { data: domainTypes, isLoading } = useDomainType();
  const [selectedDomain, setSelectedDomain] = useState<any | null>(null);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="min-w-6xl">
        <DialogHeader>
          <DialogTitle>Select Property Domain</DialogTitle>
          <DialogDescription>
            Choose how <strong>{property.name}</strong> will operate. This
            decision is <strong>irreversible</strong>.
          </DialogDescription>
        </DialogHeader>

        <div className="grid md:grid-cols-3 gap-4">
          {isLoading
            ? Array.from({ length: 3 }).map((_, i) => (
                <Card key={i} className=" animate-pulse" />
              ))
            : domainTypes?.data?.domains.map((d: any) => {
                const disabled = !d.IsAvailable;

                return (
                  <Card
                    key={d.ID}
                    className={cn(
                      "relative transition border min-w-full",
                      disabled
                        ? "opacity-50 cursor-not-allowed"
                        : "cursor-pointer hover:border-primary",
                      selectedDomain?.ID === d.ID &&
                        "border-primary ring-1 ring-primary",
                    )}
                    onClick={() => !disabled && setSelectedDomain(d)}
                  >
                    <CardHeader className="space-y-1">
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-sm">{d.Name}</CardTitle>
                        {!d.IsAvailable && (
                          <Badge variant="secondary">Coming Soon</Badge>
                        )}
                      </div>
                    </CardHeader>

                    <CardContent>
                      <p className="text-xs text-muted-foreground">
                        {d.Description}
                      </p>
                    </CardContent>

                    <CardFooter>
                      <Button
                        variant={
                          selectedDomain?.ID === d.ID ? "default" : "outline"
                        }
                        disabled={disabled}
                        className="w-full"
                      >
                        {selectedDomain?.ID === d.ID ? "Selected" : "Select"}
                      </Button>
                    </CardFooter>
                  </Card>
                );
              })}
        </div>

        {/* Warning */}
        {selectedDomain && (
          <Alert variant="destructive" className="mt-4">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Irreversible Action</AlertTitle>
            <AlertDescription>
              You are about to set the domain to{" "}
              <strong>{selectedDomain.Name}</strong>. This cannot be changed
              later.
            </AlertDescription>
          </Alert>
        )}

        <DialogFooter className="mt-4">
          <Button variant="ghost" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button
            disabled={!selectedDomain}
            onClick={() => {
              onConfirm(selectedDomain.ID);
              onOpenChange(false);
            }}
          >
            Confirm & Continue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default PropertyDomainSelection;
