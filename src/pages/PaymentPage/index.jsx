import Payment from "../../component/payment";
import "./index.css";

function PaymentPage() {
  return (
    <div className="paymentContainer">
      <div>
        <Payment />
      </div>
      <div>
        <button className="paymentBtn">Proceed to Pay</button>
      </div>
    </div>
  );
}

export default PaymentPage;
