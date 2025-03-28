import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

document.addEventListener("DOMContentLoaded", () => {
  const rootElement = document.getElementById("root");

  if (!rootElement) {
    throw new Error("Elemento #root não encontrado! Verifique o index.html.");
  }

  createRoot(rootElement).render(
    <StrictMode>
      <App />
    </StrictMode>
  );
});
