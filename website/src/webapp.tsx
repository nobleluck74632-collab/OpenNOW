import React from "react";
import ReactDOM from "react-dom/client";
import { createWebApi } from "./lib/web-api";
import { App } from "@renderer/App";
import "./styles/app.css";

declare global {
  interface Window {
    openNow: import("@shared/gfn").OpenNowApi;
  }
}

window.openNow = createWebApi();

console.log("[WebApp] OpenNOW API initialized for web environment");

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
