import "./index.css";
import { useEffect, useState } from "react";

const menImages = [
  "/images/highlights/men-highlight1.jpg",
  "/images/highlights/men-highlight2.jpg",
  "/images/highlights/men-highlight3.jpg",
];

const womenImages = [
  "/images/highlights/women1.jpg",
  "/images/highlights/women2.jpg",
  "/images/highlights/women3.jpg",
];

function Highlights() {
  const minLength = Math.min(menImages.length, womenImages.length);
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % minLength);
    }, 3000); // 3 seconds for smoother transition
    return () => clearInterval(interval);
  }, [minLength]);

  return (
    <section className="featured-products">
      <h1 className="section-title">Featured Products</h1>
      <p className="section-subtitle">
        Discover our most loved items handpicked just for you.
      </p>

      <div className="Featured-product-wrapper">
        {/* Men's Image Slider */}
        <div className="men-featured-wrapper">
          <div className="slider-container slider-container1">
            <img
              src={menImages[currentIndex]}
              alt="Men's Highlight"
              className="slider-image"
            />
          </div>
        </div>

        {/* Style Text Center */}
        <div className="styleWarpper">
          {["Style", "Fashion", "Elegance", "Beauty", "Unique"].map((text) => (
            <p key={text} className="styleText">
              {text}
            </p>
          ))}
        </div>

        {/* Women's Image Slider */}
        <div className="women-featured-wrapper">
          <div className="slider-container slider-container2">
            <img
              src={womenImages[currentIndex]}
              alt="Women's Highlight"
              className="slider-image"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

export default Highlights;
