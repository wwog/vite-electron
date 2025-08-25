import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { UpdatePage } from "./page";

const root = document.getElementById("root")!;

createRoot(root).render(
  <StrictMode>
    <UpdatePage />
  </StrictMode>
);
