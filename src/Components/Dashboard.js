import "../Styles/Dashboard.css";

export default function Dashboard({ onStart }) {
  return (
    <div className="dashboard">
      <h2>Welcome to ClickAppoint</h2>
      <p>
        Easily manage your contacts and schedule appointments in just a few
        clicks. Click the button below to get started and streamline your
        appointment planning process!
      </p>
      <button className="start-btn" onClick={onStart}>
        Make an Appointment
      </button>
    </div>
  );
}
