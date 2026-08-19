import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { Provider as ReduxProvider } from "react-redux";

import "./index.css";
import App from "./App.jsx";
import { store } from "@/store/store";
import { ThemeProvider } from "@/context/ThemeContext";

createRoot(document.getElementById("root")).render(
  <ReduxProvider store={store}>
    <ThemeProvider>
      <App />
    </ThemeProvider>
  </ReduxProvider>,
);
