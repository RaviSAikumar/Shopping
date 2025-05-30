import "./App.css";
import NavMenu from "./component/navbar/navbar";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home";
import Products from "./pages/product";
import CartPage from "./pages/cart";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import Footer from "./component/footer";
import MenPage from "./pages/men";
import WomenPage from "./pages/Women";
import OrderPage from "./pages/order";
import ProductDetails from "./component/productDetails";
import PaymentPage from "./pages/PaymentPage";
function App() {
  return (
    <div className="App">
      <NavMenu />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/men" element={<MenPage />} />
        <Route path="/women" element={<WomenPage />} />

        <Route path="/register" element={<RegisterPage />} />
        <Route path="/order" element={<OrderPage />} />
        <Route path="/product/:id" element={<ProductDetails />} />
        <Route path="/payment" element={<PaymentPage />} />

        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
