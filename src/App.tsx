import { BrowserRouter, Routes, Route } from "react-router-dom";
import AuthRoutes from "./app/auth/AuthRoutes";
import DashboardRoutes from "./app/dashboard/DashboardRoutes";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<AuthRoutes />} />
        <Route path="/dashboard/*" element={<DashboardRoutes />}></Route>

        {/* Catch-all (404) */}
        <Route path="*" element={<h1>404 - Page Not Found</h1>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
