import "./navbar.css";
import { useContext, useEffect, useState } from "react";
import { GlobalContext } from "../../context";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";

function NavMenu() {
  const { cartItems, isAuthenticated, setIsAuthenticated } =
    useContext(GlobalContext);
  const [cartCount, setCartCount] = useState(0);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    navigate("/login"); // Redirect to login after logout
  };

  useEffect(() => {
    const count = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    setCartCount(count);
  }, [cartItems]);

  return (
    <nav className="navmenu-link">
      <h2 className="logo">
        <Link to="/" style={{ color: "white", textDecoration: "none" }}>
          Logo
        </Link>
      </h2>

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
          <Link className="nav-link" to="/">
            Home
          </Link>
        </li>
        <li>
          <Link className="nav-link" to="/products">
            Product
          </Link>
        </li>
        <li>
          <Link className="nav-link" to="/men">
            Men
          </Link>
        </li>
        <li>
          <Link className="nav-link" to="/women">
            Women
          </Link>
        </li>
        <li>
          <Link className="cart-link nav-link" to="/cart">
            <FontAwesomeIcon icon={faShoppingCart} size="lg" color="#fff" />
            <span className="cart-quantity">{cartCount}</span>
          </Link>
        </li>
        <li>
          <Link className="nav-link" to="/profile">
            Profile
          </Link>
        </li>
        {isAuthenticated ? (
          <li onClick={handleLogout} style={{ cursor: "pointer" }}>
            <span className="nav-link">Logout</span>
          </li>
        ) : (
          <li>
            <Link className="nav-link" to="/login">
              Login
            </Link>
          </li>
        )}
      </ul>
    </nav>
  );
}

export default NavMenu;
