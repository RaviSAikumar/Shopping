import "./index.css";
import ProductItem from "../../component/productItem";
import { useState, useEffect } from "react";
import axios from "axios";

function WomenPage() {
  const [data, setData] = useState([]);

  const fetchMenData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/products/gender?gender=Women"
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
    <div className="women-page">
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
