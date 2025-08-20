import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { HomePage } from "./page";

const root = document.getElementById("root")!;

createRoot(root).render(
  <StrictMode>
    <HomePage />
  </StrictMode>
);
