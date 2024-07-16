import React, { useState } from "react";

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Construct the query string
    const queryString = new URLSearchParams({
      name,
      email,
      message,
    }).toString();

    try {
      const response = await fetch(
        `https://ambientivo.com/wp-json/custom/v1/submit-form?${queryString}`,
        {
          method: "GET",
        }
      );

      const result = await response.json();

      if (response.ok) {
        setStatus("Form submitted successfully.");
      } else {
        setStatus(`Form submission failed: ${result.message}`);
      }
    } catch (error) {
      setStatus(`Form submission failed: ${error.message}`);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Name:</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div>
          <label>Message:</label>
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            required
          ></textarea>
        </div>
        <button type="submit">Submit</button>
      </form>
      {status && <p>{status}</p>}
    </div>
  );
};

export default ContactForm;
