import { createContext, useEffect, useState } from "react";
import axios from "axios";

export const GlobalContext = createContext();

function GlobalState({ children }) {
  const [user, setUser] = useState({});
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
  const [allProducts, setAllProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);

  const [brandOptions, setBrandOptions] = useState({});

  const filterProducts = (brandOptions) => {
    const selectedBrands = Object.keys(brandOptions).filter(
      (brand) => brandOptions[brand]
    );

    if (selectedBrands.length === 0) {
      setFilteredProducts(allProducts);
    } else {
      const filtered = allProducts.filter(
        (product) =>
          product.brand &&
          product.brand.name &&
          selectedBrands.includes(product.brand.name)
      );

      setFilteredProducts(filtered);
    }
  };

  const handleBrandToggle = (brand) => {
    const updated = {
      ...brandOptions,
      [brand]: !brandOptions[brand],
    };
    setBrandOptions(updated);
    filterProducts(updated);
  };

  //update prodcut quantity after adding to the cart quantity should reduce and if removed from the cart quantity should will add back

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
    const storedToken = localStorage.getItem("token");
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedToken) {
      setToken(storedToken);
      setUser(storedUser);
      setIsAuthenticated(true);
    } else {
      setToken(null);
      setUser(null);
      setIsAuthenticated(false);
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
        brandOptions,
        setBrandOptions,
        allProducts,
        setAllProducts,
        filteredProducts,
        setFilteredProducts,
        handleBrandToggle,
        filterProducts,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalState;
