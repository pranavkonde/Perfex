import React, { useState } from 'react';
import './ContactUs.css';
import Navbar from './Navbar';

const ContactModal = () => {
 const [formState, setFormState] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
 });

 const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState(prevState => ({
      ...prevState,
      [name]: value,
    }));
 };

 const handleSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted");

    // Open the email client with pre-filled content
    const subject = encodeURIComponent("Form Submission");
    const body = encodeURIComponent(`Name: ${formState.name}\nPhone: ${formState.phone}\nMessage: ${formState.message}`);
    const mailtoLink = `mailto:${formState.email}?subject=${subject}&body=${body}`;

    // Open the email client
    window.location.href = mailtoLink;
 };

 return (
    <>
      <Navbar />
      <div className="contact-modal">
        <h2>Contact Us</h2>
        <form onSubmit={handleSubmit}>
          <input type="text" name="name" placeholder="Your Name" required onChange={handleChange} value={formState.name} />
          <input type="tel" name="phone" placeholder="Your phone" required onChange={handleChange} value={formState.phone} />
          <input type='text' name='email' placeholder='Your email' required onChange={handleChange} value={formState.email} />
          <textarea name="message" placeholder='Your Message' rows={5} required onChange={handleChange} value={formState.message}></textarea>
          <button type="submit">Submit</button>
        </form>
      </div>
    </>
 );
};

export default ContactModal;
