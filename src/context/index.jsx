import { createContext } from "react";
import { useState, useEffect } from "react";

export const GlobalContext = createContext();

function GlobalState({ children }) {
  const [addToCart, setAddToCart] = useState(() => {
    const storedCart = localStorage.getItem("addToCart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  console.log(isAuthenticated);
  useEffect(() => {
    localStorage.setItem("addToCart", JSON.stringify(addToCart));
  }, [addToCart]);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      // Optionally, you could verify the token here (e.g., by making a request to the backend)
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, []);

  return (
    <GlobalContext.Provider
      value={{ addToCart, setAddToCart, isAuthenticated, setIsAuthenticated }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalState;
