import "./index.css";
import { useContext } from "react";
import { GlobalContext } from "../../context/index";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

function CartItem({ cart }) {
  const { addToCart, setAddToCart } = useContext(GlobalContext);

  const removeFromCart = (id) => {
    const updatedCart = addToCart.filter((item) => item.id !== id);
    setAddToCart(updatedCart);
  };

  const handleQuantity = (type) => {
    const updatedCart = addToCart.map((item) => {
      if (item.id === cart.id) {
        const newQty = type === "inc" ? item.quantity + 1 : item.quantity - 1;
        return { ...item, quantity: newQty > 1 ? newQty : 1 };
      }
      return item;
    });
    setAddToCart(updatedCart);
  };

  return (
    <div>
      <div className="cart-item">
        <div>
          <img src={cart.image} alt={cart.title} className="cart-image" />
        </div>

        <div className="cart-details">
          <h4 className="cart-title">{cart.title}</h4>
          <p className="cart-price">${cart.price}</p>
          <p className="item-quantity">
            <button onClick={() => handleQuantity("inc")} className="qty-btn">
              <i className="fas fa-plus"></i>
            </button>
            <h4>Qty : {cart.quantity}</h4>
            <button onClick={() => handleQuantity("dec")} className="qty-btn">
              <i className="fas fa-minus"></i>
            </button>
          </p>
        </div>
        <div className="close-button-container">
          <button
            className="close-button"
            onClick={() => removeFromCart(cart.id)}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartItem;
