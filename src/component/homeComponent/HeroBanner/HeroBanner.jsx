import "./HeroBanner.css";
import { Link } from "react-router-dom";
function HeroBanner() {
  return (
    <div className="Hero">
      <div className="heroImageContainer">
        <div className="heroBannerContent">
          <h1 className="hero-title">Discover Timeless Elegance</h1>
          <p className="hero-subtitle">
            Explore our new collection of handcrafted fashion and accessories
            that redefine luxury.
          </p>
          <Link to="/products">
            <button className="hero-btn">Shop the Collection</button>
          </Link>
        </div>

        <img
          className="heroImage "
          src="/images/home/hero/hero-image2.jpg"
          alt=""
        />
      </div>

      {/* <a href="/products">Shop here</a> */}
    </div>
  );
}

export default HeroBanner;
