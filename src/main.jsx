import React from "react";
import { createRoot } from "react-dom/client";
import App from "./App.jsx";
import { seedDemo } from "./store.js";
import "./styles.css";

seedDemo();

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
