export interface Tables {
  table_id: string;
  table_name: string;
  table_status: string;
  table_capacity: number;
}

export interface Areas {
  area_id: string;
  area_name: string;
  tables: Tables[];
}

export interface Floor {
  floor_id: string;
  floor_name: string;
  areas: Areas[];
}

export const restaurant_layout: Floor[] = [
  {
    floor_id: "F1",
    floor_name: "Ground Floor",
    areas: [
      {
        area_id: "A1",
        area_name: "Main Hall",
        tables: [
          { table_id: "T1", table_name: "Table 1", table_status: "Available", table_capacity: 4 },
          { table_id: "T2", table_name: "Table 2", table_status: "Reserved", table_capacity: 6 },
          { table_id: "T3", table_name: "Table 3", table_status: "Occupied", table_capacity: 2 },
          { table_id: "T4", table_name: "Table 4", table_status: "Cleaning", table_capacity: 4 },
          { table_id: "T5", table_name: "Table 5", table_status: "Available", table_capacity: 8 },
        ],
      },
      {
        area_id: "A2",
        area_name: "Family Zone",
        tables: [
          { table_id: "T6", table_name: "Table 6", table_status: "Available", table_capacity: 6 },
          { table_id: "T7", table_name: "Table 7", table_status: "Reserved", table_capacity: 4 },
          { table_id: "T8", table_name: "Table 8", table_status: "Occupied", table_capacity: 6 },
          { table_id: "T9", table_name: "Table 9", table_status: "Available", table_capacity: 4 },
          { table_id: "T10", table_name: "Table 10", table_status: "Cleaning", table_capacity: 8 },
        ],
      },
      {
        area_id: "A3",
        area_name: "Outdoor Garden",
        tables: [
          { table_id: "T11", table_name: "Table 11", table_status: "Available", table_capacity: 2 },
          { table_id: "T12", table_name: "Table 12", table_status: "Reserved", table_capacity: 4 },
          { table_id: "T13", table_name: "Table 13", table_status: "Available", table_capacity: 6 },
          { table_id: "T14", table_name: "Table 14", table_status: "Occupied", table_capacity: 2 },
          { table_id: "T15", table_name: "Table 15", table_status: "Cleaning", table_capacity: 4 },
        ],
      },
    ],
  },
  {
    floor_id: "F2",
    floor_name: "First Floor",
    areas: [
      {
        area_id: "A4",
        area_name: "Balcony View",
        tables: [
          { table_id: "T16", table_name: "Table 16", table_status: "Available", table_capacity: 4 },
          { table_id: "T17", table_name: "Table 17", table_status: "Reserved", table_capacity: 2 },
          { table_id: "T18", table_name: "Table 18", table_status: "Occupied", table_capacity: 6 },
          { table_id: "T19", table_name: "Table 19", table_status: "Cleaning", table_capacity: 4 },
          { table_id: "T20", table_name: "Table 20", table_status: "Available", table_capacity: 8 },
        ],
      },
      {
        area_id: "A5",
        area_name: "Private Dining",
        tables: [
          { table_id: "T21", table_name: "Table 21", table_status: "Available", table_capacity: 10 },
          { table_id: "T22", table_name: "Table 22", table_status: "Reserved", table_capacity: 8 },
          { table_id: "T23", table_name: "Table 23", table_status: "Available", table_capacity: 12 },
          { table_id: "T24", table_name: "Table 24", table_status: "Occupied", table_capacity: 6 },
          { table_id: "T25", table_name: "Table 25", table_status: "Cleaning", table_capacity: 10 },
        ],
      },
    ],
  },
  {
    floor_id: "F3",
    floor_name: "Rooftop Lounge",
    areas: [
      {
        area_id: "A6",
        area_name: "Bar Section",
        tables: [
          { table_id: "T26", table_name: "Table 26", table_status: "Available", table_capacity: 2 },
          { table_id: "T27", table_name: "Table 27", table_status: "Occupied", table_capacity: 4 },
          { table_id: "T28", table_name: "Table 28", table_status: "Available", table_capacity: 6 },
          { table_id: "T29", table_name: "Table 29", table_status: "Reserved", table_capacity: 2 },
          { table_id: "T30", table_name: "Table 30", table_status: "Cleaning", table_capacity: 4 },
        ],
      },
      {
        area_id: "A7",
        area_name: "VIP Terrace",
        tables: [
          { table_id: "T31", table_name: "Table 31", table_status: "Available", table_capacity: 10 },
          { table_id: "T32", table_name: "Table 32", table_status: "Reserved", table_capacity: 8 },
          { table_id: "T33", table_name: "Table 33", table_status: "Occupied", table_capacity: 12 },
          { table_id: "T34", table_name: "Table 34", table_status: "Cleaning", table_capacity: 10 },
          { table_id: "T35", table_name: "Table 35", table_status: "Available", table_capacity: 8 },
        ],
      },
      {
        area_id: "A8",
        area_name: "Open Sky Deck",
        tables: [
          { table_id: "T36", table_name: "Table 36", table_status: "Available", table_capacity: 2 },
          { table_id: "T37", table_name: "Table 37", table_status: "Reserved", table_capacity: 4 },
          { table_id: "T38", table_name: "Table 38", table_status: "Available", table_capacity: 6 },
          { table_id: "T39", table_name: "Table 39", table_status: "Occupied", table_capacity: 4 },
          { table_id: "T40", table_name: "Table 40", table_status: "Cleaning", table_capacity: 8 },
        ],
      },
    ],
  },
];
