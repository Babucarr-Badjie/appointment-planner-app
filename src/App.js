import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Contact from "./Components/Contact";
import Appointment from "./Components/Appointment";

function App() {
  return (
    <BrowserRouter>
      <h1>Appointment Planner</h1>
      <nav>
        <Link to="/contacts">Contacts</Link>
        <Link to="/appointments">Appointments</Link>
      </nav>
      <Routes>
        <Route path="/contacts" element={<Contact />} />
        <Route path="/appointments" element={<Appointment />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
