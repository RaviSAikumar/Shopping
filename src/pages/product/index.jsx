import { useState, useEffect, useContext } from "react";
import ProductItem from "../../component/productItem";
import "./index.css";
import { GlobalContext } from "../../context/index";
import { Link } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { cartItems, addToCart, isAuthenticated } = useContext(GlobalContext);

  const [showToast, setShowToast] = useState(false);
  const [lastAddedProduct, setLastAddedProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch("http://localhost:5000/api/products/all");
      const data = await response.json();
      if (data) setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

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

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="product-container">
      {products.map((product) => (
        <div key={product._id}>
          <ProductItem product={product} />
          <button
            className="buy-button"
            onClick={() => addToCartHandler(product)}
          >
            Add to cart
          </button>
        </div>
      ))}

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

export default Products;
