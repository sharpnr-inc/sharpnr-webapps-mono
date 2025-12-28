import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import LandingPage from "./app/pages/LandingPage";

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<LandingPage/>} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
