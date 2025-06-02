import { useState } from "react";
import "../Styles/Contact.css";
export default function Contacts({ setAppointments }) {
  const [form, setForm] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    time: "",
  });

  // const { setAppointments } = props;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.name || !form.phone || !form.email || !form.date || !form.time) {
      alert("Please fill in all fields");
      return;
    }
    setAppointments((prev) => [...prev, form]);
    setForm({ name: "", phone: "", email: "", date: "", time: "" });
    alert("Appointment booked!");
  };

  return (
    <div className="contact-container">
      <h1>Book an Appointment</h1>
      <form className="contact-form" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Name"
          value={form.name}
          onChange={(e) => setForm({ ...form, name: e.target.value })}
        />
        <input
          type="text"
          placeholder="Phone"
          value={form.phone}
          onChange={(e) => setForm({ ...form, phone: e.target.value })}
        />
        <input
          type="email"
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="date"
          value={form.date}
          onChange={(e) => setForm({ ...form, date: e.target.value })}
        />
        <input
          type="time"
          value={form.time}
          onChange={(e) => setForm({ ...form, time: e.target.value })}
        />
        <button type="submit">Book Appointment</button>
      </form>
    </div>
  );
}
