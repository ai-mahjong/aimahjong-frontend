import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./component/LoginPage.jsx";
import Register from "./component/Register.jsx";
import GameIndex from './component/GameIndex';
import GameStart from './component/gamestart.jsx';
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/gameIndex" element={<GameIndex />} />
        <Route path="/gamestart/:gameId" element={<GameStart />} />
      </Routes>
    </Router>
  </React.StrictMode>
);
