import { Component } from "react";
import { nanoid } from "nanoid";
import { toast } from "react-toastify";
import PropTypes from "prop-types";

class ContactForm extends Component {
  static propTypes = {
    onFormSubmit: PropTypes.func.isRequired,
    names: PropTypes.arrayOf(PropTypes.string).isRequired,
  };
  state = {
    name: "",
    number: "",
  };
  handleInputChange = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    this.setState({ [name]: value });
  };
  handleSubmit = (e) => {
    e.preventDefault();
    const { names, onFormSubmit } = this.props;
    const id = nanoid();
    const name = e.target.name.value;
    const number = e.target.number.value;
    if (names.includes(name)) {
      toast.error(`${name} is already in contacts!`);
      return;
    }
    onFormSubmit({ id, name, number });
    toast.success(`${name} was added to contacts`);
    this.reset();
  };
  reset = () =>
    this.setState(() => ({
      name: "",
      number: "",
    }));

  render() {
    const { name, number } = this.state;
    return (
      <form onSubmit={this.handleSubmit}>
        <label>
          Name
          <input
            type="text"
            name="name"
            pattern="^[a-zA-Zа-яА-Я]+(([' -][a-zA-Zа-яА-Я ])?[a-zA-Zа-яА-Я]*)*$"
            title="Name may contain only letters, apostrophe, dash and spaces. For example Adrian, Jacob Mercer, Charles de Batz de Castelmore d'Artagnan"
            required
            value={name}
            onInput={this.handleInputChange}
          />
        </label>
        <label>
          Number
          <input
            type="tel"
            name="number"
            pattern="\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}"
            title="Phone number must be digits and can contain spaces, dashes, parentheses and can start with +"
            required
            value={number}
            onInput={this.handleInputChange}
          />
        </label>
        <button type="submit">Add contact</button>
      </form>
    );
  }
}
export default ContactForm;
