import "./index.css";
import ProductItem from "../../component/productItem";
import { useState, useEffect } from "react";
import axios from "axios";
import FilterComponent from "../../component/filterComponent";

function WomenPage() {
  const [data, setData] = useState([]);

  const fetchMenData = async () => {
    try {
      const response = await axios.get(
        "https://e-commerce-backeend.onrender.com/api/products/gender?gender=Women"
      );
      const products = response.data;

      setData(products);
    } catch (e) {
      console.log("Error fetching men products:", e.message);
    }
  };

  useEffect(() => {
    fetchMenData();
  }, []);

  return (
    <div className="product-container">
      <div className="filter-container">
        <FilterComponent />
      </div>
      <div className="product-list">
        {data.length > 0 ? (
          data.map((product) => (
            <ProductItem key={product._id} product={product} />
          ))
        ) : (
          <p>No products found.</p>
        )}
      </div>
    </div>
  );
}

export default WomenPage;
