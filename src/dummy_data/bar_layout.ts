export interface Table {
  table_id: string;
  table_name: string;
  table_capacity_max: string;
  table_status: string;
}

export interface Area {
  Area_id: string;
  name: string;
  tables: Table[];
}

export interface Floors {
  floor_id: string;
  floor_name: string;
  Areas: Area[];
}

export interface BarLayout {
  floors: Floors[];
}

export const bar_layout: BarLayout = {
  floors: [
    {
      floor_id: "F1",
      floor_name: "Ground Floor",
      Areas: [
        {
          Area_id: "A1",
          name: "Indoor Lounge",
          tables: [
            { table_id: "T1", table_name: "Table 1", table_capacity_max: "4", table_status: "available" },
            { table_id: "T2", table_name: "Table 2", table_capacity_max: "6", table_status: "reserved" },
            { table_id: "T3", table_name: "Table 3", table_capacity_max: "2", table_status: "occupied" },
          ],
        },
        {
          Area_id: "A2",
          name: "Bar Counter",
          tables: [
            { table_id: "T4", table_name: "High Table 1", table_capacity_max: "3", table_status: "available" },
            { table_id: "T5", table_name: "High Table 2", table_capacity_max: "3", table_status: "reserved" },
          ],
        },
      ],
    },
    {
      floor_id: "F2",
      floor_name: "First Floor",
      Areas: [
        {
          Area_id: "A3",
          name: "Balcony Area",
          tables: [
            { table_id: "T6", table_name: "Balcony Table 1", table_capacity_max: "4", table_status: "available" },
            { table_id: "T7", table_name: "Balcony Table 2", table_capacity_max: "2", table_status: "occupied" },
          ],
        },
        {
          Area_id: "A4",
          name: "Private Booths",
          tables: [
            { table_id: "T8", table_name: "Booth 1", table_capacity_max: "6", table_status: "reserved" },
            { table_id: "T9", table_name: "Booth 2", table_capacity_max: "6", table_status: "available" },
          ],
        },
      ],
    },
    {
      floor_id: "F3",
      floor_name: "Rooftop",
      Areas: [
        {
          Area_id: "A5",
          name: "Open Air Deck",
          tables: [
            { table_id: "T10", table_name: "Deck Table 1", table_capacity_max: "4", table_status: "occupied" },
            { table_id: "T11", table_name: "Deck Table 2", table_capacity_max: "4", table_status: "available" },
            { table_id: "T12", table_name: "Deck Table 3", table_capacity_max: "2", table_status: "reserved" },
          ],
        },
      ],
    },
  ],
};
