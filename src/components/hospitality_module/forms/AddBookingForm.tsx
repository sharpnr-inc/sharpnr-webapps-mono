"use client"
import { Button } from "@/components/ui/button";
import { useForm } from "@tanstack/react-form";
import { Input } from "@/components/ui/input";

export default function AddBookingForm({ room }: { room: any }) {
  const form = useForm({
    defaultValues: {
      room_id: "",
      floor_id: "",
      booking_data: {
        from_: "",
        to_: "",
      },
      payments: {
        advance_payment: 0,
      },
      guest_list: [
        {
          guest_name: "",
          guest_email: "",
          guest_mobile: "",
        },
      ],
      number_of_guest: 0,
      bill_to: {
        name: "",
        email: "",
        mobile: "",
      },
    },
    onSubmit: async ({ value }) => {
      console.log(value);
    },
  });

  return (
    <div className="w-full max-w-6xl mx-auto p-4 md:p-6">
      <div className="mb-6">
        <h1 className="text-2xl md:text-3xl font-bold">Book #{room.room_name}</h1>
        <p className="text-sm text-gray-600 mt-1">Complete the booking details below</p>
      </div>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          e.stopPropagation();
          form.handleSubmit();
        }}
        className="space-y-8"
      >
        {/* Room Information */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold border-b pb-2">Room Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <form.Field name="room_id">
              {(field) => (
                <div className="space-y-2">
                  <label htmlFor="room_id" className="text-sm font-medium">
                    Room ID
                  </label>
                  <Input
                    id="room_id"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Enter room ID"
                  />
                </div>
              )}
            </form.Field>

            <form.Field name="floor_id">
              {(field) => (
                <div className="space-y-2">
                  <label htmlFor="floor_id" className="text-sm font-medium">
                    Floor ID
                  </label>
                  <Input
                    id="floor_id"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Enter floor ID"
                  />
                </div>
              )}
            </form.Field>
          </div>
        </div>

        {/* Booking Dates */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold border-b pb-2">Booking Dates</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <form.Field name="booking_data.from_">
              {(field) => (
                <div className="space-y-2">
                  <label htmlFor="from_date" className="text-sm font-medium">
                    Check-in Date
                  </label>
                  <Input
                    id="from_date"
                    type="date"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </div>
              )}
            </form.Field>

            <form.Field name="booking_data.to_">
              {(field) => (
                <div className="space-y-2">
                  <label htmlFor="to_date" className="text-sm font-medium">
                    Check-out Date
                  </label>
                  <Input
                    id="to_date"
                    type="date"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                  />
                </div>
              )}
            </form.Field>
          </div>
        </div>

        {/* Guest Information */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold border-b pb-2">Guest Information</h2>
          <div className="grid grid-cols-1 gap-4">
            <form.Field name="number_of_guest">
              {(field) => (
                <div className="space-y-2">
                  <label htmlFor="number_of_guest" className="text-sm font-medium">
                    Number of Guests
                  </label>
                  <Input
                    id="number_of_guest"
                    type="number"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                    placeholder="0"
                  />
                </div>
              )}
            </form.Field>
          </div>
        </div>

        {/* Primary Guest Details */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold border-b pb-2">Primary Guest Details</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <form.Field name="guest_list[0].guest_name">
              {(field) => (
                <div className="space-y-2">
                  <label htmlFor="guest_name" className="text-sm font-medium">
                    Guest Name
                  </label>
                  <Input
                    id="guest_name"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Enter guest name"
                  />
                </div>
              )}
            </form.Field>

            <form.Field name="guest_list[0].guest_email">
              {(field) => (
                <div className="space-y-2">
                  <label htmlFor="guest_email" className="text-sm font-medium">
                    Guest Email
                  </label>
                  <Input
                    id="guest_email"
                    type="email"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="guest@example.com"
                  />
                </div>
              )}
            </form.Field>

            <form.Field name="guest_list[0].guest_mobile">
              {(field) => (
                <div className="space-y-2">
                  <label htmlFor="guest_mobile" className="text-sm font-medium">
                    Guest Mobile
                  </label>
                  <Input
                    id="guest_mobile"
                    type="tel"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Enter mobile number"
                  />
                </div>
              )}
            </form.Field>
          </div>
        </div>

        {/* Payment Information */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold border-b pb-2">Payment</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <form.Field name="payments.advance_payment">
              {(field) => (
                <div className="space-y-2">
                  <label htmlFor="advance_payment" className="text-sm font-medium">
                    Advance Payment
                  </label>
                  <Input
                    id="advance_payment"
                    type="number"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(Number(e.target.value))}
                    placeholder="0"
                  />
                  <p className="text-xs text-gray-500">Enter the advance payment amount</p>
                </div>
              )}
            </form.Field>
          </div>
        </div>

        {/* Billing Information */}
        <div className="space-y-4">
          <h2 className="text-lg font-semibold border-b pb-2">Billing Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <form.Field name="bill_to.name">
              {(field) => (
                <div className="space-y-2">
                  <label htmlFor="bill_to_name" className="text-sm font-medium">
                    Name
                  </label>
                  <Input
                    id="bill_to_name"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Enter billing name"
                  />
                </div>
              )}
            </form.Field>

            <form.Field name="bill_to.email">
              {(field) => (
                <div className="space-y-2">
                  <label htmlFor="bill_to_email" className="text-sm font-medium">
                    Email
                  </label>
                  <Input
                    id="bill_to_email"
                    type="email"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="billing@example.com"
                  />
                </div>
              )}
            </form.Field>

            <form.Field name="bill_to.mobile">
              {(field) => (
                <div className="space-y-2">
                  <label htmlFor="bill_to_mobile" className="text-sm font-medium">
                    Mobile
                  </label>
                  <Input
                    id="bill_to_mobile"
                    type="tel"
                    value={field.state.value}
                    onChange={(e) => field.handleChange(e.target.value)}
                    placeholder="Enter mobile number"
                  />
                </div>
              )}
            </form.Field>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 pt-4">
          <Button type="submit" className="w-full sm:w-auto">
            Submit Booking
          </Button>
          <Button variant="outline" type="button" className="w-full sm:w-auto">
            Cancel
          </Button>
        </div>
      </form>
    </div>
  );
}