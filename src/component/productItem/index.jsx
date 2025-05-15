import "./index.css";
import { useState } from "react";
function ProductItem({ product }) {
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
        {/* <button className="buy-button" onClick={handleClick}>
          Add to cart
        </button> */}
      </div>
    </div>
  );
}

export default ProductItem;
