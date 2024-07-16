import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";

const SEND_EMAIL_MUTATION = gql`
  mutation SendEmail(
    $to: String!
    $from: String!
    $subject: String!
    $body: String!
    $clientMutationId: String!
  ) {
    sendEmail(
      input: {
        to: $to
        from: $from
        subject: $subject
        body: $body
        clientMutationId: $clientMutationId
      }
    ) {
      origin
      sent
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
      if (data.sendEmail.sent) {
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
        to: email, // You can adjust this if needed
        from: email, // Change this to the desired sender email
        subject: `New message from ${name}`,
        body: message,
        clientMutationId: "test", // Change as necessary
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
