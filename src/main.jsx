import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter
      // Enable React Router v7 future flags to:
      future={{
        v7_startTransition: true,
        // startTransition for smoother navigation
        v7_relativeSplatPath: true,
        // Adopt new relative splat path behavior
      }}
    >
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
