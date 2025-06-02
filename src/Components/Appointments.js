import { useState } from "react";
import "../Styles/Appointments.css";

export default function Appointments({ appointments, setAppointments }) {
  // const { appointments, setAppointments } = props;
  const [searchAppointments, setSearchAppointments] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);
  const [editForm, setEditForm] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    time: "",
  });

  const filtered = appointments.filter(
    (appointment) =>
      appointment.name
        .toLowerCase()
        .includes(searchAppointments.toLowerCase()) ||
      appointment.phone.includes(searchAppointments)
  );
  const handleEdit = (index) => {
    setEditingIndex(index);
    setEditForm({ ...appointments[index] });
  };

  // update appointment
  const handleUpdate = (e) => {
    e.preventDefault();
    if (
      !editForm.name ||
      !editForm.phone ||
      !editForm.email ||
      !editForm.date ||
      !editForm.time
    ) {
      alert("Please fill in all fields");
      return;
    }
    const updatedAppointments = [...appointments];
    updatedAppointments[editingIndex] = editForm;
    setAppointments(updatedAppointments);
    setEditingIndex(null);
    setEditForm({
      name: "",
      phone: "",
      email: "",
      date: "",
      time: "",
    });
    alert("Appointment updated!");
  };

  // delete appointment
  const handleDelete = (idx) => {
    if (window.confirm("Delete this appointment?")) {
      setAppointments(appointments.filter((_, i) => i !== idx));
      if (editingIndex === idx) {
        setEditingIndex(null);
        setEditForm({ name: "", phone: "", email: "", date: "", time: "" });
      }
    }
  };

  return (
    <div className="appointments-container">
      <h1>All Appointments</h1>
      <input
        className="search-bar"
        type="text"
        placeholder="Search by name or phone"
        value={searchAppointments}
        onChange={(e) => setSearchAppointments(e.target.value)}
      />
      <ul className="appointment-list">
        {filtered.length === 0 && <li>No appointments found.</li>}
        {filtered.map((appointment, appointmentIndex) => (
          <li key={appointmentIndex} className="appointment-item">
            {editingIndex === appointmentIndex ? (
              <form className="edit-form" onSubmit={handleUpdate}>
                <input
                  type="text"
                  placeholder="Name"
                  value={editForm.name}
                  onChange={(e) =>
                    setEditForm({ ...editForm, name: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Phone"
                  value={editForm.phone}
                  onChange={(e) =>
                    setEditForm({ ...editForm, phone: e.target.value })
                  }
                />
                <input
                  type="email"
                  placeholder="Email"
                  value={editForm.email}
                  onChange={(e) =>
                    setEditForm({ ...editForm, email: e.target.value })
                  }
                />
                <input
                  type="date"
                  value={editForm.date}
                  onChange={(e) =>
                    setEditForm({ ...editForm, date: e.target.value })
                  }
                />
                <input
                  type="time"
                  value={editForm.time}
                  onChange={(e) =>
                    setEditForm({ ...editForm, time: e.target.value })
                  }
                />
                <button type="submit">Update</button>
                <button
                  type="button"
                  className="cancel-btn"
                  onClick={() => setEditingIndex(null)}
                >
                  Cancel
                </button>
              </form>
            ) : (
              <div>
                <strong>{appointment.name}</strong> <br />
                {appointment.phone} <br />
                {appointment.email} <br />
                {appointment.date} at {appointment.time} <br />
                <div className="action-bts">
                  <button
                    className="edit-btn"
                    onClick={() => handleEdit(appointmentIndex)}
                  >
                    Edit
                  </button>
                  <button
                    className="delete-btn"
                    onClick={() => handleDelete(appointmentIndex)}
                  >
                    Delete
                  </button>
                </div>
              </div>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
}
