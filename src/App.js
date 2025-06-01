import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import Contact from "./Components/Contact";
import Appointment from "./Components/Appointment";
import "./Styles/App.css";
import { useState } from "react";
import Dashboard from "./Components/Dashboard";
import Footer from "./Components/Footer";

function App() {
  const [started, setStarted] = useState(false);

  return (
    <BrowserRouter>
      <div className="app-container">
        <h1 className="header">ClickAppoint</h1>
        {started && (
          <nav className="navbar">
            <Link to="/contacts">Contacts</Link>
            <Link to="/appointments">Appointments</Link>
          </nav>
        )}
      </div>
      <Routes>
        {!started && (
          <Route
            path="*"
            element={
              <Dashboard
                onStart={() => {
                  setStarted(true);
                }}
              />
            }
          />
        )}
        {started && (
          <>
            <Route path="/contacts" element={<Contact />} />
            <Route path="/appointments" element={<Appointment />} />
            <Route path="'*" element={<Navigate to="/contact" />} />
          </>
        )}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
