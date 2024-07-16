import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import SinglePost from "./components/Pages/Single/SinglePost.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider, Link } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import client from "./components/Apollo/apollo";
import Cursor from "./components/Cursor/Cursor.jsx";
import Portfolio from "./components/Pages/Portfolio/Portfolio.jsx";
import About from "./components/Pages/About/About.jsx";
import Contact from "./components/Pages/Contact/Contact.jsx";
import SinglePage from "./components/Pages/Single/SinglePage.jsx";
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/projects/:slug",
    element: (
      <SinglePost
        render={(props) => <SinglePost id={props.match.params.slug} />}
      />
    ),
  },
  {
    path: "/portfolio",
    element: <Portfolio />,
  },
  {
    path: "/about",
    element: <About />,
  },
  {
    path: "/contact",
    element: <Contact />,
  },
  {
    path: "/page/:slug",
    element: (
      <SinglePage
        render={(props) => <SinglePage id={props.match.params.id} />}
      />
    ),
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <main>
        <RouterProvider router={router} />
        <Cursor />
      </main>
    </ApolloProvider>
  </React.StrictMode>
);
