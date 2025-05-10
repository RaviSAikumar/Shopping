import { createContext } from "react";
import { useState, useEffect } from "react";

export const GlobalContext = createContext();

function GlobalState({ children }) {
  const [addToCart, setAddToCart] = useState(() => {
    const storedCart = localStorage.getItem("addToCart");
    return storedCart ? JSON.parse(storedCart) : [];
  });
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    localStorage.setItem("addToCart", JSON.stringify(addToCart));
  }, [addToCart]);

  return (
    <GlobalContext.Provider value={{ addToCart, setAddToCart }}>
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalState;
