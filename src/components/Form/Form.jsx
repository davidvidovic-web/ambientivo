import React, { useState } from "react";
import { useMutation, gql } from "@apollo/client";
import { useTranslation } from "react-i18next";
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
  const { t } = useTranslation();
  const [formData, setFormData] = useState({
    text: "",
    email: "",
    textarea: "",
  });
  const [status, setStatus] = useState("");

  const [sendEmail, { loading, error }] = useMutation(SEND_EMAIL_MUTATION, {
    onError: (error) => {
      setStatus(t('form.error', { message: error.message }));
    },
    onCompleted: (data) => {
      if (data.sendEmail.sent) {
        setStatus(t('form.success'));
      } else {
        setStatus(t('form.error', { message: data.sendEmail.message }));
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
          <label htmlFor="text">{t('form.nameLabel')}</label>
          <input
            required
            type="text"
            id="text"
            name="text"
            value={formData.text}
            onChange={handleChange}
            placeholder={t('form.namePlaceholder')}
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
            placeholder={t('form.emailPlaceholder')}
          />
          <span>{t('form.and')}</span>
        </div>
        <div>
          <label htmlFor="textarea">{t('form.messageLabel')}</label>
          <textarea
            id="textarea"
            name="textarea"
            value={formData.textarea}
            onChange={handleChange}
            placeholder={t('form.messagePlaceholder')}
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
            {t('form.submitButton')}
          </button>
        </div>
      </form>
      {status && <p style={{ textAlign: "center" }}>{status}</p>}
      {error && <p style={{ textAlign: "center" }}>{t('form.error', { message: error.message })}</p>}
    </div>
  );
};

export default ContactForm;
