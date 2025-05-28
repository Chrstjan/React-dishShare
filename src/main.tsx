import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { UserContextProvider } from "./context/UserContext.tsx";
import { RouterProvider } from "react-router";
import { Router } from "./router.tsx";
import { ToastContainer, Zoom } from "react-toastify";
import "./App.scss";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UserContextProvider>
      <QueryClientProvider client={queryClient}>
        <RouterProvider router={Router} />
        <ToastContainer
          position="bottom-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="dark"
          transition={Zoom}
        />
      </QueryClientProvider>
    </UserContextProvider>
  </StrictMode>
);
