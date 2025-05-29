import { useEffect, useState, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import "./index.css";
import { GlobalContext } from "../../context";

const ProductDetails = () => {
  const { isAuthenticated, addToCart } = useContext(GlobalContext);
  const { id } = useParams();

  const [product, setProduct] = useState(null);
  const [mainImage, setMainImage] = useState("");
  const [showToast, setShowToast] = useState(false);
  const [lastAddedProduct, setLastAddedProduct] = useState(null);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch(
          `https://e-commerce-backeend.onrender.com/api/products/single/${id}`
        );
        const data = await res.json();
        setProduct(data);
        setMainImage(data.image);
      } catch (error) {
        console.error("Failed to fetch product:", error);
      }
    };
    fetchProduct();
  }, [id]);

  const handleAddToCart = async () => {
    try {
      await addToCart(product._id, 1);
      setLastAddedProduct(product);
      setShowToast(true);
      setTimeout(() => setShowToast(false), 1000);
    } catch (error) {
      console.error("Add to cart failed:", error.message);
    }
  };
  useEffect(() => {
    handleAddToCart;
  }, []);

  if (!product) return <p>Loading...</p>;

  const {
    name,
    description,
    price,
    stock,
    image,
    subImages = [],
    gender,
  } = product;

  return (
    <div className="product-page-container">
      <div className="product-page">
        {/* Image section */}
        <div className="image-section">
          <div className="thumbnail-list">
            {[image, ...subImages].map((img, i) => (
              <img
                key={i}
                src={img}
                alt="thumb"
                onClick={() => setMainImage(img)}
                className={`thumbnail ${mainImage === img ? "active" : ""}`}
              />
            ))}
          </div>
          <div className="main-image">
            <img src={mainImage} alt="Main product" />
          </div>
        </div>

        {/* Info section */}
        <div className="info-section">
          <h2 className="title">{name}</h2>
          <p className="gender">Category: {gender}</p>
          <p className="description">{description}</p>
          <p className="price">₹{price}</p>
          <p className="stock">In stock: {stock}</p>

          {stock > 0 ? (
            isAuthenticated ? (
              <button className="btn add-to-cart" onClick={handleAddToCart}>
                Add to Cart
              </button>
            ) : (
              <Link to="/login">
                <button className="btn add-to-cart">Add to Cart</button>
              </Link>
            )
          ) : (
            <button className="btn add-to-cart" disabled>
              Out of Stock
            </button>
          )}

          <button className="btn buy-now" disabled={stock === 0}>
            Buy Now
          </button>
        </div>
      </div>

      {showToast && lastAddedProduct && (
        <div className="toast-message">
          <img
            src={lastAddedProduct.image}
            alt="added"
            className="toast-icon"
          />
          <span>Item added to bag successfully!</span>
          <Link
            to="/cart"
            style={{
              backgroundColor: "#4caf50",
              padding: "0px 3px",
              color: "#fff",
              borderRadius: "5px",
              fontSize: "15px",
            }}
          >
            View Bag
          </Link>
        </div>
      )}
    </div>
  );
};

export default ProductDetails;
