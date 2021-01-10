import {  useState } from 'react';
import PropTypes from 'prop-types';
import styles from './ContactForm.module.css';

const ContactForm = ({ onSubmit }) => {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  const handleSubmit = evt => {
    evt.preventDefault();
    // Проп который передается форме для вызова при сабмите
    onSubmit(name, number);
  };

  const handleChange = event => {
    const { name, value } = event.target;

    switch (name) {
      case 'name':
        setName(value);
        break;

      case 'number':
        setNumber(value);
        break;

      default:
        return;
    }
  };

  return (
    <form className={styles.formSubmit} onSubmit={handleSubmit}>
      <label>
        Name
        <input
          className={styles.formSubmitInput_name}
          type="text"
          name="name"
          value={name}
          onChange={handleChange}
        />
      </label>
      <label>
        Number
        <input
          className={styles.formSubmitInput_number}
          type="number"
          name="number"
          value={number}
          onChange={handleChange}
        />
      </label>
      <button className={styles.formSubmitButton} type="submit">
        Add contact
      </button>
    </form>
  );
}
ContactForm.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
export default ContactForm;
