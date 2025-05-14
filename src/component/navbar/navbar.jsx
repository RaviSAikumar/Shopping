import "./navbar.css";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context/index";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

function NavMenu() {
  const { addToCart, isAuthenticated, setIsAuthenticated } =
    useContext(GlobalContext);
  const [cartCount, setCartCount] = useState(0);

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
  };

  useEffect(() => {
    const count = addToCart.reduce((acc, item) => acc + item.quantity, 0);
    setCartCount(count);
  }, [addToCart]);

  return (
    <nav>
      <h2 className="logo">Logo</h2>

      <form className="searchForm">
        <input
          className="SearchBar"
          type="search"
          placeholder="Search products..."
        />
        <button type="submit" className="SearchButton">
          Search
        </button>
      </form>

      <ul>
        <li>
          <a className="nav-link" href="/">
            Home
          </a>
        </li>
        <li>
          <a className="nav-link" href="/products">
            Product
          </a>
        </li>
        <li>
          <a className="nav-link" href="/men">
            Men
          </a>
        </li>
        <li>
          <a className="nav-link" href="/women">
            Women
          </a>
        </li>
        <li>
          <a className="cart-link nav-link" href="/cart">
            <FontAwesomeIcon icon={faShoppingCart} size="lg" color="#fff" />{" "}
            <span className="cart-quantity">{cartCount}</span>
          </a>
        </li>
        {isAuthenticated ? (
          <li onClick={handleLogout} style={{ cursor: "pointer" }}>
            <a href="/">Logout</a>
          </li>
        ) : (
          <li>
            <a href="/login">Login</a>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default NavMenu;
