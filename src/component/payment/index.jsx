import { useContext, useState, useEffect } from "react";
import { GlobalContext } from "../../context/index";
import "./index.css";
function Payment() {
  const { cartItems, pricing, setPricing } = useContext(GlobalContext);

  useEffect(() => {
    let sum = 0;
    let discount = 0;
    let totalAmount = 0;
    let shippingCharges = 0;
    let platform = 10;

    for (let i = 0; i < cartItems.length; i++) {
      sum += Number(cartItems[i].product.price) * Number(cartItems[i].quantity);
    }

    if (sum > 1500) {
      shippingCharges = "Free";
    } else {
      shippingCharges = 10;
    }

    if (sum > 3000) {
      discount = (sum * 0.2).toFixed(2);
    } else if (sum > 2000) {
      discount = (sum * 0.15).toFixed(2);
    } else if (sum > 1500) {
      discount = (sum * 0.1).toFixed(2);
    } else {
      discount = 0;
    }

    if (shippingCharges === "Free") {
      totalAmount = (sum - discount + platform).toFixed(2);
    } else {
      totalAmount = (sum - discount + shippingCharges + platform).toFixed(2);
    }

    setPricing({
      totalPrice: sum.toFixed(2),
      discount: discount,
      totalAmount: totalAmount,
      charges: platform,
      shipingPrice: shippingCharges,
    });
  }, [cartItems]);

  return (
    <div className="payment-container">
      <h4>Price details ({cartItems.length})</h4>
      <div className="payment-detail-container">
        <div className="price-details">
          <p>Total MRP</p>
          <span>${pricing.totalPrice}</span>
        </div>
        <div className="price-details">
          <p>Discount on MRP</p>
          <span style={{ color: "#03a685" }}>-${pricing.discount}</span>
        </div>
        <div className="price-details">
          <p>Platform Charges</p>
          <span style={{ color: "#ff3f6c" }}>${pricing.charges}</span>
        </div>
        <div className="price-details">
          <p>Shiping Charges</p>
          {pricing.shipingPrice === "Free" ? (
            <span style={{ color: "#03a685" }}>Free</span>
          ) : (
            <span style={{ color: "#ff3f6c" }}>${pricing.shipingPrice}</span>
          )}
        </div>
        <hr style={{ marginTop: "15px", height: "1px", color: "#D3D3D3" }} />
        <div className="price-details">
          <p>Total Amount</p>
          <span>${pricing.totalAmount}</span>
        </div>
      </div>
    </div>
  );
}

export default Payment;
