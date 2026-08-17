/**
 * Returns a human-readable floor name
 * 0  -> Ground Floor
 * 1  -> First Floor
 * 2  -> Second Floor
 * 21 -> 21st Floor
 */
export function getFloorName(floorIndex: number): string {
  if (!Number.isInteger(floorIndex) || floorIndex < 0) {
    throw new Error("floorIndex must be a non-negative integer");
  }

  if (floorIndex === 0) return "Ground Floor";

  const words = [
    "First",
    "Second",
    "Third",
    "Fourth",
    "Fifth",
    "Sixth",
    "Seventh",
    "Eighth",
    "Ninth",
    "Tenth",
    "Eleventh",
    "Twelfth",
    "Thirteenth",
    "Fourteenth",
    "Fifteenth",
    "Sixteenth",
    "Seventeenth",
    "Eighteenth",
    "Nineteenth",
    "Twentieth",
  ];

  if (floorIndex <= words.length) {
    return `${words[floorIndex - 1]} Floor`;
  }

  return `${floorIndex}${getOrdinalSuffix(floorIndex)} Floor`;
}

/**
 * Returns numeric ordinal style
 * 0 -> Ground Floor
 * 1 -> 1st Floor
 * 2 -> 2nd Floor
 * 11 -> 11th Floor
 */
export function getFloorNameShort(floorIndex: number): string {
  if (!Number.isInteger(floorIndex) || floorIndex < 0) {
    throw new Error("floorIndex must be a non-negative integer");
  }

  if (floorIndex === 0) return "Ground Floor";

  return `${floorIndex}${getOrdinalSuffix(floorIndex)} Floor`;
}

/**
 * Ordinal suffix helper
 */
function getOrdinalSuffix(n: number): string {
  if (n % 100 >= 11 && n % 100 <= 13) return "th";

  switch (n % 10) {
    case 1:
      return "st";
    case 2:
      return "nd";
    case 3:
      return "rd";
    default:
      return "th";
  }
}
