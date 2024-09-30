import { Link } from "react-router-dom";
import Logo from "../Logo/Logo";
import "./Footer.css";
import Instagram from "../Animated/Socials/Instagram";
// import LinkedIn from "../Animated/Socials/LinkedIn";

function Footer() {
  const year = new Date().getFullYear();

  return (
    <>
      <footer>
        <section className="container">
          <div className="upperFooter">
            <div>
              <Logo></Logo>
              <span>Interior design & architecture atelier</span>
              <p>
                <a href="mailto:mailto:office@ambientivo.com">
                  office@ambientivo.com
                </a>
              </p>
              <span>
                <br></br> 71-75 Shelton Street,<br></br> Covent Garden,
                <br></br>
                London,<br></br> United Kingdom
              </span>
            </div>
            <div>
              <Logo></Logo>
              <span>
                Currently based and working in: <br></br>
                <br></br>
                <b>France Cote d’Azur</b>,<br></br>
                <b>Monaco</b>
              </span>
              <span>
                Also available in: <br></br> Austria, <br></br>Croatia,{" "}
                <br></br>Bosnia & Herzegovina
              </span>
            </div>
            <div>
              <h3>Socials</h3>
              <div>
                <Instagram></Instagram>
                {/* <LinkedIn></LinkedIn> */}
              </div>
              <div>
                Partners: <br></br>
                <img src="./images/lx_design_studio.png"></img>
              </div>
            </div>
          </div>
          <hr></hr>
          <div className="lowerFooter">
            <div className="copyright copyright-desktop">
              <span>All rights reserved | Ambientivo © </span>
              <span id="current-year">{year}</span>
              <span>|</span>
              <span>
                Made by{" "}
                <Link
                  className="nav__link dev"
                  target="blank"
                  to="https://davidvidovic.com"
                  style={{ textTransform: "capitalize" }}
                >
                  David Vidovic
                </Link>
              </span>
            </div>
            <div className="copyright copyright-mobile">
              <div>
                <span>Ambientivo © </span>
                <span id="current-year">{year}</span>
              </div>
              <div>
                <span>Made by</span>
                <Link
                  className="nav__link dev"
                  target="blank"
                  to="https://davidvidovic.com"
                  style={{ textTransform: "capitalize" }}
                >
                  David Vidovic
                </Link>{" "}
              </div>
            </div>
            <div className="impressum">
              <Link className="nav__link" target="_self" to="/">
                GDPR
              </Link>
              <Link
                className="nav__link"
                target="_self"
                to="/page/privacy-policy"
              >
                Privacy & Policy
              </Link>
            </div>
          </div>
        </section>
      </footer>
    </>
  );
}

export default Footer;
