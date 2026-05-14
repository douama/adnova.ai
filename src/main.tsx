import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import { App } from "./App";
import { ErrorBoundary } from "./components/ErrorBoundary";
import { ConfigMissingScreen } from "./components/ConfigMissingScreen";
import { ThemeProvider } from "./lib/theme";
import { env } from "./lib/env";
import "./lib/i18n";
import "./index.css";

const root = document.getElementById("root");
if (!root) throw new Error("Root element #root not found");

// Fail-soft : sans Supabase config, on n'instancie même pas le client.
// Affiche un écran explicite à la place de la page blanche.
createRoot(root).render(
  <StrictMode>
    <ThemeProvider>
      {env.isConfigured ? (
        <ErrorBoundary>
          <BrowserRouter>
            <App />
          </BrowserRouter>
        </ErrorBoundary>
      ) : (
        <ConfigMissingScreen />
      )}
    </ThemeProvider>
  </StrictMode>,
);
