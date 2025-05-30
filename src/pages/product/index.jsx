import { useState, useEffect, useContext } from "react";
import ProductItem from "../../component/productItem";
import "./index.css";
import { GlobalContext } from "../../context/index";
import FilterComponent from "../../component/filterComponent";

function Products() {
  const {
    setAllProducts,
    allProducts,
    filteredProducts,
    setFilteredProducts,
    brandOptions,
  } = useContext(GlobalContext);

  const [loading, setLoading] = useState(true);

  // Fetch products from API and store in context
  const fetchProducts = async () => {
    try {
      setLoading(true);
      const response = await fetch(
        "https://e-commerce-backeend.onrender.com/api/products/all"
      );
      const data = await response.json();

      if (data) {
        setAllProducts(data); // Store all products in context
        setFilteredProducts(data); // Initially, filtered = all
      }
      console.log(filteredProducts);

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
        {filteredProducts.length > 0 ? (
          filteredProducts.map((product) => (
            <div key={product._id}>
              <ProductItem product={product} />
            </div>
          ))
        ) : (
          <div className="no-products">No products found</div>
        )}
      </div>
    </div>
  );
}

export default Products;
