import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
import { useTranslation } from "react-i18next"; // Add this import
import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
import MobileMenu from "../../Menu/mobileMenu";
import Footer from "../../Footer/Footer";
import LoadingScreen from "../../Animated/LoadingScreen/LoadingScreen";
import "./SinglePost.css";

const GET_ALL_POSTS = gql`
  query GetAllPosts {
    projects {
      nodes {
        title
        slug
        excerpt
        content
        projectsFields {
          visualisation
          location
          date
          copyright
        }
      }
    }
  }
`;

const SinglePost = () => {
  const { t, i18n } = useTranslation();
  const [lightboxSources, setLightboxSources] = useState([]);
  const [open, setOpen] = useState(false);
  const [postIndex, setPostIndex] = useState(0);
  const [post, setPost] = useState(null);
  const { slug } = useParams();

  const { loading, error, data } = useQuery(GET_ALL_POSTS);

  useEffect(() => {
    if (!loading && data) {
      const foundPost = data.projects.nodes.find(
        (project) => project.slug === slug
      );
      setPost(foundPost);

      if (foundPost) {
        extractLightboxImages(foundPost.content);
      }
    }
  }, [loading, data, slug]);

  const extractLightboxImages = (content) => {
    const parser = new DOMParser();
    const doc = parser.parseFromString(content, "text/html");
    const images = Array.from(doc.getElementsByTagName("img"));
    const imageSources = images.map((img) => img.src);
    setLightboxSources(imageSources);
  };

  if (loading) return <LoadingScreen />;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <>
      <MobileMenu />
      <div className="single">
        {post ? (
          <>
            <h1>{post.title}</h1>
            <div className="acf-fields">
              <p>
                <strong>{t('singlePost.visualisation')}:</strong>{" "}
                {post.projectsFields.visualisation}
              </p>
              <p>
                <strong>{t('singlePost.location')}:</strong>{" "}
                {post.projectsFields.location}
              </p>
              <p>
                <strong>{t('singlePost.date')}:</strong>{" "}
                {new Intl.DateTimeFormat(i18n.language, {
                  month: "long",
                  year: "numeric",
                }).format(new Date(post.projectsFields.date))}
              </p>
              {post.projectsFields.copyright && (
                <p>
                  <strong>{t('singlePost.copyright')}:</strong>{" "}
                  {post.projectsFields.copyright}
                </p>
              )}
            </div>
            {/* Lightbox gallery */}
            <div className="wp-block-gallery">
              <div className="wp-block-gallery has-nested-images columns-default is-cropped wp-block-gallery-1 is-layout-flex wp-block-gallery-is-layout-flex">
                {lightboxSources.map((src, index) => (
                  <figure key={index} className="wp-block-image size-large">
                    <img
                      src={src}
                      alt={t('singlePost.imageAlt', { 
                        title: post.title, 
                        number: index + 1 
                      })}
                      onClick={() => {
                        setOpen(true);
                        setPostIndex(index);
                      }}
                    />
                  </figure>
                ))}
              </div>
            </div>
          </>
        ) : (
          <div>{t('singlePost.notFound')}</div>
        )}
      </div>
      <Lightbox
        open={open}
        index={postIndex}
        close={() => setOpen(false)}
        slides={lightboxSources.map((src) => ({ src }))}
      />
      <Footer />
    </>
  );
};

export default SinglePost;
