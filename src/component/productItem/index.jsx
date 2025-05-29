import "./index.css";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";

import { GlobalContext } from "../../context/index";
function ProductItem({ product }) {
  const { addToCart, isAuthenticated } = useContext(GlobalContext);
  const [showToast, setShowToast] = useState(false);
  const [lastAddedProduct, setLastAddedProduct] = useState(null);

  const addToCartHandler = async (product) => {
    try {
      await addToCart(product._id, 1);
      setLastAddedProduct(product);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 2000);
    } catch (error) {
      console.error("Add to cart failed:", error.message);
    }
  };
  return (
    <div className="product-item">
      <div>
        <img className="product-image" src={product.image} alt={product.name} />
      </div>
      <div>
        <div className="product-details">
          {/* <p>{product._id}</p> */}
          <p className="product-title">{product.name}</p>
          <p className="product-price">${product.price}</p>
        </div>
        <Link to={`/product/${product._id}`}>
          <button className="viewDetailsButton">View Details</button>
        </Link>

        {isAuthenticated ? (
          <button
            className="buy-button"
            onClick={() => addToCartHandler(product)}
          >
            Add to cart
          </button>
        ) : (
          <Link to={"/login"}>
            <button className="buy-button">Add to cart</button>
          </Link>
        )}
      </div>

      {showToast && lastAddedProduct && (
        <div className="toast-message">
          <img
            src={lastAddedProduct.image}
            alt="added"
            className="toast-icon"
          />
          <span>Item added to bag successfully!</span>
          <Link
            to="/cart"
            style={{
              backgroundColor: "#4caf50",
              padding: "0px 3px",
              color: "#fff",
              borderRadius: "5px",
              fontSize: "15px",
            }}
          >
            View Bag
          </Link>
        </div>
      )}
    </div>
  );
}

export default ProductItem;
