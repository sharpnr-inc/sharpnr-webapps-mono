import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LoginPage from "./app/public/LoginPage";
import RegisterOrgPage from "./app/public/RegisterOrgPage";
import LandingPage from "./app/public/LandingPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/register-org" element={<RegisterOrgPage />} />
      </Routes>
    </Router>
  );
}

export default App;
