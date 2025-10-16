import { useState } from "react";
import {
  Calendar,
  MapPin,
  Users,
  Phone,
  Mail,
  CreditCard,
  Check,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSheet } from "@/context/DrawerContext";
import PaymentSummary from "@/components/test/PaymentProps";

export default function SharpHotelsBookingsSection() {
  const { openSheet } = useSheet();

  const handleOpenSheet = () => {
    openSheet(
      <PaymentSummary
        bookingData={formData}
        nights={calculateNights()}
        roomPrice={getRoomPrice()}
        total={calculateTotal()}
      />,
      "Payment Summary",
      "Review your booking details and complete payment",
      "2/4"
    );
  };

  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    checkIn: "",
    checkOut: "",
    guests: "1",
    roomType: "deluxe",
    specialRequests: "",
  });
  const [submitted] = useState(false);

  // const handleSubmit = (e: any) => {
  //   e.preventDefault();
  //   setSubmitted(true);
  //   setTimeout(() => setSubmitted(false), 5000);
  // };

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleGuestsChange = (value: string) => {
    setFormData({ ...formData, guests: value });
  };

  const handleRoomTypeChange = (value: string) => {
    setFormData({ ...formData, roomType: value });
  };

  const calculateNights = () => {
    if (formData.checkIn && formData.checkOut) {
      const checkInDate = new Date(formData.checkIn);
      const checkOutDate = new Date(formData.checkOut);
      const diffTime = checkOutDate.getTime() - checkInDate.getTime();
      return Math.ceil(diffTime / (1000 * 60 * 60 * 24));
    }
    return 0;
  };

  const getRoomPrice = () => {
    const prices: Record<string, number> = {
      standard: 120,
      deluxe: 180,
      suite: 280,
      penthouse: 450,
    };
    return prices[formData.roomType] || 180;
  };

  const calculateTotal = () => {
    return calculateNights() * getRoomPrice();
  };

  return (
    <div className="min-h-screen p-4 md:p-8">
      <div className=" mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Book Your Stay</h1>
          <p className="">Experience luxury and comfort at Sharp Hotels</p>
        </div>

        <div className="grid lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <CardTitle>Reservation Details</CardTitle>
                <CardDescription>
                  Fill in your information to complete your booking
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-slate-900">
                      Guest Information
                    </h3>

                    <div>
                      <Label htmlFor="fullName">Full Name</Label>
                      <Input
                        id="fullName"
                        name="fullName"
                        placeholder="John Doe"
                        value={formData.fullName}
                        onChange={handleChange}
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                          <Input
                            id="email"
                            name="email"
                            type="email"
                            placeholder="john@example.com"
                            className="pl-10"
                            value={formData.email}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="phone">Phone Number</Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                          <Input
                            id="phone"
                            name="phone"
                            type="tel"
                            placeholder="+1 (555) 000-0000"
                            className="pl-10"
                            value={formData.phone}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <h3 className="text-lg font-semibold text-slate-900">
                      Booking Details
                    </h3>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="w-fit">
                        <Label htmlFor="checkIn">Check-in Date</Label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                          <Input
                            id="checkIn"
                            name="checkIn"
                            type="date"
                            className="pl-10"
                            value={formData.checkIn}
                            onChange={handleChange}
                          />
                        </div>
                      </div>

                      <div className="w-fit">
                        <Label htmlFor="checkOut">Check-out Date</Label>
                        <div className="relative">
                          <Calendar className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                          <Input
                            id="checkOut"
                            name="checkOut"
                            type="date"
                            className="pl-10"
                            value={formData.checkOut}
                            onChange={handleChange}
                          />
                        </div>
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label htmlFor="guests">Number of Guests</Label>
                        <Select
                          name="guests"
                          value={formData.guests}
                          onValueChange={handleGuestsChange}
                        >
                          <SelectTrigger className="w-full">
                            <Users className="h-4 w-4 mr-2 text-slate-400" />
                            <SelectValue placeholder="Select guests" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="1">1 Guest</SelectItem>
                            <SelectItem value="2">2 Guests</SelectItem>
                            <SelectItem value="3">3 Guests</SelectItem>
                            <SelectItem value="4">4 Guests</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div className="space-y-2 ">
                        <Label htmlFor="roomType">Room Type</Label>
                        <Select
                          name="roomType"
                          value={formData.roomType}
                          onValueChange={handleRoomTypeChange}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select room type" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="standard">
                              Standard Room - $120/night
                            </SelectItem>
                            <SelectItem value="deluxe">
                              Deluxe Room - $180/night
                            </SelectItem>
                            <SelectItem value="suite">
                              Executive Suite - $280/night
                            </SelectItem>
                            <SelectItem value="penthouse">
                              Penthouse - $450/night
                            </SelectItem>
                          </SelectContent>
                        </Select>
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="specialRequests">
                        Special Requests (Optional)
                      </Label>
                      <textarea
                        id="specialRequests"
                        name="specialRequests"
                        placeholder="Let us know if you have any special requirements..."
                        className="flex min-h-24 w-full rounded-md border border-slate-200 px-3 py-2 text-sm ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-slate-950 focus-visible:ring-offset-2"
                        value={formData.specialRequests}
                        onChange={handleChange}
                      />
                    </div>
                  </div>

                  {submitted && (
                    <Alert className="bg-green-50 border-green-200">
                      <Check className="h-4 w-4 text-green-600" />
                      <AlertDescription className="text-green-800">
                        Booking submitted successfully! Check your email for
                        confirmation.
                      </AlertDescription>
                    </Alert>
                  )}

                  <Button
                    onClick={handleOpenSheet}
                    className="w-full"
                    size="lg"
                  >
                    <CreditCard className="mr-2 h-4 w-4" />
                    Proceed to Payment
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-4">
              <CardHeader>
                <CardTitle>Booking Summary</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-start gap-3">
                  <MapPin className="h-5 w-5 text-slate-500 mt-0.5" />
                  <div>
                    <p className="font-semibold text-slate-900">
                      Sharp Hotels Downtown
                    </p>
                    <p className="text-sm text-slate-600">
                      123 Luxury Avenue, New York
                    </p>
                  </div>
                </div>

                <div className="border-t pt-4 space-y-3">
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Room Type</span>
                    <span className="font-medium capitalize">
                      {formData.roomType}
                    </span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-slate-600">Guests</span>
                    <span className="font-medium">{formData.guests}</span>
                  </div>
                  {calculateNights() > 0 && (
                    <div className="flex justify-between text-sm">
                      <span className="text-slate-600">Duration</span>
                      <span className="font-medium">
                        {calculateNights()} nights
                      </span>
                    </div>
                  )}
                </div>

                <div className="border-t pt-4">
                  <div className="flex justify-between items-center">
                    <span className="text-lg font-semibold">Total</span>
                    <span className="text-2xl font-bold text-slate-900">
                      ${calculateTotal()}
                    </span>
                  </div>
                  <p className="text-xs text-slate-500 mt-2">
                    Taxes and fees included
                  </p>
                </div>

                <div className="bg-blue-50 rounded-lg p-3 mt-4">
                  <p className="text-sm text-blue-900 font-medium">
                    Free Cancellation
                  </p>
                  <p className="text-xs text-blue-700 mt-1">
                    Cancel up to 24 hours before check-in
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
