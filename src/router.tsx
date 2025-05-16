import { createBrowserRouter } from "react-router";
import { MainLayout } from "./layouts/MainLayout";
import { LandingPage } from "./pages/LandingPage";
import { ProtectedLayout } from "./layouts/ProtectedLayout";
import { PageNotFound } from "./pages/PageNotFound";
import { DiscoverPage } from "./pages/DiscoverPage";
import { RecipeDetailsPage } from "./pages/RecipeDetailsPage";
import { ProfilePage } from "./pages/ProfilePage";
import { FavoritesPage } from "./pages/FavoritesPage";
import { CreatePage } from "./pages/CreatePage";
import { LoginPage } from "./pages/LoginPage";
import { DetailsLayout } from "./layouts/DetailsLayout";

export const Router = createBrowserRouter([
  {
    Component: MainLayout,
    children: [
      {
        index: true,
        Component: LandingPage,
      },
      {
        path: "/discover",
        Component: DiscoverPage,
      },
      {
        path: "/login",
        Component: LoginPage,
      },
      {
        path: "/*",
        Component: PageNotFound,
      },
    ],
  },
  {
    Component: DetailsLayout,
    children: [
      {
        path: "/recipe/:slug",
        Component: RecipeDetailsPage,
      },
      {
        path: "/*",
        Component: PageNotFound,
      },
    ],
  },
  {
    Component: ProtectedLayout,
    children: [
      {
        path: "/profile",
        Component: ProfilePage,
      },
      {
        path: "/favorites",
        Component: FavoritesPage,
      },
      {
        path: "/create",
        Component: CreatePage,
      },
    ],
  },
]);
