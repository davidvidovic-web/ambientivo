import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useQuery, gql } from "@apollo/client";
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
  const [isLoading, setIsLoading] = useState(true);
  const handleLoadingEnd = () => {
    setIsLoading(false);
  };
  const { slug } = useParams();
  const [post, setPost] = useState(null);

  const { loading, error, data } = useQuery(GET_ALL_POSTS);

  useEffect(() => {
    if (!loading && data) {
      const foundPost = data.projects.nodes.find(
        (project) => project.slug === slug
      );
      setPost(foundPost);
    }
  }, [loading, data, slug]);

  if (loading) return <LoadingScreen onAnimationEnd={handleLoadingEnd} />;
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

            <div dangerouslySetInnerHTML={{ __html: post.content }} />
          </>
        ) : (
          <div>Post not found</div>
        )}
      </div>

      <Footer />
    </>
  );
};

export default SinglePost;
