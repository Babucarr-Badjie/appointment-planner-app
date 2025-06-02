import { useEffect, useState } from "react";
import "../Styles/Appointments.css";

export default function Appointments({ contacts }) {
  const [appointments, setAppointments] = useState([]);
  const [newAppointment, setNewAppointment] = useState({
    title: "",
    date: "",
    time: "",
    contact: "",
  });
  const [editingIndex, setEditingIndex] = useState(null);
  const [searchAppointments, setSearchAppointments] = useState("");

  // Load appointments from localStorage on mount
  useEffect(() => {
    const stored = localStorage.getItem("appointments");
    if (stored) setAppointments(JSON.parse(stored));
  }, []);

  // Save appointments to localStorage on change
  useEffect(() => {
    localStorage.setItem("appointments", JSON.stringify(appointments));
  }, [appointments]);

  // Validation helper
  const isDuplicate = (appt) =>
    appointments.some(
      (appointment, appointmentIndex) =>
        appointmentIndex !== editingIndex &&
        appointment.title === appt.title &&
        appointment.date === appt.date &&
        appointment.time === appt.time &&
        appointment.contact === appt.contact
    );

  // Add or update appointment
  const handleSubmit = (e) => {
    e.preventDefault();
    const { title, date, time, contact } = newAppointment;
    if (!title || !date || !time || !contact) {
      alert("Please fill in all fields.");
      return;
    }
    if (isDuplicate(newAppointment)) {
      alert("This appointment already exists.");
      return;
    }
    if (editingIndex !== null) {
      // Edit mode
      const updated = [...appointments];
      updated[editingIndex] = newAppointment;
      setAppointments(updated);
      setEditingIndex(null);
    } else {
      // Add mode
      setAppointments([...appointments, newAppointment]);
    }
    setNewAppointment({ title: "", date: "", time: "", contact: "" });
  };

  // Edit appointment
  const handleEdit = (index) => {
    setNewAppointment(appointments[index]);
    setEditingIndex(index);
  };

  // Delete appointment
  const handleDelete = (index) => {
    if (window.confirm("Delete this appointment?")) {
      setAppointments(appointments.filter((_, i) => i !== index));
      if (editingIndex === index) {
        setNewAppointment({ title: "", date: "", time: "", contact: "" });
        setEditingIndex(null);
      }
    }
  };

  // Filtered appointments
  const filteredAppointments = appointments.filter(
    (appointment) =>
      appointment.title
        .toLowerCase()
        .includes(searchAppointments.toLowerCase()) ||
      appointment.contact
        .toLowerCase()
        .includes(searchAppointments.toLowerCase())
  );

  return (
    <div className="appointment-container">
      <h1>Appointments</h1>
      <form className="appointment-form" onSubmit={handleSubmit}>
        <input
          type="date"
          value={newAppointment.date}
          onChange={(e) =>
            setNewAppointment({ ...newAppointment, date: e.target.value })
          }
        />
        <input
          type="time"
          value={newAppointment.time}
          onChange={(e) =>
            setNewAppointment({ ...newAppointment, time: e.target.value })
          }
        />
        <select
          value={newAppointment.contact}
          onChange={(e) =>
            setNewAppointment({ ...newAppointment, contact: e.target.value })
          }
        >
          <option value="">Select Contact</option>
          {contacts.map((contact, contactIndex) => (
            <option key={contactIndex} value={contact.name}>
              {contact.name}
            </option>
          ))}
        </select>
        <button type="submit">
          {editingIndex !== null ? "Update" : "Add"}
        </button>
        {editingIndex !== null && (
          <button
            type="button"
            className="cancel-btn"
            onClick={() => {
              setNewAppointment({ title: "", date: "", time: "", contact: "" });
              setEditingIndex(null);
            }}
          >
            Cancel
          </button>
        )}
      </form>

      <input
        className="search-bar"
        type="text"
        placeholder="Search by title or contact"
        value={searchAppointments}
        onChange={(e) => setSearchAppointments(e.target.value)}
      />

      <ul className="appointment-list">
        {filteredAppointments.length === 0 && <li>No appointments found.</li>}
        {filteredAppointments.map((appt, idx) => (
          <li key={idx} className="appointment-item">
            <div>
              <strong>{appt.title}</strong> <br />
              {appt.date} {appt.time} <br />
              <span>Contact: {appt.contact}</span>
            </div>
            <div className="actions">
              <button onClick={() => handleEdit(idx)}>Edit</button>
              <button onClick={() => handleDelete(idx)}>Delete</button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
