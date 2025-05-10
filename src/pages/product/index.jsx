import { useState, useEffect, useContext } from "react";
import ProductItem from "../../component/productItem";
import "./index.css";
import { GlobalContext } from "../../context/index";
import { Link } from "react-router-dom";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const { addToCart, setAddToCart } = useContext(GlobalContext);
  const [showToast, setShowToast] = useState(false);
  const [lastAddedProduct, setLastAddedProduct] = useState(null);

  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch("https://fakestoreapi.com/products");
      const data = await response.json();
      if (data) setProducts(data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching products:", error);
      setLoading(false);
    }
  };

  const addToCartHandler = (product) => {
    const existingItem = addToCart.find((item) => item.id === product.id);
    if (existingItem) {
      const updatedCart = addToCart.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
      setAddToCart(updatedCart);
    } else {
      setAddToCart([...addToCart, { ...product, quantity: 1 }]);
    }

    // Show toast with this product's image
    setLastAddedProduct(product);
    setShowToast(true);
    setTimeout(() => {
      setShowToast(false);
    }, 2000);
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="product-container">
      {products.map((product) => (
        <div key={product.id}>
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
            style={{
              backgroundColor: "#4caf50",
              padding: "0px 3px",
              color: "#fff",
              borderRadius: "5px",
              fontSize: "15px",
            }}
            to={"/cart"}
          >
            view bag
          </Link>
        </div>
      )}
    </div>
  );
}

export default Products;
