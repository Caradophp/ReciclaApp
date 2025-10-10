import React from "react";
import { AppProvider } from "./context/AppContext";
import LoginScreen from "./views/LoginScreen";

export default function App() {
  return (
    <AppProvider>
      <LoginScreen />
    </AppProvider>
  );
}

