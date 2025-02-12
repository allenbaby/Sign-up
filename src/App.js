import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AuthPage from "./AuthPage.js";
import HomePage from "./HomePage"; 

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/home" element={<HomePage name="John" />} />
      </Routes>
    </Router>
  );
}

export default App;
