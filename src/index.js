import React from "react";
import ReactDOM from "react-dom";
import App from "./App";
import { WBContextProvider } from "./context/WBContext";

ReactDOM.render(
  <React.StrictMode>
    <WBContextProvider>
      <App />
    </WBContextProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
