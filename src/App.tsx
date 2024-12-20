import React from "react";
import { HelmetProvider } from "react-helmet-async";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import "./i18n";

const TechTreePage = React.lazy(() => import("./TechTree/TechTree"));
const PostIndustrialSocietyPage = React.lazy(
  () => import("./PostIndustrialSociety/PostIndustrialSociety")
);
const BestagonPage = React.lazy(() => import("./Bestagon/Bestagon"));
const DemographyPage = React.lazy(() => import("./Demography/Demography"));

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
    {
      path: "/bestagon",
      element: <BestagonPage />,
    },
    {
      path: "/demography",
      element: <DemographyPage />,
    },
  ]);
  return (
    <HelmetProvider>
      <RouterProvider router={router} />
    </HelmetProvider>
  );
};

export default App;
