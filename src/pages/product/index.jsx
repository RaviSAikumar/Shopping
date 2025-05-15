import { useState, useEffect, useContext } from "react";
import ProductItem from "../../component/productItem";
import "./index.css";
import { GlobalContext } from "../../context/index";
import { Link } from "react-router-dom";
import FilterComponent from "../../component/filterComponent";

function Products() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  // const { cartItems, addToCart, isAuthenticated } = useContext(GlobalContext);

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

  useEffect(() => {
    fetchProducts();
  }, []);

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="product-container">
      <div className="filter-container">
        <FilterComponent />
      </div>
      <div className="product-list">
        {products.map((product) => (
          <div key={product._id}>
            <ProductItem product={product} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Products;
