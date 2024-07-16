import React, { useState } from "react";
import "./Form.css";
import Button from "../Button/Button";

const MyForm = () => {
  const [formData, setFormData] = useState({
    text: "",
    email: "",
    textarea: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch(
        "https://your-wordpress-site.com/wp-json/contact-form-7/v1/contact-forms/YOUR_FORM_ID/feedback",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log("Form submitted successfully:", data);
      } else {
        console.error("Form submission error:", response.statusText);
      }
    } catch (error) {
      console.error("Form submission error:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="text">Please leave your</label>
        <input
          required
          type="text"
          id="text"
          name="text"
          value={formData.text}
          onChange={handleChange}
          placeholder="Name and surname"
        />
        <span>,</span>
      </div>
      <div>
        <label htmlFor="email"></label>
        <input
          required
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Your email"
        />
        <span>and</span>
      </div>
      <div>
        <label htmlFor="textarea">feel free to leave us a</label>
        <textarea
          id="textarea"
          name="textarea"
          value={formData.textarea}
          onChange={handleChange}
          placeholder="Message"
          rows='1'
        ></textarea>
      </div>
      <div>
        <Button text="Contact us" type="submit"></Button>
      </div>
    </form>
  );
};

export default MyForm;
