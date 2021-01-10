import { useState, useEffect } from 'react';
import ContactForm from './components/ContactForm/ContactForm';
import ContactFilter from './components/Filter/Filter';
import ContactList from './components/ContactList/ContactList';
import { v4 } from 'uuid';

const initalContact = [
  { id: 'id-1', name: 'Rosie Simpson', number: '459-12-56' },
  { id: 'id-2', name: 'Hermione Kline', number: '443-89-12' },
  { id: 'id-3', name: 'Eden Clements', number: '645-17-79' },
  { id: 'id-4', name: 'Annie Copeland', number: '227-91-26' },
];

function App() {
  const [contacts, setContacts] = useState(initalContact);
  const [filter, setFilter] = useState('');

  const handleAddContact = (name, number) => {
    const sameName = contacts.some(
      contact => name.toLowerCase() === contact.name.toLowerCase(),
    );
    if (sameName) {
      alert(`${name} already in contacts`);
      return;
    }
    setContacts(prevContacts => [{ id: v4(), name, number }, ...prevContacts]);
    
  };

  const deleteContact = contactId => {
    setContacts(contacts.filter(contact => contact.id !== contactId));
  };

  const handleFilterChange = e => {
    setFilter(e.target.value);
  };

  useEffect(() => {
   const persistedContacts = localStorage.getItem('contacts');
   setContacts(JSON.parse(persistedContacts))
  }, []);

  useEffect(() => {
    
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const visibleContact = contacts.filter(contact =>
    contact.name.toLowerCase().includes(filter),
  );

  return (
    <>
      <h1>Phonebook</h1>
      <ContactForm onSubmit={handleAddContact} />
      <h2>Contacts</h2>
      <ContactFilter filter={filter} onFilterChange={handleFilterChange} />
      <ContactList contacts={visibleContact} onDeleteContact={deleteContact} />
    </>
  );
}

export default App;
