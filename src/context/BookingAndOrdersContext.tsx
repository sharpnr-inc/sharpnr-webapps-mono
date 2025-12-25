import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { createContext, useContext, useMemo, type ReactNode } from "react";
import { useEmployeePolicy } from "./EmployeePolicyContext";

// -------------------------
// Context Types
// -------------------------
interface BookingAndOrdersNotificationContextType {
  able_to_see: boolean;
}

// -------------------------
// Create Context
// -------------------------
const BookingAndOrdersContext = createContext<
  BookingAndOrdersNotificationContextType | undefined
>(undefined);

// -------------------------
// Provider
// -------------------------
export function BookingAndOrdersNotificationProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { policy } = useEmployeePolicy();

  // ✅ Check privileges for hotel.booking
  const able_to_see = useMemo(() => {
    const bookingAccess =
      policy?.Privilages?.sharp_hospitality?.sections?.hotel.booking;
    return bookingAccess === "" || bookingAccess === "WRITE";
  }, [policy]);

  return (
    <BookingAndOrdersContext.Provider value={{ able_to_see }}>
      {children}

      {able_to_see && (
        <div className="fixed top-10 z-50 right-5 w-80">
          <Card className="shadow-lg border border-gray-200">
            <CardHeader>
              <CardTitle className="text-base">
                Booking for 2
              </CardTitle>
              <CardDescription className="text-sm text-gray-600">
                Booking for 2 Adults on Wednesday, 23-Oct-2025
              </CardDescription>
            </CardHeader>
            <CardContent className="flex justify-end gap-2">
              <Button variant="default" size="sm">
                Accept
              </Button>
              <Button variant="destructive" size="sm">
                Decline
              </Button>
            </CardContent>
          </Card>
        </div>
      )}
    </BookingAndOrdersContext.Provider>
  );
}

// -------------------------
// Hook to use this context
// -------------------------
export function useBookingAndOrdersNotification() {
  const context = useContext(BookingAndOrdersContext);
  if (!context) {
    throw new Error(
      "useBookingAndOrdersNotification must be used within a BookingAndOrdersNotificationProvider"
    );
  }
  return context;
}
