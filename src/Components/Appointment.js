import { useState } from "react";
function Appointment() {
  const [appointments, setAppointments] = useState([]);
  const [newAppointment, setNewAppointment] = useState("");

  const handleAddAppointment = () => {
    setAppointments([...appointments, newAppointment]);
    setNewAppointment("");
  };
  return (
    <div>
      <h1>Appointments</h1>
      <input
        type="text"
        placeholder="Add Appointment"
        value={newAppointment}
        onChange={(e) => setNewAppointment(e.target.value)}
      />
      <button onClick={handleAddAppointment}>Add</button>
      <ul>
        {appointments.map((appointment, index) => (
          <li key={index}>{appointment}</li>
        ))}
      </ul>
    </div>
  );
}
export default Appointment;
