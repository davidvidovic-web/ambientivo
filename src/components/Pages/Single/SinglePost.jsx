import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
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
      }
    }
  }
`;

const SinglePost = () => {
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
    const imageSources = images.map((img) => {
      // const webpSrc = img.src.replace("uploads", "smush-webp") + ".webp";
      const webpSrc = img.src;
      return webpSrc;
    });
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
            <p
              className="excerpt"
              dangerouslySetInnerHTML={{ __html: post.excerpt }}
            />
            {/* <div
              className="wp-block-gallery"
              dangerouslySetInnerHTML={{ __html: post.content }}
            /> */}
            {/* Lightbox gallery */}
            <div className="wp-block-gallery">
              <div className="wp-block-gallery has-nested-images columns-default is-cropped wp-block-gallery-1 is-layout-flex wp-block-gallery-is-layout-flex">
                {lightboxSources.map((src, index) => (
                  <figure key={index} className="wp-block-image size-large">
                    <img
                      src={src}
                      alt={`${post.title} image ${index + 1}`}
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
          <div>Post not found</div>
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
