import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Suspense } from "react";
import MarketingApp from "./app/public/MarketingApp";
import SharpnrApp from "./app/sharpnrapp/SharpnrApp";

function App() {
  return (
    <Router>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<MarketingApp />} />
          <Route path="/sharpnrapp/*" element={<SharpnrApp />} />
        </Routes>
      </Suspense>
    </Router>
  );
}

export default App;
