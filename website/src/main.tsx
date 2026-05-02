import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LandingPage } from "./components/LandingPage";
import { WebAppWrapper } from "./components/WebAppWrapper";
import "./styles/landing.css";

declare global {
  interface Window {
    openNow: import("@shared/gfn").OpenNowApi;
  }
}

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/app" element={<WebAppWrapper />} />
      </Routes>
    </BrowserRouter>
  </React.StrictMode>,
);
