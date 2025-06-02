import { BrowserRouter, Routes, Route, Link, Navigate } from "react-router-dom";
import Contacts from "./Components/Contacts";
import Appointments from "./Components/Appointments";
import { useEffect, useState } from "react";
import Dashboard from "./Components/Dashboard";
import Footer from "./Components/Footer";
import "./Styles/App.css";

function App() {
  const [started, setStarted] = useState(false);
  const [appointments, setAppointments] = useState([]);
  const [contacts, setContacts] = useState([]);

  // Load appointments from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("appointments");
    if (stored) setAppointments(JSON.parse(stored));
  }, []);

  // Save appointments to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("appointments", JSON.stringify(appointments));
    console.log("Appointments state:", appointments);
  }, [appointments]);

  // Load contacts from localStorage on mount
  useEffect(() => {
    const storedContacts = localStorage.getItem("contacts");
    if (storedContacts) setContacts(JSON.parse(storedContacts));
  }, []);

  // Save contacts to localStorage whenever they change
  useEffect(() => {
    localStorage.setItem("contacts", JSON.stringify(contacts));
  }, [contacts]);

  return (
    <BrowserRouter>
      <div className="app-container">
        <Link to="/">
          {" "}
          <h1 className="header">ClickAppoint</h1>
        </Link>
        {started && (
          <nav className="navbar">
            <Link to="/contacts">Book Appointment</Link>
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
            <Route
              path="/contacts"
              element={
                <Contacts
                  appointments={appointments}
                  setAppointments={setAppointments}
                />
              }
            />
            <Route
              path="/appointments"
              element={
                <Appointments
                  appointments={appointments}
                  setAppointments={setAppointments}
                />
              }
            />
            <Route path="*" element={<Navigate to="/contacts" replace />} />
          </>
        )}
      </Routes>
      <Footer />
    </BrowserRouter>
  );
}

export default App;
