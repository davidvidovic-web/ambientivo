import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import { useTranslation } from "react-i18next";
import MobileMenu from "../../Menu/mobileMenu";
import Footer from "../../Footer/Footer";
import LoadingScreen from "../../Animated/LoadingScreen/LoadingScreen";
import "./SinglePost.css";

const GET_ALL_PAGES = gql`
  query GetAllPages {
    pages {
      nodes {
        title
        slug
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
        }
      }
    }
  }
`;

const SinglePage = () => {
  const { t, i18n } = useTranslation();
  const [isLoading, setIsLoading] = useState(true);
  const { slug } = useParams();
  const [page, setPage] = useState(null);

  const { loading, error, data } = useQuery(GET_ALL_PAGES);

  const handleLoadingEnd = () => {
    setIsLoading(false);
  };

  useEffect(() => {
    if (!loading && data) {
      const foundPage = data.pages.nodes.find((page) => page.slug === slug);
      setPage(foundPage);
    }
  }, [loading, data, slug]);

  if (loading) return <LoadingScreen onAnimationEnd={handleLoadingEnd} />;
  if (error) return <div>{t('singlePage.error', { message: error.message })}</div>;

  return (
    <>
      <MobileMenu />
      <div className="single">
        {page ? (
          <>
            <h1>{page.title}</h1>
            <div dangerouslySetInnerHTML={{ __html: page.content }} />
          </>
        ) : (
          <div>{t('singlePage.notFound')}</div>
        )}
      </div>
      <Footer />
    </>
  );
};

export default SinglePage;
