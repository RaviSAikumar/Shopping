import "./navbar.css";
import { useContext, useEffect } from "react";
import { GlobalContext } from "../../context/index";
import { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";

function NavMenu() {
  const { addToCart } = useContext(GlobalContext);
  const [cartCount, setCartCount] = useState(0);

  useEffect(() => {
    var count = 0;
    for (let i = 0; i < addToCart.length; i++) {
      count += Number(addToCart[i].quantity);
    }
    setCartCount(count);
  }, [addToCart]);

  function handleSubmit(e) {
    e.preventDefault();
  }
  return (
    <nav>
      <h2 className="logo">Logo</h2>

      <form className="searchForm" onSubmit={handleSubmit}>
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
          <a className="nav-link" href="/">
            Products
          </a>
        </li>
        <li>
          <a className="nav-link" href="/products">
            Men
          </a>
        </li>
        <li>
          <a className="nav-link" href="/products">
            Women
          </a>
        </li>
        <li>
          <a className="cart-link nav-link" href="/cart">
            <FontAwesomeIcon icon={faShoppingCart} size="lg" color="#fff" />{" "}
            <span className="cart-quantity">{cartCount}</span>
          </a>
        </li>
        <li>
          <a className="nav-link" href="/login">
            Login
          </a>
        </li>
      </ul>
    </nav>
  );
}

export default NavMenu;
