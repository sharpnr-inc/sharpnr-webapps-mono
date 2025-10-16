import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Utensils, Users, Clock, CheckCircle, XCircle, AlertCircle} from 'lucide-react';

export default function SharpnrHotelRestaurantSection() {
  const [tables, setTables] = useState([
    { id: 1, number: 'T1', capacity: 2, status: 'available', section: 'Main Hall', order: null, shape: 'round' },
    { id: 2, number: 'T2', capacity: 4, status: 'occupied', section: 'Main Hall', order: { guest: 'John Doe', time: '7:30 PM', items: 3 }, shape: 'square' },
    { id: 3, number: 'T3', capacity: 4, status: 'available', section: 'Main Hall', order: null, shape: 'square' },
    { id: 4, number: 'T4', capacity: 6, status: 'reserved', section: 'Window Side', order: { guest: 'Sarah Smith', time: '8:00 PM', items: 0 }, shape: 'rectangle' },
    { id: 5, number: 'T5', capacity: 2, status: 'occupied', section: 'Window Side', order: { guest: 'Mike Johnson', time: '7:00 PM', items: 5 }, shape: 'round' },
    { id: 6, number: 'T6', capacity: 8, status: 'available', section: 'Private Room', order: null, shape: 'rectangle' },
    { id: 7, number: 'T7', capacity: 4, status: 'cleaning', section: 'Main Hall', order: null, shape: 'square' },
    { id: 8, number: 'T8', capacity: 2, status: 'available', section: 'Terrace', order: null, shape: 'round' },
    { id: 9, number: 'T9', capacity: 4, status: 'available', section: 'Terrace', order: null, shape: 'square' },
    { id: 10, number: 'T10', capacity: 6, status: 'reserved', section: 'Private Room', order: { guest: 'Emily Brown', time: '8:30 PM', items: 0 }, shape: 'rectangle' },
  ]);

  const [selectedTable, setSelectedTable] = useState(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [bookingForm, setBookingForm] = useState({ guest: '', time: '', guests: '' });

  const sections = ['All', 'Main Hall', 'Window Side', 'Private Room', 'Terrace'];
  const [activeSection, setActiveSection] = useState('All');

  const getStatusColor = (status:any) => {
    switch (status) {
      case 'available': return 'from-emerald-400 to-emerald-500';
      case 'occupied': return 'from-rose-400 to-rose-500';
      case 'reserved': return 'from-amber-400 to-amber-500';
      case 'cleaning': return 'from-slate-400 to-slate-500';
      default: return 'from-gray-300 to-gray-400';
    }
  };

  const getStatusBorder = (status:any) => {
    switch (status) {
      case 'available': return 'border-emerald-600';
      case 'occupied': return 'border-rose-600';
      case 'reserved': return 'border-amber-600';
      case 'cleaning': return 'border-slate-600';
      default: return 'border-gray-500';
    }
  };

  const getStatusIcon = (status:any) => {
    switch (status) {
      case 'available': return <CheckCircle className="w-4 h-4" />;
      case 'occupied': return <XCircle className="w-4 h-4" />;
      case 'reserved': return <Clock className="w-4 h-4" />;
      case 'cleaning': return <AlertCircle className="w-4 h-4" />;
      default: return null;
    }
  };

  const filteredTables = activeSection === 'All' 
    ? tables 
    : tables.filter(t => t.section === activeSection);

  const handleTableClick = (table:any) => {
    setSelectedTable(table);
    setIsDialogOpen(true);
    setBookingForm({ guest: '', time: '', guests: table.capacity.toString() });
  };

  const handleStatusChange = (newStatus:any) => {
    setTables(tables.map(t => 
      t.id === selectedTable.id ? { ...t, status: newStatus } : t
    ));
    setSelectedTable({ ...selectedTable, status: newStatus });
  };

  const handleBooking = () => {
    if (bookingForm.guest && bookingForm.time) {
      setTables(tables.map(t => 
        t.id === selectedTable.id 
          ? { ...t, status: 'reserved', order: { guest: bookingForm.guest, time: bookingForm.time, items: 0 } }
          : t
      ));
      setIsDialogOpen(false);
      setBookingForm({ guest: '', time: '', guests: '' });
    }
  };

  const stats = {
    total: tables.length,
    available: tables.filter(t => t.status === 'available').length,
    occupied: tables.filter(t => t.status === 'occupied').length,
    reserved: tables.filter(t => t.status === 'reserved').length,
  };

  const renderChairs = (capacity, shape) => {
    const chairs = [];
    const positions = {
      round: [
        { top: '-12px', left: '50%', transform: 'translateX(-50%)' },
        { bottom: '-12px', left: '50%', transform: 'translateX(-50%)' },
      ],
      square: [
        { top: '-12px', left: '12px' },
        { top: '-12px', right: '12px' },
        { bottom: '-12px', left: '12px' },
        { bottom: '-12px', right: '12px' },
      ],
      rectangle: [
        { top: '-12px', left: '20%' },
        { top: '-12px', right: '20%' },
        { top: '50%', left: '-12px', transform: 'translateY(-50%)' },
        { top: '50%', right: '-12px', transform: 'translateY(-50%)' },
        { bottom: '-12px', left: '20%' },
        { bottom: '-12px', right: '20%' },
      ],
    };

    for (let i = 0; i < Math.min(capacity, positions[shape].length); i++) {
      chairs.push(
        <div
          key={i}
          className="absolute w-6 h-6 bg-amber-700 rounded-md shadow-md"
          style={positions[shape][i]}
        />
      );
    }
    return chairs;
  };

  const renderTable = (table) => {
    const baseClasses = `relative cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl shadow-lg border-4 ${getStatusBorder(table.status)}`;
    
    const shapeClasses = {
      round: 'rounded-full',
      square: 'rounded-xl',
      rectangle: 'rounded-2xl',
    };

    const sizeClasses = {
      round: 'w-32 h-32',
      square: 'w-32 h-32',
      rectangle: 'w-48 h-32',
    };

    return (
      <div className="relative p-8 scrollbar-thin scrollbar-track-transparent">
        <div
          className={`${baseClasses} ${shapeClasses[table.shape]} ${sizeClasses[table.shape]} bg-gradient-to-br ${getStatusColor(table.status)}`}
          onClick={() => handleTableClick(table)}
        >
          {renderChairs(table.capacity, table.shape)}
          
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white">
            <div className="font-bold text-2xl drop-shadow-lg">{table.number}</div>
            <div className="flex items-center gap-1 text-sm drop-shadow">
              <Users className="w-4 h-4" />
              {table.capacity}
            </div>
          </div>

          {table.order && (
            <div className="absolute -top-2 -right-2 bg-white rounded-full p-1.5 shadow-lg border-2 border-orange-500">
              <Utensils className="w-4 h-4 text-orange-600" />
            </div>
          )}
        </div>
        
        <div className="text-center mt-2 text-xs font-medium text-slate-600">
          {table.section}
        </div>
      </div>
    );
  };

  return (
    <div className=" bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-6 ">
      <div className=" mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-4xl font-bold text-white flex items-center gap-3">
              <Utensils className="w-10 h-10 text-orange-500" />
              Table Management
            </h1>
            <p className="text-slate-300 mt-2">Visual restaurant floor plan</p>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <Card className="bg-gradient-to-br from-slate-800 to-slate-700 border-slate-600">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm font-medium text-slate-300">Total Tables</p>
                <p className="text-3xl font-bold text-white mt-1">{stats.total}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-emerald-600 to-emerald-700 border-emerald-500">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm font-medium text-emerald-100">Available</p>
                <p className="text-3xl font-bold text-white mt-1">{stats.available}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-rose-600 to-rose-700 border-rose-500">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm font-medium text-rose-100">Occupied</p>
                <p className="text-3xl font-bold text-white mt-1">{stats.occupied}</p>
              </div>
            </CardContent>
          </Card>
          
          <Card className="bg-gradient-to-br from-amber-600 to-amber-700 border-amber-500">
            <CardContent className="pt-6">
              <div className="text-center">
                <p className="text-sm font-medium text-amber-100">Reserved</p>
                <p className="text-3xl font-bold text-white mt-1">{stats.reserved}</p>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Section Filter */}
        <div className="flex gap-2 flex-wrap">
          {sections.map(section => (
            <Button
              key={section}
              variant={activeSection === section ? 'default' : 'outline'}
              onClick={() => setActiveSection(section)}
              className={activeSection === section 
                ? 'bg-orange-600 hover:bg-orange-700 text-white' 
                : 'bg-slate-700 border-slate-600 text-slate-200 hover:bg-slate-600'}
            >
              {section}
            </Button>
          ))}
        </div>

        {/* Restaurant Floor Plan */}
        <Card className="bg-gradient-to-br from-slate-800 to-slate-700 border-slate-600">
          <CardContent className="p-8">
            <div className="bg-slate-900/50 rounded-2xl p-6 min-h-[500px]">
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 place-items-center">
                {filteredTables.map(table => (
                  <div key={table.id}>
                    {renderTable(table)}
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Legend */}
        <Card className="bg-slate-800 border-slate-600">
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-4 justify-center">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-500"></div>
                <span className="text-sm text-slate-300">Available</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-gradient-to-br from-rose-400 to-rose-500"></div>
                <span className="text-sm text-slate-300">Occupied</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-gradient-to-br from-amber-400 to-amber-500"></div>
                <span className="text-sm text-slate-300">Reserved</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-full bg-gradient-to-br from-slate-400 to-slate-500"></div>
                <span className="text-sm text-slate-300">Cleaning</span>
              </div>
              <div className="flex items-center gap-2">
                <Utensils className="w-4 h-4 text-orange-500" />
                <span className="text-sm text-slate-300">Active Order</span>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Table Details Dialog */}
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="sm:max-w-md bg-slate-800 border-slate-600 text-white">
            {selectedTable && (
              <>
                <DialogHeader>
                  <DialogTitle className="flex items-center gap-2 text-white">
                    {selectedTable.number}
                    <Badge className={`bg-gradient-to-br ${getStatusColor(selectedTable.status)} text-white border-0`}>
                      {selectedTable.status}
                    </Badge>
                  </DialogTitle>
                  <DialogDescription className="text-slate-300">
                    {selectedTable.capacity} seats • {selectedTable.section} • {selectedTable.shape} table
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                  {selectedTable.order && (
                    <div className="bg-slate-700 rounded-lg p-4 space-y-2">
                      <h4 className="font-medium text-white">Current Booking</h4>
                      <p className="text-sm text-slate-300">Guest: {selectedTable.order.guest}</p>
                      <p className="text-sm text-slate-300">Time: {selectedTable.order.time}</p>
                      {selectedTable.order.items > 0 && (
                        <p className="text-sm text-slate-300">Orders: {selectedTable.order.items} items</p>
                      )}
                    </div>
                  )}

                  {selectedTable.status === 'available' && (
                    <div className="space-y-3">
                      <h4 className="font-medium text-white">New Booking</h4>
                      <div className="space-y-2">
                        <Label htmlFor="guest" className="text-slate-300">Guest Name</Label>
                        <Input 
                          id="guest" 
                          placeholder="Enter guest name"
                          value={bookingForm.guest}
                          onChange={(e) => setBookingForm({...bookingForm, guest: e.target.value})}
                          className="bg-slate-700 border-slate-600 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="time" className="text-slate-300">Time</Label>
                        <Input 
                          id="time" 
                          type="time"
                          value={bookingForm.time}
                          onChange={(e) => setBookingForm({...bookingForm, time: e.target.value})}
                          className="bg-slate-700 border-slate-600 text-white"
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="guests" className="text-slate-300">Number of Guests</Label>
                        <Input 
                          id="guests" 
                          type="number"
                          max={selectedTable.capacity}
                          value={bookingForm.guests}
                          onChange={(e) => setBookingForm({...bookingForm, guests: e.target.value})}
                          className="bg-slate-700 border-slate-600 text-white"
                        />
                      </div>
                      <Button 
                        className="w-full bg-orange-600 hover:bg-orange-700"
                        onClick={handleBooking}
                      >
                        Confirm Booking
                      </Button>
                    </div>
                  )}

                  <div className="space-y-2">
                    <h4 className="font-medium text-white">Change Status</h4>
                    <div className="grid grid-cols-2 gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleStatusChange('available')}
                        className="bg-emerald-600 hover:bg-emerald-700 text-white border-0"
                      >
                        <CheckCircle className="w-4 h-4 mr-1" />
                        Available
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleStatusChange('occupied')}
                        className="bg-rose-600 hover:bg-rose-700 text-white border-0"
                      >
                        <XCircle className="w-4 h-4 mr-1" />
                        Occupied
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleStatusChange('reserved')}
                        className="bg-amber-600 hover:bg-amber-700 text-white border-0"
                      >
                        <Clock className="w-4 h-4 mr-1" />
                        Reserved
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleStatusChange('cleaning')}
                        className="bg-slate-600 hover:bg-slate-700 text-white border-0"
                      >
                        <AlertCircle className="w-4 h-4 mr-1" />
                        Cleaning
                      </Button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </DialogContent>
        </Dialog>
      </div>
    </div>
  );
}