import React, { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import { useTranslation } from "react-i18next";
import MobileMenu from "../../Menu/mobileMenu";
import Footer from "../../Footer/Footer";
import LoadingScreen from "../../Animated/LoadingScreen/LoadingScreen";
import "./About.css";

const SLUG_MAPPING = {
  en: "about",
  fr: "qui-suis-je"
};

const GET_CONTACT_PAGE = gql`
  query GetContactPage($slug: String!) {
    pageBy(uri: $slug) {
      title
      content
      language {
        code
      }
      translations {
        title
        content
        language {
          code
        }
        slug
      }
    }
  }
`;

function About() {
  const { i18n } = useTranslation(); // Get the current language
  const [language, setLanguage] = useState(i18n.language || "en"); // Default to English
  
  // Get the correct slug based on current language
  const slug = SLUG_MAPPING[language] || SLUG_MAPPING.en; // Fallback to English slug

  const { loading, error, data, refetch } = useQuery(GET_CONTACT_PAGE, {
    variables: { slug },
    fetchPolicy: 'network-only' // Ensure we get fresh data when language changes
  });

  useEffect(() => {
    // Update the language when it changes in the i18n context
    setLanguage(i18n.language);
    // Refetch with new slug when language changes
    if (!loading) {
      refetch({ slug: SLUG_MAPPING[i18n.language] || SLUG_MAPPING.en });
    }
  }, [i18n.language, refetch]);

  if (loading) return <LoadingScreen />;
  if (error) {
    console.error(`Error loading page with slug: ${slug}`, error);
    // Attempt to load fallback language if current language fails
    if (language !== 'en') {
      setLanguage('en');
      refetch({ slug: SLUG_MAPPING.en });
    }
    return <div>Error loading page</div>;
  }

  const page = data?.pageBy;
  if (!page) {
    console.warn(`No page found for slug: ${slug}`);
    // Attempt to load fallback language if page not found
    if (language !== 'en') {
      setLanguage('en');
      refetch({ slug: SLUG_MAPPING.en });
    }
    return <div>Page not found</div>;
  }

  const translation = page?.translations?.find(
    (t) => t.language?.code === language
  ); // Find the translation matching the current language

  return (
    <>
      <MobileMenu />
      <section className="about">
        <div className="container">
          <div>
            <figure>
              <img src="./images/components/About/about.webp"></img>
              <figcaption>Jelena Obradović, CEO</figcaption>
            </figure>
          </div>
          <div>
            {translation ? (
              <>
                <h1>{translation.title}</h1>
                <div dangerouslySetInnerHTML={{ __html: translation.content }} />
              </>
            ) : page ? (
              <>
                <h1>{page.title}</h1>
                <div dangerouslySetInnerHTML={{ __html: page.content }} />
              </>
            ) : (
              <div>Page not found</div>
            )}
          </div>
        </div>
      </section>
      <Footer />
    </>
  );
}

export default About;
