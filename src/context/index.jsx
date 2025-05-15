import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const GlobalContext = createContext();

function GlobalState({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const token = localStorage.getItem("token");

  const axiosAuth = axios.create({
    baseURL: "http://localhost:5000/api",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  // 🛒 Add to Cart
  const addToCart = async (productId, quantity = 1) => {
    try {
      const res = await axiosAuth.post("/cart/addtocart", {
        productId,
        quantity,
      });
      if (res.data.success) {
        setCartItems(res.data.cart.items);
      }
    } catch (err) {
      console.error("Add to cart failed:", err.message);
    }
  };

  // 📦 Get Cart
  const fetchCart = async () => {
    try {
      const res = await axiosAuth.get("/cart/getitems");
      if (res.data.success) {
        setCartItems(res.data.cart.items);
      }
    } catch (err) {
      console.error("Fetching cart failed:", err.message);
    }
  };

  const updateQuantity = async (productId, quantity) => {
    try {
      const res = await axiosAuth.put(`/cart/update/${productId}`, {
        quantity,
      });
      if (res.data.success) {
        setCartItems(res.data.cart.items);
      }
    } catch (err) {
      console.error("Updating quantity failed:", err.message);
    }
  };

  // ❌ Remove from Cart
  const removeFromCart = async (productId) => {
    try {
      const res = await axiosAuth.delete(`/cart/remove/${productId}`);
      if (res.data.success) {
        setCartItems(res.data.cart.items);
      }
    } catch (err) {
      console.error("Remove from cart failed:", err.message);
    }
  };

  // ✅ Set auth state & get cart if logged in
  useEffect(() => {
    if (token) {
      setIsAuthenticated(true);
      fetchCart();
    } else {
      setIsAuthenticated(false);
      setCartItems([]);
    }
  }, [token]);

  return (
    <GlobalContext.Provider
      value={{
        cartItems,
        addToCart,
        updateQuantity,
        removeFromCart,
        setCartItems,
        isAuthenticated,
        setIsAuthenticated,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalState;
