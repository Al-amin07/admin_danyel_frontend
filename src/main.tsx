import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import routes from "./routes/Routes.tsx";

import ReduxProviderWrapper from "./provider/ReduxProvider.tsx";
import { Toaster } from "sonner";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ReduxProviderWrapper>
      <RouterProvider router={routes} />
      <Toaster position="top-right" richColors />
    </ReduxProviderWrapper>
  </StrictMode>
);
