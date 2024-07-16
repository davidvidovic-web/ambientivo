import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import Button from "../Button/Button";
import "./Form.css";

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
  const [formData, setFormData] = useState({
    text: "",
    email: "",
    textarea: "",
  });
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

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    sendEmail({
      variables: {
        to: "office@ambientivo.com",
        from: formData.email,
        subject: `New message from ${formData.text}`,
        body: formData.textarea,
        clientMutationId: "test",
      },
    });
  };

  return (
    <div>
      <form id="contact" onSubmit={handleSubmit}>
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
            rows="1"
          ></textarea>
        </div>
        <div>
          <button
            className="ambientivo-shortcode ambientivo-m  ambientivo-button ambientivo-layout--outlined   ambientivo-html--link"
            type="submit"
            style={{ color: "#111" }}
            disabled={loading}
          >
            Contact us
          </button>
        </div>
      </form>
      {status && <p style={{ textAlign: "center" }}>Thank you for your submittion, we will contact you shortly!</p>}
      {error && <p style={{ textAlign: "center" }}>Error: {error.message}</p>}
    </div>
  );
};

export default ContactForm;
