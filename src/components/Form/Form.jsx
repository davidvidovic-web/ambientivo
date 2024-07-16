import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";

const SEND_EMAIL_MUTATION = gql`
  mutation SendEmail($name: String!, $email: String!, $message: String!) {
    sendEmail(input: { name: $name, email: $email, message: $message }) {
      success
      message
    }
  }
`;

const ContactForm = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("");

  const [sendEmail, { loading, error }] = useMutation(SEND_EMAIL_MUTATION, {
    onError: (error) => {
      setStatus(`Form submission failed: ${error.message}`);
    },
    onCompleted: (data) => {
      if (data.sendEmail.success) {
        setStatus("Form submitted successfully.");
      } else {
        setStatus(`Form submission failed: ${data.sendEmail.message}`);
      }
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    sendEmail({
      variables: {
        name,
        email,
        message,
      },
    });

    // Clear form fields after submission (optional)
    setName("");
    setEmail("");
    setMessage("");
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
        <button type="submit" disabled={loading}>
          Submit
        </button>
      </form>
      {status && <p>{status}</p>}
      {error && <p>Error: {error.message}</p>}
    </div>
  );
};

export default ContactForm;
