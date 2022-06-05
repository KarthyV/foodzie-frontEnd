import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import AppContext from "./context";
import { BrowserRouter } from "react-router-dom";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <AppContext>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AppContext>
);
