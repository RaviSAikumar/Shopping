import "./index.css";
import ProductItem from "../../component/productItem";
import { useState, useContext, useEffect } from "react";
import axios from "axios";
import FilterComponent from "../../component/filterComponent";
import { GlobalContext } from "../../context/index";
function MenPage() {
  const [data, setData] = useState([]);
  const { setAllProducts, filteredProducts, setFilteredProducts } =
    useContext(GlobalContext);

  const fetchMenData = async () => {
    try {
      const response = await axios.get(
        "https://e-commerce-backeend.onrender.com/api/products/gender?gender=Men"
      );
      const products = response.data; // axios response data is in response.data directly
      console.log(products);
      if (products) {
        setData(products); // <--- update local state here
        setAllProducts(data);
        setFilteredProducts(data);
      }
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

export default MenPage;
