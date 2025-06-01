import { useState } from "react";
import "../Styles/Contact.css";
function Contact() {
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState({
    name: "",
    phone: "",
    email: "",
    date: "",
    time: "",
  });

  const handleAddContact = () => {
    if (
      !newContact.name ||
      !newContact.phone ||
      !newContact.email ||
      !newContact.date ||
      !newContact.time
    ) {
      alert("Please fill in all fields");
      return;
    }
    setContacts([...contacts, newContact]);
    setNewContact({ name: "", phone: "", email: "", date: "", time: "" });
  };

  return (
    <div className="contact-container">
      <h1>Contacts</h1>
      <input
        type="text"
        placeholder="Name"
        value={newContact.name}
        onChange={(e) => setNewContact({ ...newContact, name: e.target.value })}
      />
      <input
        type="text"
        placeholder="Phone"
        value={newContact.phone}
        onChange={(e) =>
          setNewContact({ ...newContact, phone: e.target.value })
        }
      />
      <input
        type="email"
        placeholder="Email"
        value={newContact.email}
        onChange={(e) =>
          setNewContact({ ...newContact, email: e.target.value })
        }
      />
      <input
        type="date"
        placeholder="Date"
        value={newContact.date}
        onChange={(e) => setNewContact({ ...newContact, date: e.target.value })}
      />
      <input
        type="time"
        placeholder="Time"
        value={newContact.time}
        onChange={(e) => setNewContact({ ...newContact, time: e.target.value })}
      />
      <button onClick={handleAddContact}>Add</button>
      <ul>
        {contacts.map((contact, index) => (
          <li key={index}>
            {" "}
            {contact.name} - {contact.phone} - {contact.email}
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Contact;
