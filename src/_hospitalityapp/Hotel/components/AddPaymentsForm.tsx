import React from "react";
import { useForm } from "react-hook-form";
import { CreditCard } from "lucide-react";
import { Field, FieldLabel } from "@/components/ui/field";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useMutationAddPaymentInHotelRoomBooking } from "@/_hospitalityapp/Hotel/apis/mutations/Hotel";
import { Value } from "@radix-ui/react-select";

// Interface based on Go struct
interface AddPaymentsForBookingRequest {
  booking_id: string; // UUID as string
  amount: number;
  method: string;
  reference?: string;
}

// Payment methods
const PAYMENT_METHODS = [
  "CASH",
  "CARD",
  "UPI",
  "NET_BANKING",
  "CHEQUE",
  "WALLET",
];

interface AddPaymentsInHotelRoomBookingFormProps {
  bookingID: string;
  closeModal: () => void;
}

export function AddPaymentsInHotelRoomBookingForm({
  bookingID,
  closeModal,
}: AddPaymentsInHotelRoomBookingFormProps) {
  const addPayment = useMutationAddPaymentInHotelRoomBooking();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      booking_id: bookingID,
      amount: 0,
      method: "CASH",
      reference: "",
    },
  });

  const onSubmit = async (data: any) => {
    try {
      // Remove reference if empty
      const payload = {
        ...data,
        reference: data.reference?.trim() ? data.reference : undefined,
      };

      console.log("Payment data:", payload);

      addPayment.mutateAsync(payload);
      closeModal();
    } catch (error) {
      console.error("Error submitting payment:", error);
    }
  };

  const getPlaceholder = () => {
    switch (selectedMethod) {
      case "CARD":
        return "Last 4 digits / Transaction ID";
      case "UPI":
        return "UPI Transaction ID";
      case "CHEQUE":
        return "Cheque Number";
      case "NET_BANKING":
        return "Transaction Reference";
      default:
        return "Optional reference number";
    }
  };

  const selectedMethod = watch("method");
  const requiresReference = ["CARD", "UPI", "NET_BANKING", "CHEQUE"].includes(
    selectedMethod
  );

  return (
    <div className="w-full">
      <div className="mb-6">
        <h2 className="flex items-center gap-2 text-xl font-semibold">
          <CreditCard className="h-5 w-5" />
          Add Payment
        </h2>
      </div>

      <div className="space-y-4">
        {/* Amount Field */}
        <Field>
          <FieldLabel>
            Amount <span className="text-red-500">*</span>
          </FieldLabel>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500">
              ₹
            </span>
            <Input
              type="number"
              step="0.01"
              placeholder="0.00"
              className="pl-8"
              {...register("amount", {
                required: "Amount is required",
                min: { value: 0.01, message: "Amount must be greater than 0" },
                valueAsNumber: true,
              })}
            />
          </div>
          {errors.amount && (
            <p className="text-sm text-red-500 mt-1">{errors.amount.message}</p>
          )}
        </Field>

        {/* Payment Method Field */}
        <Field>
          <FieldLabel>
            Payment Method <span className="text-red-500">*</span>
          </FieldLabel>
          <Select
            {...register("method", { required: "Payment method is required" })}
            defaultValue="CASH"
          >
            <SelectTrigger>
              <SelectValue placeholder="Select payment method" />
            </SelectTrigger>
            <SelectContent>
              {PAYMENT_METHODS.map((method) => (
                <SelectItem key={method} value={method}>
                  {method.replace("_", " ")}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          {errors.method && (
            <p className="text-sm text-red-500 mt-1">{errors.method.message}</p>
          )}
        </Field>

        {/* Reference Field */}
        <Field>
          <FieldLabel>
            Reference Number
            {requiresReference && <span className="text-red-500">*</span>}
          </FieldLabel>
          <Input
            placeholder={getPlaceholder()}
            {...register("reference", {
              required: requiresReference
                ? "Reference is required for this payment method"
                : false,
            })}
          />
          {errors.reference && (
            <p className="text-sm text-red-500 mt-1">
              {errors.reference.message}
            </p>
          )}
        </Field>

        {/* Booking ID Display (readonly) */}
        <div className="rounded-lg p-3 text-sm">
          <span className="">Booking ID:</span>{" "}
          <span className="font-mono font-medium ">{bookingID}</span>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex justify-end gap-3 pt-6">
        <Button type="button" variant="outline" onClick={closeModal}>
          Cancel
        </Button>
        <Button
          type="button"
          onClick={handleSubmit(onSubmit)}
          className="bg-blue-600 hover:bg-blue-700"
        >
          Add Payment
        </Button>
      </div>
    </div>
  );
}
