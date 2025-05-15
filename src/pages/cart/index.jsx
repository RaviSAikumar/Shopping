import { useContext } from "react";
import { Link } from "react-router-dom";
import { GlobalContext } from "../../context/index";
import CartItem from "../../component/cartItem";
import Payment from "../../component/payment";

import "./index.css";

function CartPage() {
  const { cartItems, setCartItems } = useContext(GlobalContext);

  const removeAll = () => {
    localStorage.removeItem("cartItems");
    setCartItems([]);
  };

  return (
    <div>
      {cartItems.length === 0 ? (
        <div className="empty-cart">
          <div className="empty-cart-content">
            <img src="\images\image.png" alt="empty cart" />
            <p>Please add some products to your cart to see them here. </p>
            <Link to="/products">
              <button className="go-to-shop-button">Go to Shop</button>
            </Link>
          </div>
        </div>
      ) : (
        <div className="cart-container">
          <div className="cart-items">
            <div className="cart-header">
              <div>Total items: {cartItems.length}</div>
              <div>
                <button onClick={removeAll}>Remove</button>
              </div>
            </div>
            {cartItems.map((item) => {
              return <div key={item.id}>{<CartItem cart={item} />}</div>;
            })}
          </div>
          <div className="payment">
            <div>
              <h2>Payment</h2>
              <Payment />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default CartPage;
