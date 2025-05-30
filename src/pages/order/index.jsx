import { useState, useContext } from "react";
import { GlobalContext } from "../../context/index"; // Your global context with cart
import axios from "axios";
import "./index.css";
import Payment from "../../component/payment";
import { Link } from "react-router-dom";

function OrderPage() {
  const { cartItems, pricing, token } = useContext(GlobalContext); // get token if you use auth
  const [shippingAddress, setShippingAddress] = useState({
    street: "",
    city: "",
    state: "",
    country: "",
    postalCode: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setShippingAddress({
      ...shippingAddress,
      [e.target.name]: e.target.value,
    });
  };

  const placeOrder = async () => {
    if (
      !shippingAddress.street ||
      !shippingAddress.city ||
      !shippingAddress.state ||
      !shippingAddress.country ||
      !shippingAddress.postalCode
    ) {
      setMessage("Please fill in all shipping address fields.");
      return;
    }

    try {
      setLoading(true);
      setMessage("");

      // API call to backend to place order
      const response = await axios.post(
        "https://e-commerce-backeend.onrender.com/api/order/placeorder", // Adjust your backend route here
        { shippingAddress },
        {
          headers: {
            Authorization: `Bearer ${token}`, // if your backend uses JWT auth
          },
        }
      );

      if (response.data.success) {
        setMessage("Order placed successfully!");
        // Optionally clear cart or redirect user
      } else {
        setMessage("Failed to place order. Please try again.");
      }
    } catch (error) {
      setMessage("Error: " + error.response?.data?.message || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="addressContainer">
      <div className="order-form">
        <h2>Shipping Address</h2>
        <input
          name="street"
          value={shippingAddress.street}
          onChange={handleChange}
          placeholder="Street"
        />
        <input
          name="city"
          value={shippingAddress.city}
          onChange={handleChange}
          placeholder="City"
        />
        <input
          name="state"
          value={shippingAddress.state}
          onChange={handleChange}
          placeholder="State"
        />
        <input
          name="country"
          value={shippingAddress.country}
          onChange={handleChange}
          placeholder="Country"
        />
        <input
          name="postalCode"
          value={shippingAddress.postalCode}
          onChange={handleChange}
          placeholder="Postal Code"
        />
      </div>
      <div className="paymentInfo">
        <Payment />
        <Link to={"/payment"}>
          <button onClick={placeOrder} disabled={loading}>
            {loading ? "Placing Order..." : "Place Order"}
          </button>
        </Link>

        {message && <p>{message}</p>}
      </div>
    </div>
  );
}

export default OrderPage;
