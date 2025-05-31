import { useState } from "react";
function Contact() {
  const [contacts, setContacts] = useState([]);
  const [newContact, setNewContact] = useState("");

  const handleAddContact = () => {
    setContacts([...contacts, newContact]);
    setNewContact("");
  };

  return (
    <div>
      <h1>Contacts</h1>
      <input
        type="text"
        placeholder="Add Contact"
        value={newContact}
        onChange={(e) => setNewContact(e.target.value)}
      />
      <button onClick={handleAddContact}>Add</button>
      <ul>
        {contacts.map((contact, index) => (
          <li key={index}>{contact}</li>
        ))}
      </ul>
    </div>
  );
}
export default Contact;
