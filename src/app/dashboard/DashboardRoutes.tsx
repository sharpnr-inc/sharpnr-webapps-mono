import SuspenseFallback from "@/components/ui/SuspenseFallback";
import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";

const DashboardPage = lazy(() => import("./DashboardPage"));

export default function DashboardRoutes(): React.JSX.Element {
  return (
    <Suspense fallback={<SuspenseFallback/>}>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
      </Routes>
    </Suspense>
  );
}
