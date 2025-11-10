/**
 * @description
 * Request schema for creating a floor in a hotel.
 *
 * @interface Hospitality_CreateFloorInHotel_ReqSchema
 * @example
 * {
 *   "floor_name": "Ground Floor",
 *   "hotel_id": "b0c89c1f-1234-4a3a-9321-d1d5bbf01a93"
 * }
 */
export interface Hospitality_CreateFloorInHotel_ReqSchema {
  /**
   * Name of the floor (e.g., "Ground Floor", "1st Floor").
   */
  floor_name: string;

  /**
   * UUID or unique identifier of the hotel to which this floor belongs.
   */
  hotel_id: string;
}

/**
 * @description
 * Response structure returned after successfully creating a floor in a hotel.
 *
 * @interface Hospitality_CreateFloorInHotel_Response
 * @example
 * {
 *   "floor_id": "a24f3c5e-12d4-4f8e-8e5b-32b917da2f1a",
 *   "floor_name": "Ground Floor",
 *   "floor_level": 0
 * }
 */
export interface Hospitality_CreateFloorInHotel_Response {
  /**
   * Unique identifier for the created floor.
   */
  floor_id: string;

  /**
   * Human-readable name of the floor (e.g., "Ground Floor", "1st Floor").
   */
  floor_name: string;

  /**
   * Numerical level of the floor, usually starting at 0 or 1.
   * Example: 0 for Ground, 1 for First Floor.
   */
  floor_level: number;
}

