import { createBrowserRouter } from "react-router";
import { MainLayout } from "./layouts/MainLayout";
import { DetailsLayout } from "./layouts/DetailsLayout";
import { ProtectedLayout } from "./layouts/ProtectedLayout";
import { ProtectedDetailsLayout } from "./layouts/ProtectedDetailsLayout";
import { LandingPage } from "./pages/LandingPage";
import { PageNotFound } from "./pages/PageNotFound";
import { DiscoverPage } from "./pages/DiscoverPage";
import { RecipeDetailsPage } from "./pages/RecipeDetailsPage";
import { ProfilePage } from "./pages/ProfilePage";
import { FavoritesPage } from "./pages/FavoritesPage";
import { CreatePage } from "./pages/CreatePage";
import { LoginPage } from "./pages/LoginPage";
import { EditPage } from "./pages/EditPage";

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
        path: "/*",
        Component: PageNotFound,
      },
    ],
  },
  {
    Component: ProtectedDetailsLayout,
    children: [
      {
        path: "/create",
        Component: CreatePage,
      },
      {
        path: "/edit/:recipeSlug",
        Component: EditPage,
      },
      {
        path: "/*",
        Component: PageNotFound,
      },
    ],
  },
]);
