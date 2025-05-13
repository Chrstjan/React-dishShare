import { createBrowserRouter } from "react-router";
import { MainLayout } from "./layouts/MainLayout";
import { LandingPage } from "./pages/LandingPage";
import { ProtectedLayout } from "./layouts/ProtectedLayout";
import { PageNotFound } from "./pages/PageNotFound";

export const Router = createBrowserRouter([
  {
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: LandingPage,
      },
      {
        path: "/*",
        Component: PageNotFound,
      },
    ],
  },
  {
    Component: ProtectedLayout,
    children: [],
  },
]);
