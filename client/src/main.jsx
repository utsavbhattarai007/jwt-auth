import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./css/Global.css";
import { BrowserRouter } from "react-router-dom";
import Context from "./config/Context";

ReactDOM.createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <Context>
      <App />
    </Context>
  </BrowserRouter>
);
