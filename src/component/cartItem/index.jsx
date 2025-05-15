import "./index.css";
import { useContext } from "react";
import { GlobalContext } from "../../context/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";

function CartItem({ cart }) {
  const { updateQuantity, removeFromCart } = useContext(GlobalContext);

  const handleQuantity = (type) => {
    const newQty = type === "inc" ? cart.quantity + 1 : cart.quantity - 1;
    if (newQty >= 1) {
      updateQuantity(cart.product._id, newQty);
    }
  };

  const handleRemove = () => {
    removeFromCart(cart.product._id);
  };

  return (
    <div className="cart-item">
      <div>
        <img
          src={cart.product.image}
          alt={cart.product.title}
          className="cart-image"
        />
      </div>

      <div className="cart-details">
        <h4 className="cart-title">{cart.product.title}</h4>
        <p className="cart-price">${cart.product.price}</p>
        <div className="item-quantity">
          <button onClick={() => handleQuantity("inc")} className="qty-btn">
            <i className="fas fa-plus"></i>
          </button>
          <h4>Qty : {cart.quantity}</h4>
          <button onClick={() => handleQuantity("dec")} className="qty-btn">
            <i className="fas fa-minus"></i>
          </button>
        </div>
      </div>

      <div className="close-button-container">
        <button className="close-button" onClick={handleRemove}>
          <FontAwesomeIcon icon={faTimes} />
        </button>
      </div>
    </div>
  );
}

export default CartItem;
