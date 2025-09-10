import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Door from "./Door";
import Character from "./Character";
import Home from "./home";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Door />} />
        <Route path="/character" element={<Character />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
};

export default App;
