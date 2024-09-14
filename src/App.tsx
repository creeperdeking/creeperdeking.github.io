import React from "react";
import { HelmetProvider } from "react-helmet-async";
import { createBrowserRouter, RouterProvider } from "react-router-dom";

const TechTreePage = React.lazy(() => import("./TechTree/TechTree"));
const PostIndustrialSocietyPage = React.lazy(
  () => import("./PostIndustrialSociety/PostIndustrialSociety")
);

const App: React.FC = () => {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <PostIndustrialSocietyPage />,
    },
    {
      path: "/techtree",
      element: <TechTreePage />,
    },
    {
      path: "/postindustrialsociety",
      element: <PostIndustrialSocietyPage />,
    },
  ]);
  return (
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  );
};

export default App;
