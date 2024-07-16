import MobileMenu from "../../Menu/mobileMenu";
import Footer from "../../Footer/Footer";
import MyForm from "../../Form/Form";
import WordRotator from "../../WordRotator/WordRotator";
import "./Contact.css";
function Contact() {
  return (
    <div>
      <div
        style={{
          background: "#eeeae0",
        }}
      >
        <MobileMenu></MobileMenu>
        <section className="contact">
          <div className="container">
            <h1>
              We are open to collaborations and discussions on any project idea
            </h1>
            <div>
              <span>Don't hesitate to say: </span>
              <WordRotator></WordRotator>
            </div>
            <MyForm></MyForm>
          </div>
        </section>
        <Footer></Footer>
      </div>
    </div>
  );
}

export default Contact;
