import { createRoot } from "react-dom/client";
import React from "react";
// import App from "./old-map/App";
import App from "./App";
const rootElement = document.getElementById("app");
const root = createRoot(rootElement);
root.render(<App />);
