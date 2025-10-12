// src/components/calendar/Calendar.tsx

import React, { useState, useMemo, useEffect } from 'react';
import {
  useReactTable,
  getCoreRowModel,
  type ColumnDef,
  flexRender,
} from '@tanstack/react-table';
import {
  startOfWeek,
  addDays,
  format,
  eachMinuteOfInterval,
  isWithinInterval,
  isSameDay,
  differenceInMinutes,
  addHours,
  isToday, // ✨ NEW: To check for the current day
} from 'date-fns';
import type { TimeSlot, CalendarEvent } from './types';

// MOCK DATA (no changes here)
const getMockEvents = (currentDate: Date): CalendarEvent[] => {
  const weekStart = startOfWeek(currentDate);
  return [
    { id: 1, title: 'Team Sync', start: addDays(weekStart, 1), end: addHours(addDays(weekStart, 1), 1), color: 'bg-green-500' },
    { id: 2, title: 'Project Kickoff', start: new Date(new Date(addDays(weekStart, 2)).setHours(10, 0, 0)), end: new Date(new Date(addDays(weekStart, 2)).setHours(11, 30, 0)), color: 'bg-purple-500' },
    { id: 3, title: 'Design Review', start: new Date(new Date(addDays(weekStart, 4)).setHours(14, 0, 0)), end: new Date(new Date(addDays(weekStart, 4)).setHours(16, 0, 0)), color: 'bg-blue-500' },
  ];
};

// ✨ NEW: "Now" Indicator Component
const NowIndicator = () => {
  const [topPosition, setTopPosition] = useState(0);

  useEffect(() => {
    const updatePosition = () => {
      const now = new Date();
      // Each hour is 64px (h-16). 1 minute = 64/60 px.
      const newPosition = now.getHours() * 64 + (now.getMinutes() * 64 / 60);
      setTopPosition(newPosition);
    };

    updatePosition(); // Initial position
    const interval = setInterval(updatePosition, 60000); // Update every minute

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="absolute left-0 right-0 z-20" style={{ top: `${topPosition}px` }}>
      <div className="relative h-0">
        <div className="absolute left-[60px] right-0 h-px bg-red-500"></div>
        <div className="absolute left-[52px] w-3 h-3 -mt-[5px] bg-red-500 rounded-full"></div>
      </div>
    </div>
  );
};


const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events] = useState<CalendarEvent[]>(() => getMockEvents(currentDate));

  // --- 1. DATA (ROWS) ---
  const timeSlots = useMemo(() => {
    const startOfDay = new Date(currentDate).setHours(0, 0, 0, 0);
    const endOfDay = new Date(currentDate).setHours(23, 59, 59, 999);
    return eachMinuteOfInterval(
      { start: startOfDay, end: endOfDay },
      { step: 30 }
    ).map(date => ({ time: date }));
  }, [currentDate]);

  // --- 2. COLUMNS (DAYS) ---
  const columns = useMemo<ColumnDef<TimeSlot>[]>(() => {
    const weekStart = startOfWeek(currentDate);
    const days = Array.from({ length: 7 }, (_, i) => addDays(weekStart, i));

    return [
      {
        id: 'time',
        header: () => <div className="w-[60px]"></div>,
        accessorKey: 'time',
        cell: ({ row }) => {
          const time = row.original.time;
          // ✨ CHANGED: Only show time for full hours
          if (time.getMinutes() === 0) {
            return (
              <div className="relative h-full">
                <span className="absolute -top-2 right-2 text-xs text-gray-500">
                  {format(time, 'h a')}
                </span>
              </div>
            );
          }
          return null;
        },
        size: 60,
      },
      ...days.map(day => ({
        id: format(day, 'yyyy-MM-dd'),
        header: () => {
          const isCurrentDay = isToday(day);
          return (
            <div className="flex flex-col items-center py-2">
              <span className="text-xs text-gray-500 uppercase">{format(day, 'eee')}</span>
              <span
                className={`text-2xl mt-1 font-medium flex items-center justify-center w-8 h-8 rounded-full 
                  ${isCurrentDay ? 'bg-blue-600 text-white' : 'text-gray-800'}` // ✨ Highlight current day
                }
              >
                {format(day, 'd')}
              </span>
            </div>
          );
        },
        cell: ({ row }:any) => {
          const slotTime = row.original.time;
          const slotInterval = { start: slotTime, end: new Date(slotTime.getTime() + 30 * 60 * 1000 - 1) };
          const dayEvents = events.filter(event => isSameDay(event.start, day));
          
          return (
            <div className="h-full w-full">
              {dayEvents.map(event => {
                const isEventStartInSlot = isWithinInterval(event.start, slotInterval);
                if (!isEventStartInSlot) return null;

                const durationMinutes = differenceInMinutes(event.end, event.start);
                const height = durationMinutes * (64 / 30);
                const topPosition = (event.start.getMinutes() / 30) * 100; // Position within the 30min slot

                return (
                  <div
                    key={event.id}
                    // ✨ CHANGED: Polished event styling
                    className={`absolute left-[2%] w-[96%] z-10 rounded-lg p-2 text-white overflow-hidden box-border cursor-pointer shadow-md border border-white/20 transition hover:brightness-110 ${event.color || 'bg-blue-500'}`}
                    style={{ top: `${topPosition}%`, height: `${height}px` }}
                  >
                    <div className="font-semibold text-sm truncate">{event.title}</div>
                    <div className="text-xs">
                      {format(event.start, 'h:mm')} - {format(event.end, 'h:mm a')}
                    </div>
                  </div>
                );
              })}
            </div>
          );
        },
      })),
    ];
  }, [currentDate, events]);

  const table = useReactTable({
    data: timeSlots,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // --- 4. RENDER ---
  return (
    <div className="font-sans w-full overflow-x-auto bg-white rounded-lg shadow-lg">
      <div className="max-h-[85vh] overflow-y-auto">
        <table className="w-full border-collapse table-fixed">
          <thead className="sticky top-0 bg-white z-30 shadow-sm">
            {table.getHeaderGroups().map(headerGroup => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map(header => (
                  <th key={header.id}
                    // ✨ CHANGED: Use a right border for separation
                    className="border-b border-r border-gray-200"
                    style={{ width: header.getSize() }}
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody className="relative"> {/* ✨ CHANGED: Relative for "Now" indicator */}
            {table.getRowModel().rows.map(row => (
              <tr key={row.id}>
                {row.getVisibleCells().map(cell => {
                  const isTimeCell = cell.column.id === 'time';
                  const isFullHour = row.original.time.getMinutes() === 0;

                  return (
                    <td
                      key={cell.id}
                      // ✨ CHANGED: Dynamic borders for cleaner grid
                      className={`h-16 p-0 align-top border-r border-gray-200 
                        ${isFullHour ? 'border-t border-gray-200' : 'border-t border-dashed border-gray-100'}
                        ${isTimeCell ? 'border-r-gray-300' : ''}`
                      }
                    >
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </td>
                  );
                })}
              </tr>
            ))}
            {/* ✨ NEW: Render the Now Indicator over the body */}
            <NowIndicator />
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Calendar;