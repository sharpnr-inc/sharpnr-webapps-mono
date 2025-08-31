// SharpnrApp.tsx
import { Routes, Route } from "react-router-dom";
import { Suspense, lazy } from "react";

const OrgDashboardPage = lazy(() => import("./Dashboard/OrgDashboardPage"));

function SharpnrApp() {
  return (
    <Suspense fallback={<div>Loading App...</div>}>
      <Routes>
        <Route path="dashboard" element={<OrgDashboardPage />} />
      </Routes>
    </Suspense>
  );
}

export default SharpnrApp;
