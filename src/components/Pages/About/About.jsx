import "./About.css";
import MobileMenu from "../../Menu/mobileMenu";
import Footer from "../../Footer/Footer";
function About() {
  return (
    <>
      <MobileMenu></MobileMenu>
      <section className="about">
        <div className="container">
          <div>
            <figure>
              <img src="./images/components/About/about.webp"></img>
              <figcaption>Jelena Obradović, CEO</figcaption>
            </figure>
          </div>
          <div>
            <h2>About me</h2>
            <p>
              My journey in architecture commences with the idea of the beauty
              in crafting spaces where emotion serves as a universal language
              understood by all, regardless of their background, language, or
              culture. Along that journey, several countries and cultures were
              involved, enriching my horizons.
            </p>
            <p>
              I began my Bachelor studies in Banja Luka, Bosnia and Herzegovina,
              and after second year continued my education in Maribor, Slovenia.
              During my time in Slovenia, I embarked on a semester exchange
              program in Lublin, Poland. Subsequently, I pursued my Master's
              studies in Graz, Austria, where I as well gained valuable
              experience in designing large residential structures, medium-sized
              buildings, and private houses. It was here that I embraced the
              Germanic principles of quality and functionality as the primary
              guiding factors in my projects.
            </p>
            <p>
              In 2022, personal circumstances led me to the Cote d'Azur, France,
              where I established my own interior design company. This allowed
              me to maintain existing connections while forging new ones in
              France, as well as developing another branch of my architectural
              path that has always attracted me. The soil of France begins to
              enrich my career path with aesthetics as an important feature of
              creation.
            </p>
            <p>
              Architecture, to me, embodies a fusion of engineering, art, and
              aesthetics, offering a diverse array of possibilities and
              directions that constantly intersect, resulting in a profound
              richness Striving for a balance between these three elements is
              the ultimate objective, as it is the only way to create
              high-quality, beautiful, and impactful spaces.
            </p>
          </div>
        </div>
      </section>
      <Footer></Footer>
    </>
  );
}

export default About;
