import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "leaflet/dist/leaflet.css";
import "./index.css";
import App from "./App.jsx";
import { AuthProvider } from "./context/AuthContext";
import { DashboardProvider } from "./context/DashboardContext";
import { ParkingUserProvider } from "./context/ParkingUserContext";

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <AuthProvider>
      <DashboardProvider>
        <ParkingUserProvider>
          <App />
        </ParkingUserProvider>
      </DashboardProvider>
    </AuthProvider>
  </StrictMode>
);