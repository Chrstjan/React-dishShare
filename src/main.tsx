import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserContextProvider } from "./context/UserContext.tsx";
import { RouterProvider } from "react-router";
import { Router } from "./router.tsx";
import "./App.scss";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient} />
    <UserContextProvider>
      <RouterProvider router={Router} />
    </UserContextProvider>
  </StrictMode>
);
