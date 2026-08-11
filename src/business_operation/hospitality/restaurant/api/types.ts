export interface RestaurantDetailsResponseDto {
  restaurant_id: string;
  resturant_legal_entity_id: string | null;
  name: string;
  opening_time: string;
  closing_time: string;
  is_pure_veg: boolean;
  is_active: boolean;
  is_configured: boolean;
  current_configured_status: string; // Replace with an enum or literal union type if defined in frontend
  last_updated: string; // Date represented as an ISO 8601 string
}
