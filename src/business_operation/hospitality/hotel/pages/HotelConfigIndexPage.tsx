/*
 * Hotel Configuration (DUMMY).
 * Rendered at /property/$propertyId/business_op_modules/hospitality/hotel/$hotelID
 *
 * There is no hotel API yet, so this page keeps everything in local state:
 * a seeded list of rooms you can add to, plus reference tabs for room types
 * and amenities. Swap the local state for real queries/mutations when the
 * backend is ready.
 */

import { useMemo, useState } from "react";
import {
  ArrowLeft,
  BedDouble,
  CheckCircle2,
  DoorOpen,
  Hotel,
  Layers,
  Plus,
  Trash2,
} from "lucide-react";
import { useNavigate } from "@tanstack/react-router";
import {
  Badge,
  Button,
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
  Checkbox,
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  Input,
  Label,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
  Separator,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
  toast,
} from "@sharpnr/ui";
import { Route } from "@/routes/_appuser/property/$propertyId/business_op_modules/hospitality/hotel/$hotelID/index";

/* ── domain (dummy) ──────────────────────────────────── */
type RoomStatus = "Available" | "Occupied" | "Maintenance";

interface Room {
  id: string;
  number: string;
  type: string;
  floor: number;
  capacity: number;
  pricePerNight: number;
  status: RoomStatus;
  amenities: string[];
}

const ROOM_TYPES = [
  {
    name: "Standard",
    description: "Comfortable room with the essentials.",
    basePrice: 80,
  },
  {
    name: "Deluxe",
    description: "More space and upgraded furnishings.",
    basePrice: 130,
  },
  {
    name: "Suite",
    description: "Separate living area for longer stays.",
    basePrice: 220,
  },
  {
    name: "Executive",
    description: "Top-floor rooms with premium amenities.",
    basePrice: 320,
  },
] as const;

const AMENITIES = [
  "Wi-Fi",
  "Air Conditioning",
  "TV",
  "Mini Bar",
  "Balcony",
  "Room Service",
  "Safe",
  "Bathtub",
] as const;

const SEED_ROOMS: Room[] = [
  {
    id: "room-101",
    number: "101",
    type: "Standard",
    floor: 1,
    capacity: 2,
    pricePerNight: 80,
    status: "Available",
    amenities: ["Wi-Fi", "Air Conditioning", "TV"],
  },
  {
    id: "room-102",
    number: "102",
    type: "Deluxe",
    floor: 1,
    capacity: 3,
    pricePerNight: 130,
    status: "Occupied",
    amenities: ["Wi-Fi", "Air Conditioning", "TV", "Mini Bar"],
  },
  {
    id: "room-201",
    number: "201",
    type: "Suite",
    floor: 2,
    capacity: 4,
    pricePerNight: 220,
    status: "Maintenance",
    amenities: ["Wi-Fi", "Air Conditioning", "TV", "Balcony", "Bathtub"],
  },
];

const STATUS_STYLES: Record<RoomStatus, string> = {
  Available:
    "border-emerald-500/30 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400",
  Occupied: "border-sky-500/30 bg-sky-500/10 text-sky-600 dark:text-sky-400",
  Maintenance:
    "border-amber-500/30 bg-amber-500/10 text-amber-600 dark:text-amber-400",
};

/* ── empty add-room form ─────────────────────────────── */
interface RoomForm {
  number: string;
  type: string;
  floor: string;
  capacity: string;
  pricePerNight: string;
  status: RoomStatus;
  amenities: string[];
}

const emptyForm: RoomForm = {
  number: "",
  type: ROOM_TYPES[0].name,
  floor: "1",
  capacity: "2",
  pricePerNight: String(ROOM_TYPES[0].basePrice),
  status: "Available",
  amenities: ["Wi-Fi", "Air Conditioning"],
};

/* ── stat tile ───────────────────────────────────────── */
function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: React.ElementType;
  label: string;
  value: number | string;
}) {
  return (
    <Card>
      <CardContent className="flex items-center gap-3 p-4">
        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg border bg-muted text-muted-foreground">
          <Icon className="h-5 w-5" />
        </div>
        <div className="min-w-0">
          <p className="text-xl font-bold leading-none text-foreground">
            {value}
          </p>
          <p className="mt-1 truncate text-xs text-muted-foreground">{label}</p>
        </div>
      </CardContent>
    </Card>
  );
}

/* ─────────────────────────────────────────────────────── */
const HotelConfigIndexPage = () => {
  const { propertyId, hotelID } = Route.useParams();
  const nav = useNavigate();

  const [rooms, setRooms] = useState<Room[]>(SEED_ROOMS);
  const [dialogOpen, setDialogOpen] = useState(false);
  const [form, setForm] = useState<RoomForm>(emptyForm);

  const stats = useMemo(() => {
    const available = rooms.filter((r) => r.status === "Available").length;
    const occupied = rooms.filter((r) => r.status === "Occupied").length;
    const types = new Set(rooms.map((r) => r.type)).size;
    return { total: rooms.length, available, occupied, types };
  }, [rooms]);

  const setField = <K extends keyof RoomForm>(key: K, value: RoomForm[K]) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const toggleAmenity = (amenity: string) =>
    setForm((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenity)
        ? prev.amenities.filter((a) => a !== amenity)
        : [...prev.amenities, amenity],
    }));

  const numberTaken = rooms.some(
    (r) => r.number.toLowerCase() === form.number.trim().toLowerCase(),
  );
  const canSubmit = form.number.trim().length > 0 && !numberTaken;

  const handleAddRoom = () => {
    if (!canSubmit) return;
    const room: Room = {
      id: `room-${Date.now()}`,
      number: form.number.trim(),
      type: form.type,
      floor: Number(form.floor) || 1,
      capacity: Number(form.capacity) || 1,
      pricePerNight: Number(form.pricePerNight) || 0,
      status: form.status,
      amenities: form.amenities,
    };
    setRooms((prev) => [...prev, room]);
    toast.success(`Room ${room.number} added`);
    setForm(emptyForm);
    setDialogOpen(false);
  };

  const handleDeleteRoom = (id: string) => {
    setRooms((prev) => prev.filter((r) => r.id !== id));
    toast.success("Room removed");
  };

  return (
    <div className="mx-auto max-w-6xl space-y-6 px-4 py-6 sm:px-6">
      {/* ── Back nav ───────────────────────────────── */}
      <button
        onClick={() =>
          nav({
            to: "/property/$propertyId/details",
            params: { propertyId },
          })
        }
        className="flex items-center gap-1.5 text-xs text-muted-foreground transition-colors hover:text-foreground"
      >
        <ArrowLeft className="h-3.5 w-3.5" />
        Back to property
      </button>

      {/* ── Header ─────────────────────────────────── */}
      <div className="rounded-xl border bg-card shadow-sm">
        <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-4">
            <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border bg-primary/10 text-primary">
              <Hotel className="h-6 w-6" />
            </div>
            <div className="min-w-0 space-y-1">
              <div className="flex flex-wrap items-center gap-2">
                <h1 className="truncate text-xl font-bold tracking-tight text-foreground">
                  Hotel Configuration
                </h1>
                <Badge variant="secondary" className="font-mono text-[10px]">
                  {hotelID.slice(0, 8)}…
                </Badge>
              </div>
              <p className="text-xs text-muted-foreground">
                Manage rooms, room types and amenities for this hotel.
              </p>
            </div>
          </div>

          <AddRoomDialog
            open={dialogOpen}
            onOpenChange={(o) => {
              setDialogOpen(o);
              if (!o) setForm(emptyForm);
            }}
            form={form}
            setField={setField}
            toggleAmenity={toggleAmenity}
            numberTaken={numberTaken}
            canSubmit={canSubmit}
            onSubmit={handleAddRoom}
          />
        </div>
      </div>

      {/* ── Stats ──────────────────────────────────── */}
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <StatCard icon={DoorOpen} label="Total rooms" value={stats.total} />
        <StatCard
          icon={CheckCircle2}
          label="Available"
          value={stats.available}
        />
        <StatCard icon={BedDouble} label="Occupied" value={stats.occupied} />
        <StatCard icon={Layers} label="Room types" value={stats.types} />
      </div>

      {/* ── Tabs ───────────────────────────────────── */}
      <Tabs defaultValue="rooms" className="space-y-4">
        <TabsList>
          <TabsTrigger value="rooms">Rooms</TabsTrigger>
          <TabsTrigger value="types">Room Types</TabsTrigger>
          <TabsTrigger value="amenities">Amenities</TabsTrigger>
        </TabsList>

        {/* Rooms */}
        <TabsContent value="rooms">
          <Card>
            <CardHeader className="flex-row items-center justify-between gap-3 space-y-0">
              <div className="space-y-1">
                <CardTitle className="text-base">Rooms</CardTitle>
                <CardDescription>
                  Every room configured for this hotel.
                </CardDescription>
              </div>
              <Button
                size="sm"
                className="gap-1.5"
                onClick={() => setDialogOpen(true)}
              >
                <Plus className="h-3.5 w-3.5" />
                Add Room
              </Button>
            </CardHeader>
            <CardContent>
              {rooms.length === 0 ? (
                <div className="flex flex-col items-center gap-2 py-12 text-center">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full border bg-muted text-muted-foreground">
                    <DoorOpen className="h-5 w-5" />
                  </div>
                  <p className="text-sm font-medium text-foreground">
                    No rooms yet
                  </p>
                  <p className="max-w-xs text-xs text-muted-foreground">
                    Use “Add Room” to configure your first room.
                  </p>
                </div>
              ) : (
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Room</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Floor</TableHead>
                      <TableHead>Capacity</TableHead>
                      <TableHead>Price / night</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {rooms.map((room) => (
                      <TableRow key={room.id}>
                        <TableCell className="font-medium">
                          {room.number}
                        </TableCell>
                        <TableCell>{room.type}</TableCell>
                        <TableCell>{room.floor}</TableCell>
                        <TableCell>{room.capacity} guests</TableCell>
                        <TableCell>${room.pricePerNight}</TableCell>
                        <TableCell>
                          <Badge
                            variant="outline"
                            className={STATUS_STYLES[room.status]}
                          >
                            {room.status}
                          </Badge>
                        </TableCell>
                        <TableCell className="text-right">
                          <Button
                            variant="ghost"
                            size="icon"
                            className="h-8 w-8 text-muted-foreground hover:text-destructive"
                            onClick={() => handleDeleteRoom(room.id)}
                            aria-label={`Remove room ${room.number}`}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        {/* Room types */}
        <TabsContent value="types">
          <div className="grid gap-3 sm:grid-cols-2">
            {ROOM_TYPES.map((type) => {
              const count = rooms.filter((r) => r.type === type.name).length;
              return (
                <Card key={type.name}>
                  <CardHeader className="space-y-0 pb-3">
                    <div className="flex items-center justify-between gap-2">
                      <CardTitle className="text-base">{type.name}</CardTitle>
                      <Badge variant="secondary" className="font-mono text-[10px]">
                        {count} {count === 1 ? "room" : "rooms"}
                      </Badge>
                    </div>
                    <CardDescription>{type.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="flex items-center justify-between pt-0">
                    <span className="text-sm text-muted-foreground">
                      From{" "}
                      <span className="font-semibold text-foreground">
                        ${type.basePrice}
                      </span>{" "}
                      / night
                    </span>
                  </CardContent>
                </Card>
              );
            })}
          </div>
        </TabsContent>

        {/* Amenities */}
        <TabsContent value="amenities">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Amenities</CardTitle>
              <CardDescription>
                Amenities available to assign to rooms.
              </CardDescription>
            </CardHeader>
            <CardContent className="flex flex-wrap gap-2">
              {AMENITIES.map((amenity) => (
                <Badge
                  key={amenity}
                  variant="outline"
                  className="px-2.5 py-1 text-xs font-medium"
                >
                  {amenity}
                </Badge>
              ))}
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

/* ── add-room dialog ─────────────────────────────────── */
function AddRoomDialog({
  open,
  onOpenChange,
  form,
  setField,
  toggleAmenity,
  numberTaken,
  canSubmit,
  onSubmit,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  form: RoomForm;
  setField: <K extends keyof RoomForm>(key: K, value: RoomForm[K]) => void;
  toggleAmenity: (amenity: string) => void;
  numberTaken: boolean;
  canSubmit: boolean;
  onSubmit: () => void;
}) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogTrigger asChild>
        <Button className="w-full shrink-0 gap-2 sm:w-auto">
          <Plus className="h-4 w-4" />
          Add Room
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-lg">
        <DialogHeader>
          <DialogTitle>Add room</DialogTitle>
          <DialogDescription>
            Configure a new room for this hotel.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="room-number">Room number</Label>
              <Input
                id="room-number"
                value={form.number}
                onChange={(e) => setField("number", e.target.value)}
                placeholder="e.g. 305"
                aria-invalid={numberTaken}
              />
              {numberTaken && (
                <p className="text-[11px] text-destructive">
                  That room number already exists.
                </p>
              )}
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="room-floor">Floor</Label>
              <Input
                id="room-floor"
                type="number"
                min={0}
                value={form.floor}
                onChange={(e) => setField("floor", e.target.value)}
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label>Room type</Label>
              <Select
                value={form.type}
                onValueChange={(v) => {
                  setField("type", v);
                  const base = ROOM_TYPES.find((t) => t.name === v)?.basePrice;
                  if (base) setField("pricePerNight", String(base));
                }}
              >
                <SelectTrigger>
                  <SelectValue placeholder="Select type" />
                </SelectTrigger>
                <SelectContent>
                  {ROOM_TYPES.map((t) => (
                    <SelectItem key={t.name} value={t.name}>
                      {t.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-1.5">
              <Label>Status</Label>
              <Select
                value={form.status}
                onValueChange={(v) => setField("status", v as RoomStatus)}
              >
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  {(["Available", "Occupied", "Maintenance"] as const).map(
                    (s) => (
                      <SelectItem key={s} value={s}>
                        {s}
                      </SelectItem>
                    ),
                  )}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-1.5">
              <Label htmlFor="room-capacity">Capacity (guests)</Label>
              <Input
                id="room-capacity"
                type="number"
                min={1}
                value={form.capacity}
                onChange={(e) => setField("capacity", e.target.value)}
              />
            </div>
            <div className="space-y-1.5">
              <Label htmlFor="room-price">Price / night ($)</Label>
              <Input
                id="room-price"
                type="number"
                min={0}
                value={form.pricePerNight}
                onChange={(e) => setField("pricePerNight", e.target.value)}
              />
            </div>
          </div>

          <Separator />

          <div className="space-y-2">
            <Label>Amenities</Label>
            <div className="grid grid-cols-2 gap-2">
              {AMENITIES.map((amenity) => {
                const checked = form.amenities.includes(amenity);
                return (
                  <label
                    key={amenity}
                    className="flex cursor-pointer items-center gap-2 rounded-md border border-border/70 px-2.5 py-2 text-sm transition-colors hover:bg-muted/50"
                  >
                    <Checkbox
                      checked={checked}
                      onCheckedChange={() => toggleAmenity(amenity)}
                    />
                    <span className="truncate">{amenity}</span>
                  </label>
                );
              })}
            </div>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancel
          </Button>
          <Button onClick={onSubmit} disabled={!canSubmit} className="gap-1.5">
            <Plus className="h-4 w-4" />
            Add room
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default HotelConfigIndexPage;
