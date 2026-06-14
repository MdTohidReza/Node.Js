import { createContext, useState } from "react";

export const AppContent = createContext();

export const AppContextProvider = (props) => {
    const backendUrl =
    import.meta.env.VITE_BACKEND_URL;
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userData, setUserData] = useState(null);
  const value = {
    backendUrl,
    isLoggedIn, setIsLoggedIn,
    userData, setUserData,
    // your shared state/functions go here
  };

  return (
    <AppContent.Provider value={value}>
        {props.children}
    </AppContent.Provider>
  );
};
