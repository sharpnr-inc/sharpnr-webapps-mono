// src/components/calendar/types.ts

export interface CalendarEvent {
  id: string | number;
  title: string;
  start: Date;
  end: Date;
  color?: string; // e.g., 'bg-blue-500', 'bg-green-500'
}

// This is the data type for each row in our table
export interface TimeSlot {
  time: Date;
}