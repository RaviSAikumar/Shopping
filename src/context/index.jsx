import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const GlobalContext = createContext();

function GlobalState({ children }) {
  const [cartItems, setCartItems] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [token, setToken] = useState(null);
  const [selectedGender, setSelectedGender] = useState("");
  const [pricing, setPricing] = useState({
    totalPrice: 0,
    discount: 0,
    totalAmount: 0,
    charges: 0,
    shipingPrice: 0,
  });

  // Create axios instance with latest token
  const getAxiosAuth = () =>
    axios.create({
      baseURL: "https://e-commerce-backeend.onrender.com/api",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

  // 🛒 Add to Cart
  const addToCart = async (productId, quantity = 1) => {
    try {
      const res = await getAxiosAuth().post("/cart/addtocart", {
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

  // 📦 Get Cart Items
  const fetchCart = async () => {
    try {
      const res = await getAxiosAuth().get("/cart/getitems");
      if (res.data.success) {
        setCartItems(res.data.cart.items);
      }
    } catch (err) {
      console.error("Fetching cart failed:", err.message);
    }
  };

  // 🔁 Update Quantity
  const updateQuantity = async (productId, quantity) => {
    try {
      const res = await getAxiosAuth().put(`/cart/update/${productId}`, {
        quantity,
      });
      if (res.data.success) {
        setCartItems(res.data.cart.items);
      }
    } catch (err) {
      console.error("Updating quantity failed:", err.message);
    }
  };

  // ❌ Remove Item from Cart
  const removeFromCart = async (productId) => {
    try {
      const res = await getAxiosAuth().delete(`/cart/remove/${productId}`);
      if (res.data.success) {
        setCartItems(res.data.cart.items);
      }
    } catch (err) {
      console.error("Remove from cart failed:", err.message);
    }
  };
  const removeAll = async () => {
    try {
      const res = await getAxiosAuth().delete("/cart/clear"); // You'll need a backend route for clearing cart
      if (res.data.success) {
        setCartItems([]);
      }
    } catch (err) {
      console.error("Remove all from cart failed:", err.message);
    }
  };
  // ✅ Setup Auth and Cart on Mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const storedToken = localStorage.getItem("token");
      if (storedToken) {
        setToken(storedToken);
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
        setCartItems([]);
      }
    }
  }, []);

  // 🎯 Fetch cart when token is set
  useEffect(() => {
    if (token) {
      fetchCart();
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
        selectedGender,
        setSelectedGender,
        removeAll,
        pricing,
        setPricing,
        token,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalState;
