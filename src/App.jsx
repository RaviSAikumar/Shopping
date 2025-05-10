import "./App.css";
import NavMenu from "./component/navbar/navbar";
import { Route, Routes } from "react-router-dom";
import HomePage from "./pages/home";
import Products from "./pages/product";
import CartPage from "./pages/cart";
import LoginPage from "./pages/login";
import RegisterPage from "./pages/register";
import Footer from "./component/footer";
function App() {
  return (
    <div className="App">
      <NavMenu />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/cart" element={<CartPage />} />
        <Route path="/login" element={<LoginPage />} />

        <Route path="/register" element={<RegisterPage />} />

        <Route path="*" element={<div>Page Not Found</div>} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
