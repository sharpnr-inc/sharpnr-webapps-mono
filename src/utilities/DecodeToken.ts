import Cookies from "js-cookie";
import {jwtDecode} from "jwt-decode";

/**
 * Decode a JWT token stored in cookies.
 * @param cookieName - The name of the cookie containing the JWT.
 * @returns The decoded JWT payload or null if not found/invalid/expired.
 */
export function decodeJwtFromCookies<T = any>(cookieName: string): T | null {
  try {
    const token = Cookies.get(cookieName);
    if (!token) return null;

    const decoded = jwtDecode<T>(token);

    // Optional: auto-return null if token is expired
    const payload = decoded as any;
    if (payload?.exp && Date.now() >= payload.exp * 1000) {
      console.warn("JWT token has expired");
      return null;
    }

    return decoded;
  } catch (error) {
    console.error("Failed to decode JWT:", error);
    return null;
  }
}


export function getValidToken(cookieName:any) {
  const token = Cookies.get(cookieName);

  if (!token) return null;

  try {
    const decoded = jwtDecode(token);

    if (decoded.exp && Date.now() >= decoded.exp * 1000) {
      // Token expired, remove cookie
      Cookies.remove(cookieName);
      console.warn("JWT token has expired and has been removed.");
      return null;
    }

    return token; // Token is valid
  } catch (error) {
    console.error("Failed to decode JWT:", error);
    Cookies.remove(cookieName);
    return null;
  }
}