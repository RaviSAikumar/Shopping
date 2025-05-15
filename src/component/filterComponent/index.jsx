import "./index.css";
import { useState, useContext } from "react";
import { GlobalContext } from "../../context";

function FilterComponent() {
  const { selectedGender, setSelectedGender } = useContext(GlobalContext);
  const [isOpen, setIsOpen] = useState(false);

  const handleGenderChange = (e) => {
    setSelectedGender(e.target.value);
    setIsOpen(false); // close dropdown on select
  };

  return (
    <div>
      <div className="filter-container">
        <h1 className="filterHeading">Filter</h1>
        <div>
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
              <li>Price Range</li>
              <li>Brand</li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
}

export default FilterComponent;
