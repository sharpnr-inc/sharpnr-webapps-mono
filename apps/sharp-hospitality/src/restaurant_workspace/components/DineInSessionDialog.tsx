import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Loader2, PlayCircle } from "lucide-react";

// 1. Import your existing interface or define it here
export interface RestaurantTable {
  TableName: string;
  TableCode: string;
  TableID: string;
  Status: string;
}

// 2. Define Props for the Dialog
interface StartDineInSessionDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  selectedTable: RestaurantTable | null;
  onConfirm: () => Promise<void>;
  isLoading: boolean;
}

const StartDineInSessionDialog: React.FC<StartDineInSessionDialogProps> = ({
  isOpen,
  onOpenChange,
  selectedTable,
  onConfirm,
  isLoading,
}) => {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-100">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <PlayCircle className="w-5 h-5 text-green-600" />
            Start Dine-In Session
          </DialogTitle>
          <DialogDescription>
            Initialize a new session for this table. This will mark it as
            occupied.
          </DialogDescription>
        </DialogHeader>

        {selectedTable && (
          <div className="py-4 border-y my-2 space-y-2">
            <div className="flex justify-between">
              <span className="text-xs text-muted-foreground">Table:</span>
              <span className="text-sm font-bold">
                {selectedTable.TableName}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-xs text-muted-foreground">Code:</span>
              <span className="text-sm font-mono">
                {selectedTable.TableCode}
              </span>
            </div>
          </div>
        )}

        <DialogFooter className="gap-2">
          <Button
            variant="outline"
            onClick={() => onOpenChange(false)}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            className="bg-green-600 hover:bg-green-700 text-white"
            onClick={onConfirm}
            disabled={isLoading}
          >
            {isLoading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Processing...
              </>
            ) : (
              "Confirm & Open"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default StartDineInSessionDialog;
