import { CreditCard, Check, Calendar, Users, MapPin, Clock, DollarSign, Mail, Phone } from 'lucide-react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Badge } from '@/components/ui/badge';

interface PaymentSummaryProps {
  bookingData: {
    fullName: string;
    email: string;
    phone: string;
    checkIn: string;
    checkOut: string;
    guests: string;
    roomType: string;
    specialRequests: string;
  };
  nights: number;
  roomPrice: number;
  total: number;
}

export default function PaymentSummary({ bookingData, nights, roomPrice, total }: PaymentSummaryProps) {
  const formatDate = (dateString: string) => {
    if (!dateString) return 'Not selected';
    return new Date(dateString).toLocaleDateString('en-US', { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const getRoomTypeName = (type: string) => {
    const names: Record<string, string> = {
      standard: 'Standard Room',
      deluxe: 'Deluxe Room',
      suite: 'Executive Suite',
      penthouse: 'Penthouse'
    };
    return names[type] || type;
  };

  const taxAmount = (total * 0.1).toFixed(2);
  const serviceFee = (total * 0.05).toFixed(2);
  const grandTotal = (total + parseFloat(taxAmount) + parseFloat(serviceFee)).toFixed(2);

  return (
    <div className="space-y-6">
      {/* Booking Confirmed Header */}
      <Card className="border-green-200 bg-green-50">
        <CardContent className="pt-6">
          <div className="flex items-center justify-center gap-3">
            <div className="h-12 w-12 rounded-full bg-green-500 flex items-center justify-center">
              <Check className="h-6 w-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-green-900">Booking Confirmed!</h3>
              <p className="text-sm text-green-700">Confirmation sent to your email</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Guest Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Guest Information
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-slate-600">Name</span>
            <span className="text-sm font-medium">{bookingData.fullName || 'Not provided'}</span>
          </div>
          <Separator />
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-600 flex items-center gap-2">
              <Mail className="h-4 w-4" />
              Email
            </span>
            <span className="text-sm font-medium">{bookingData.email || 'Not provided'}</span>
          </div>
          <Separator />
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-600 flex items-center gap-2">
              <Phone className="h-4 w-4" />
              Phone
            </span>
            <span className="text-sm font-medium">{bookingData.phone || 'Not provided'}</span>
          </div>
        </CardContent>
      </Card>

      {/* Booking Details */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Booking Details
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between">
            <span className="text-sm text-slate-600">Check-in</span>
            <span className="text-sm font-medium">{formatDate(bookingData.checkIn)}</span>
          </div>
          <Separator />
          <div className="flex justify-between">
            <span className="text-sm text-slate-600">Check-out</span>
            <span className="text-sm font-medium">{formatDate(bookingData.checkOut)}</span>
          </div>
          <Separator />
          <div className="flex justify-between items-center">
            <span className="text-sm text-slate-600 flex items-center gap-2">
              <Clock className="h-4 w-4" />
              Duration
            </span>
            <Badge variant="secondary">{nights} {nights === 1 ? 'Night' : 'Nights'}</Badge>
          </div>
          <Separator />
          <div className="flex justify-between">
            <span className="text-sm text-slate-600">Guests</span>
            <span className="text-sm font-medium">{bookingData.guests}</span>
          </div>
          <Separator />
          <div className="flex justify-between">
            <span className="text-sm text-slate-600">Room Type</span>
            <span className="text-sm font-medium">{getRoomTypeName(bookingData.roomType)}</span>
          </div>
        </CardContent>
      </Card>

      {/* Property Information */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <MapPin className="h-5 w-5" />
            Property
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-1">
            <p className="font-semibold">Sharp Hotels Downtown</p>
            <p className="text-sm text-slate-600">123 Luxury Avenue</p>
            <p className="text-sm text-slate-600">New York, NY 10001</p>
          </div>
        </CardContent>
      </Card>

      {/* Payment Summary */}
      <Card className="border-slate-300">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <DollarSign className="h-5 w-5" />
            Payment Summary
          </CardTitle>
          <CardDescription>Final breakdown of your charges</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">
                ${roomPrice} × {nights} {nights === 1 ? 'night' : 'nights'}
              </span>
              <span className="font-medium">${total.toFixed(2)}</span>
            </div>
            <Separator />
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Service Fee (5%)</span>
              <span className="font-medium">${serviceFee}</span>
            </div>
            <Separator />
            <div className="flex justify-between text-sm">
              <span className="text-slate-600">Taxes (10%)</span>
              <span className="font-medium">${taxAmount}</span>
            </div>
            <Separator className="my-4" />
            <div className="flex justify-between items-center">
              <span className="text-lg font-semibold">Total Amount</span>
              <span className="text-2xl font-bold text-slate-900">${grandTotal}</span>
            </div>
          </div>

          <div className="bg-blue-50 rounded-lg p-4 mt-4">
            <div className="flex items-start gap-2">
              <Check className="h-5 w-5 text-blue-600 mt-0.5" />
              <div>
                <p className="text-sm font-medium text-blue-900">Payment Status</p>
                <p className="text-xs text-blue-700 mt-1">Payment processed successfully</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Special Requests */}
      {bookingData.specialRequests && (
        <Card>
          <CardHeader>
            <CardTitle>Special Requests</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-slate-600">{bookingData.specialRequests}</p>
          </CardContent>
        </Card>
      )}

      {/* Action Buttons */}
      <div className="space-y-3 pt-4">
        <Button className="w-full" size="lg">
          <CreditCard className="mr-2 h-4 w-4" />
          Complete Payment
        </Button>
        <Button variant="outline" className="w-full" size="lg">
          Download Receipt
        </Button>
      </div>

      {/* Footer Note */}
      <Card className="bg-slate-50 border-slate-200">
        <CardContent className="pt-6">
          <p className="text-xs text-slate-600 text-center">
            A confirmation email has been sent to <span className="font-medium">{bookingData.email}</span>
          </p>
          <p className="text-xs text-slate-500 text-center mt-2">
            For any queries, contact us at support@sharphotels.com
          </p>
        </CardContent>
      </Card>
    </div>
  );
}