import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import SinglePost from "./components/Pages/Single/SinglePost.jsx";
import "./index.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { ApolloProvider } from "@apollo/client";
import client from "./components/Apollo/apollo";
import Cursor from "./components/Cursor/Cursor.jsx";
import ResponsivePortfolio from "./components/Pages/Portfolio/ResponsivePortfolio.jsx"; // Import the responsive component
import About from "./components/Pages/About/About.jsx";
import Contact from "./components/Pages/Contact/Contact.jsx";
import SinglePage from "./components/Pages/Single/SinglePage.jsx";
import ScrollToTop from "./components/ScrollTop/ScrollTop.jsx";
import "./i18n";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/projects/:slug",
    element: <SinglePost />,
  },
  {
    path: "/portfolio",
    element: <ResponsivePortfolio />, // Use the responsive portfolio component
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
    element: <SinglePage />,
  },
]);

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <ApolloProvider client={client}>
      <main>
        <RouterProvider router={router}>
          <ScrollToTop />
        </RouterProvider>
        <Cursor />
      </main>
    </ApolloProvider>
  </React.StrictMode>
);
