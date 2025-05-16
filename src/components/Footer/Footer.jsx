import { Link } from "react-router-dom";
import { useTranslation } from "react-i18next";
import Logo from "../Logo/Logo";
import "./Footer.css";
import Instagram from "../Animated/Socials/Instagram";
import Facebook from "../Animated/Socials/Facebook";

function Footer() {
  const { t, i18n } = useTranslation(); // Add i18n
  const year = new Date().getFullYear();

  // Get privacy policy URL based on language
  const getPrivacyPolicyUrl = () => {
    return i18n.language === 'fr' 
      ? '/page/politique-de-confidentialite-conditions-generales-dutilisation'
      : '/page/privacy-policy';
  };

  return (
    <footer>
      <section className="container">
        <div className="upperFooter">
          <div>
            <Logo />
            <span>{t('footer.tagline')}</span>
            <p>
              <a href="mailto:office@ambientivo.com">office@ambientivo.com</a>
            </p>
            <span>
              <br /> {t('footer.address.street')},<br />
              {t('footer.address.area')},<br />
              {t('footer.address.city')},<br />
              {t('footer.address.country')}
            </span>
          </div>
          <div>
            <Logo />
            <span>
              {t('footer.locations.based')} <br /><br />
              <b>{t('footer.locations.current.france')}</b>,<br />
              <b>{t('footer.locations.current.monaco')}</b>
            </span>
            <span>
              {t('footer.locations.available')} <br />
              {t('footer.locations.other.austria')}, <br />
              {t('footer.locations.other.croatia')}, <br />
              {t('footer.locations.other.bosnia')}
            </span>
          </div>
          <div>
            <h3>{t('footer.socials')}</h3>
            <div>
              <Instagram />
              <Facebook />
            </div>
            <div className="partners">
              <span><h3>{t('footer.partners.title')}:</h3></span>
              <br />
              <a href="https://www.lxdesignstudio.co/">
                <img src="../images/lx_design_studio.png" alt="LX Design Studio" />
              </a>
            </div>
          </div>
        </div>
        <hr />
        <div className="lowerFooter">
          <div className="copyright copyright-desktop">
            <span>{t('footer.copyright')} | Ambientivo © </span>
            <span id="current-year">{year}</span>
            <span> | </span>
            <span>
              {t('footer.madeBy')}{" "}
              <Link className="nav__link dev" target="blank" to="https://davidvidovic.com">
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
              <span>{t('footer.madeBy')}</span>
              <Link className="nav__link dev" target="blank" to="https://davidvidovic.com">
                David Vidovic
              </Link>
            </div>
          </div>
          <div className="impressum">
            <Link 
              className="nav__link" 
              target="_self" 
              to={getPrivacyPolicyUrl()}
            >
              {t('footer.privacy')}
            </Link>
          </div>
        </div>
      </section>
    </footer>
  );
}

export default Footer;
