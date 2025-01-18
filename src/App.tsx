import React from "react";
import { HelmetProvider } from "react-helmet-async";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const TechTreePage = React.lazy(() => import("./TechTree/TechTree"));
const PostIndustrialSocietyPage = React.lazy(
  () => import("./PostIndustrialSociety/PostIndustrialSociety")
);
const BestagonPage = React.lazy(() => import("./Bestagon/Bestagon"));
const AmecoPage = React.lazy(() => import("./AMECO/Ameco"));

const App: React.FC = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <AmecoPage />,
    },
    {
      path: "/techtree",
      element: <TechTreePage />,
    },
    {
      path: "/postindustrialsociety",
      element: <PostIndustrialSocietyPage />,
    },
    {
      path: "/bestagon",
      element: <BestagonPage />,
    },
    {
      path: "/ameco",
      element: <AmecoPage />,
    },
  ]);
  return (
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  );
};

export default App;
