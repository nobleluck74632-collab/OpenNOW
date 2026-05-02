import React, { useEffect, useMemo } from "react";
import { createWebApi } from "../lib/web-api";
import { App } from "@renderer/App";
import "../styles/webapp.css";

// Initialize API early, before App component is even evaluated in some cases
// or at least before its initial render.
if (typeof window !== "undefined" && !window.openNow) {
  window.openNow = createWebApi();
  console.log("[WebApp] OpenNOW API pre-initialized for web environment");
}

export function WebAppWrapper(): React.JSX.Element {
  return <App />;
}
