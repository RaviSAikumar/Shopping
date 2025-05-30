import "./index.css";
import { useState, useContext } from "react";
import { GlobalContext } from "../../context";

function FilterComponent() {
  const {
    selectedGender,
    setSelectedGender,
    selectedMaxPrice,
    setSelectedMaxPrice,
  } = useContext(GlobalContext);

  const [isOpen, setIsOpen] = useState(false);
  const [maxPrice, setMaxPrice] = useState(10000);

  const handleGenderChange = (e) => {
    setSelectedGender(e.target.value);
    setIsOpen(false);
  };

  const handlePriceChange = (e) => {
    const newMax = Number(e.target.value);
    setMaxPrice(newMax);
    setSelectedMaxPrice(newMax);
  };

  return (
    <div>
      <div className="filter-container">
        <h1 className="filterHeading">Filter</h1>
        <nav className="fillter-nav">
          <ul>
            <li
              onClick={() => setIsOpen((prev) => !prev)}
              style={{ cursor: "pointer", position: "relative" }}
            >
              Gender ▾
              {isOpen && (
                <div className="gender-options">
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="men"
                      checked={selectedGender === "men"}
                      onChange={handleGenderChange}
                    />
                    Men
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="gender"
                      value="women"
                      checked={selectedGender === "women"}
                      onChange={handleGenderChange}
                    />
                    Women
                  </label>
                </div>
              )}
            </li>

            <li>Categories</li>

            <li>
              <div className="price-range-container">
                <p>PRICE</p>
                <input
                  type="range"
                  min="0"
                  max="10000"
                  step="100"
                  value={maxPrice}
                  onChange={handlePriceChange}
                  className="single-slider"
                />
                <div className="price-values">Up to ₹{maxPrice}</div>
              </div>
            </li>

            <li>Brand</li>
          </ul>
        </nav>
      </div>
    </div>
  );
}

export default FilterComponent;
