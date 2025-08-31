// MarketingApp.tsx
import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

// Lazy imports (code splitting)
const LandingPage = lazy(() => import("./LandingPage"));
const LoginPage = lazy(() => import("./LoginPage"));
const RegisterOrgPage = lazy(() => import("./RegisterOrgPage"));

function MarketingApp() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register-org" element={<RegisterOrgPage />} />
      </Routes>
    </Suspense>
  );
}

export default MarketingApp;
