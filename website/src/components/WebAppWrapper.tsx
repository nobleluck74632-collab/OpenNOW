import React, { useEffect } from "react";
import { createWebApi } from "../lib/web-api";
import { App } from "@renderer/App";
import "../styles/webapp.css";

export function WebAppWrapper(): React.JSX.Element {
  useEffect(() => {
    window.openNow = createWebApi();
    console.log("[WebApp] OpenNOW API initialized for web environment");
  }, []);

  return <App />;
}
