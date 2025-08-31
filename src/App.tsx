import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { lazy, Suspense } from "react";
import LoginPage from "./app/public/LoginPage";
import RegisterOrgPage from "./app/public/RegisterOrgPage";
import LandingPage from "./app/public/LandingPage";

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register-org" element={<RegisterOrgPage />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
