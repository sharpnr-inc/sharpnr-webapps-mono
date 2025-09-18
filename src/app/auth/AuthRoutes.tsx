
import React, { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const LoginPage = lazy(() => import("./LoginPage"));
const RegisterPage = lazy(() => import("./RegisterOrg"));

/**
 * Authentication Routes
 *
 * Defines the routing structure for authentication-related pages.
 * Each route maps a specific URL path to its corresponding authentication component.
 *
 * @function
 * @name AuthRoutes
 * @kind function
 * @returns {React.JSX.Element} The set of authentication routes wrapped in a `Suspense` boundary.
 *
 * @example
 * // Usage inside App.tsx
 * import AuthRoutes from "@/routes/AuthRoutes";
 *
 * function App() {
 *   return (
 *     <BrowserRouter>
 *       <AuthRoutes />
 *     </BrowserRouter>
 *   );
 * }
 *
 * @exports
 * @author Kashif Nawaz
 */
export default function AuthRoutes(): React.JSX.Element {
  return (
    <Suspense>
      <Routes>
        <Route index element={<LoginPage />} />
        <Route path="/signup" element={<RegisterPage />}></Route>
        <Route path="/reset-password" element={<LoginPage />}></Route>
        <Route path="/register" element={<RegisterPage />}></Route>
      </Routes>
    </Suspense>
  );
}
