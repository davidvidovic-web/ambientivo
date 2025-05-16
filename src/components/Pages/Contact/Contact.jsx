import MobileMenu from "../../Menu/mobileMenu";
import Footer from "../../Footer/Footer";
import MyForm from "../../Form/Form";
import WordRotator from "../../WordRotator/WordRotator";
import { useTranslation } from "react-i18next";
import "./Contact.css";

function Contact() {
  const { t } = useTranslation();

  return (
    <div>
      <div style={{ background: "#eeeae0" }}>
        <MobileMenu />
        <section className="contact">
          <div className="container">
            <h1>{t('contact.title')}</h1>
            <div>
              <span>{t('contact.subtitle')} </span>
              <WordRotator />
            </div>
            <MyForm />
          </div>
        </section>
        <Footer />
      </div>
    </div>
  );
}

export default Contact;
