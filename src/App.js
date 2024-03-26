
import React, { useState, useEffect } from "react";
import { HashRouter as Router, Route, Routes } from "react-router-dom";
import "./App.css";
import Menu from "./components/Menu";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import TimeReports from "./pages/TimeReports";
import Overview from "./pages/Overview";
import Footer from "./components/Footer"


function App() {
  return (
    <Router>
      <div className="site-container">
        <header className="site-header">
          <Menu />
        </header>
        <main className="site-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/timereports" element={<TimeReports />} />
            <Route path="/overview" element={<Overview />} />
          </Routes>
        </main>
        <footer className="site-footer">
          <Footer />
        </footer>
      </div>
    </Router>
  );
}

export default App;
