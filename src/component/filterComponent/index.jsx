import { useEffect, useContext } from "react";
import axios from "axios";
import "./index.css";
import { GlobalContext } from "../../context";

function FilterComponent() {
  const { brandOptions, setBrandOptions, handleBrandToggle } =
    useContext(GlobalContext);

  const fetchBrands = async () => {
    try {
      const res = await axios.get(`http://localhost:5000/api/brands/allbrands`);
      const brandsArray = res.data;

      const brandMap = {};
      // const brandMapfilter = {};
      brandsArray.forEach((brand) => {
        brandMap[brand.name] = false;
        // brandMapfilter[brand._id] = brand.name;
      });

      // setFilters((prev) => ({ ...prev, brands: brandMapfilter }));
      setBrandOptions(brandMap);
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    fetchBrands();
  }, []);
  // console.log(brandOptions);

  return (
    <div className="filter-container">
      <h2>Filters</h2>
      {/* <select name="gender">
        <option value="">All Genders</option>
        <option value="men">Men</option>
        <option value="women">Women</option>
      </select> */}

      <div className="BrandContainer">
        <p className="BrandHeading">Brands</p>
        {Object.keys(brandOptions).length > 0 ? (
          Object.keys(brandOptions).map((brand, index) => (
            <div className="BrandItem" key={index}>
              <input
                className="BrandInput"
                type="checkbox"
                id={`brand-${index}`}
                name="brands"
                checked={brandOptions[brand]}
                onChange={() => handleBrandToggle(brand)}
              />
              <label htmlFor={`brand-${index}`}>{brand}</label>
            </div>
          ))
        ) : (
          <p>Loading brands...</p>
        )}
      </div>

      {/* <select name="category">
        <option value="">All Categories</option>
        <option value="saree">Sarees</option>
        <option value="shirt">Shirts</option>
        <option value="t-shirt">T-Shirts</option>
        <option value="pant">Pants</option>
      </select> */}

      {/* <input type="number" name="min" placeholder="Min Price" />
      <input type="number" name="max" placeholder="Max Price" /> */}
    </div>
  );
}

export default FilterComponent;
