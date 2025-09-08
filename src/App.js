import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Door from "./Door";
import CharacterPage from "./CharacterPage";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Door />} />
        <Route path="/character" element={<CharacterPage />} />
      </Routes>
    </Router>
  );
}

export default App;
