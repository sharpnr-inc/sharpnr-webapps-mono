import { useEffect } from "react";
import { useLocation } from "react-router-dom";

/**
 * Custom React hook that tracks the user's last visited URL in the application.
 * This is useful for restoring the user's location after a page reload or hard reset.
 *
 * It automatically saves the current pathname and query parameters to `localStorage` under the key `lastVisited`.
 *
 * Usage:
 * ```ts
 * function App() {
 *   useLastVisited(); // call this at the top level of your app
 *   return <Routes>...</Routes>;
 * }
 * ```
 *
 * @function
 * @name useLastVisited
 * @kind function
 * @returns {void} Does not return anything
 */
export const useLastVisited = (): void => {
  const location = useLocation();

  // Save the current URL in localStorage whenever location changes
  useEffect(() => {
    localStorage.setItem("lastVisited", location.pathname + location.search);
  }, [location]);
};
