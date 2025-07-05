import React, { useState } from "react";

const paymentMethods = [
  { key: "card", label: "Credit/Debit Card" },
  { key: "upi", label: "UPI" },
  { key: "netbanking", label: "Netbanking" },
  { key: "wallet", label: "Wallet" },
  { key: "cod", label: "Cash on Delivery" },
];

export default function Checkout({ cart, onPlaceOrder, loading }) {
  // Stepper state
  const [step, setStep] = useState(1);
  // Address
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [addressError, setAddressError] = useState("");
  // Payment
  const [paymentTab, setPaymentTab] = useState("card");
  const [cardDetails, setCardDetails] = useState({
    cardholder: "",
    card: "",
    expiry: "",
    cvc: "",
  });
  const [upiId, setUpiId] = useState("");
  const [wallet, setWallet] = useState("");
  const [netbanking, setNetbanking] = useState("");
  const [paymentError, setPaymentError] = useState("");
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  // Stepper navigation
  function goToStep(n) {
    setStep(n);
  }

  // Address validation
  function handleAddressNext(e) {
    e.preventDefault();
    if (!name.trim() || !address.trim()) {
      setAddressError("Please fill in all address fields.");
      return;
    }
    setAddressError("");
    setStep(2);
  }

  // Payment validation
  function handlePaymentNext(e) {
    e.preventDefault();
    if (paymentTab === "card") {
      if (
        !cardDetails.cardholder.trim() ||
        !/^\d{16}$/.test(cardDetails.card.replace(/\s/g, "")) ||
        !/^\d{2}\/\d{2}$/.test(cardDetails.expiry) ||
        !/^\d{3,4}$/.test(cardDetails.cvc)
      ) {
        setPaymentError("Please enter valid card details.");
        return;
      }
    } else if (paymentTab === "upi") {
      if (!upiId.trim() || !/^[\w.-]+@[\w.-]+$/.test(upiId)) {
        setPaymentError("Please enter a valid UPI ID.");
        return;
      }
    } else if (paymentTab === "wallet") {
      if (!wallet.trim()) {
        setPaymentError("Please select a wallet.");
        return;
      }
    } else if (paymentTab === "netbanking") {
      if (!netbanking.trim()) {
        setPaymentError("Please select a bank.");
        return;
      }
    }
    setPaymentError("");
    setStep(4);
    setTimeout(() => {
      onPlaceOrder({ name, address, cart, paymentTab });
    }, 1500);
  }

  // Accordion/stepper UI
  return (
    <div className="min-h-screen bg-white flex flex-col md:flex-row items-start justify-center p-4">
      {/* Main Steps */}
      <div className="w-full max-w-xl bg-white rounded-2xl shadow-xl p-6 mb-8 md:mb-0 md:mr-8">
        {/* Stepper */}
        <div className="flex items-center justify-between mb-8">
          {["Address", "Order Summary", "Payment", "Confirmation"].map(
            (label, idx) => (
              <div key={label} className="flex-1 flex flex-col items-center">
                <div
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-white ${
                    step === idx + 1 ? "bg-gray-700" : "bg-gray-300"
                  }`}
                >
                  {idx + 1}
                </div>
                <span
                  className={`text-xs mt-2 ${
                    step === idx + 1
                      ? "text-gray-700 font-semibold"
                      : "text-gray-500"
                  }`}
                >
                  {label}
                </span>
                {idx < 3 && (
                  <div className="w-full h-1 bg-gray-200 mt-2 mb-2" />
                )}
              </div>
            )
          )}
        </div>

        {/* Step 1: Address */}
        <div
          className={`transition-all duration-300 ${
            step === 1 ? "block" : "hidden"
          }`}
        >
          <h2 className="text-xl font-bold mb-4">Delivery Address</h2>
          <form onSubmit={handleAddressNext} className="space-y-4">
            <input
              type="text"
              placeholder="Full Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-400"
              required
              disabled={loading}
            />
            <textarea
              placeholder="Address"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="w-full px-4 py-3 border border-gray-200 rounded-lg focus:ring-2 focus:ring-gray-400 min-h-[80px]"
              required
              disabled={loading}
            />
            {addressError && (
              <div className="text-red-600 text-sm">{addressError}</div>
            )}
            <button
              type="submit"
              className="w-full bg-gray-700 text-white py-3 rounded-lg font-semibold hover:bg-gray-800 transition-all"
            >
              Deliver Here
            </button>
          </form>
        </div>

        {/* Step 2: Order Summary */}
        <div
          className={`transition-all duration-300 ${
            step === 2 ? "block" : "hidden"
          }`}
        >
          <h2 className="text-xl font-bold mb-4">Order Summary</h2>
          <ul className="divide-y divide-gray-200 mb-4">
            {cart.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center py-2 text-sm"
              >
                <span>
                  {item.name} x{item.qty}
                </span>
                <span className="font-medium text-gray-800">
                  ${(item.price * item.qty).toFixed(2)}
                </span>
              </li>
            ))}
          </ul>
          <div className="font-bold text-lg text-right text-gray-800 mb-4">
            Total: ${total.toFixed(2)}
          </div>
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => goToStep(1)}
              className="px-4 py-2 bg-gray-200 rounded-lg text-gray-700 font-semibold hover:bg-gray-300"
            >
              Back
            </button>
            <button
              type="button"
              onClick={() => goToStep(3)}
              className="px-4 py-2 bg-gray-700 rounded-lg text-white font-semibold hover:bg-gray-800"
            >
              Continue to Payment
            </button>
          </div>
        </div>

        {/* Step 3: Payment */}
        <div
          className={`transition-all duration-300 ${
            step === 3 ? "block" : "hidden"
          }`}
        >
          <h2 className="text-xl font-bold mb-4">Payment Method</h2>
          <div className="bg-gray-50 rounded-lg p-4 mb-4">
            <div className="flex flex-col gap-2">
              {paymentMethods.map((method) => (
                <button
                  key={method.key}
                  className={`text-left px-4 py-3 rounded-lg border ${
                    paymentTab === method.key
                      ? "border-gray-400 bg-gray-50"
                      : "border-gray-200 bg-white hover:border-gray-300"
                  }`}
                  onClick={() => setPaymentTab(method.key)}
                >
                  {method.label}
                </button>
              ))}
            </div>
          </div>

          {/* Payment Form */}
          <div className="bg-white rounded-lg p-4 border border-gray-100 mb-4">
            {paymentTab === "card" && (
              <form onSubmit={handlePaymentNext} className="space-y-4">
                <input
                  type="text"
                  placeholder="Cardholder Name"
                  value={cardDetails.cardholder}
                  onChange={(e) =>
                    setCardDetails({
                      ...cardDetails,
                      cardholder: e.target.value,
                    })
                  }
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                  disabled={loading}
                />
                <input
                  type="text"
                  placeholder="Card Number"
                  value={cardDetails.card}
                  onChange={(e) =>
                    setCardDetails({ ...cardDetails, card: e.target.value })
                  }
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                  disabled={loading}
                />
                <div className="flex gap-2">
                  <input
                    type="text"
                    placeholder="MM/YY"
                    value={cardDetails.expiry}
                    onChange={(e) =>
                      setCardDetails({ ...cardDetails, expiry: e.target.value })
                    }
                    className="w-1/2 px-4 py-2 border rounded-lg"
                    required
                    disabled={loading}
                  />
                  <input
                    type="text"
                    placeholder="CVC"
                    value={cardDetails.cvc}
                    onChange={(e) =>
                      setCardDetails({ ...cardDetails, cvc: e.target.value })
                    }
                    className="w-1/2 px-4 py-2 border rounded-lg"
                    required
                    disabled={loading}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-2 bg-gray-700 text-white rounded-lg font-semibold"
                  disabled={loading}
                >
                  Pay ${total.toFixed(2)}
                </button>
              </form>
            )}
            {paymentTab === "upi" && (
              <form onSubmit={handlePaymentNext} className="space-y-4">
                <input
                  type="text"
                  placeholder="UPI ID (e.g., user@upi)"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                  disabled={loading}
                />
                <button
                  type="submit"
                  className="w-full py-2 bg-gray-700 text-white rounded-lg font-semibold"
                  disabled={loading}
                >
                  Pay ${total.toFixed(2)}
                </button>
              </form>
            )}
            {paymentTab === "netbanking" && (
              <form onSubmit={handlePaymentNext} className="space-y-4">
                <select
                  value={netbanking}
                  onChange={(e) => setNetbanking(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                  disabled={loading}
                >
                  <option value="">Select Bank</option>
                  <option value="hdfc">HDFC Bank</option>
                  <option value="icici">ICICI Bank</option>
                  <option value="sbi">State Bank of India</option>
                  <option value="axis">Axis Bank</option>
                </select>
                <button
                  type="submit"
                  className="w-full py-2 bg-gray-700 text-white rounded-lg font-semibold"
                  disabled={loading}
                >
                  Pay ${total.toFixed(2)}
                </button>
              </form>
            )}
            {paymentTab === "wallet" && (
              <form onSubmit={handlePaymentNext} className="space-y-4">
                <select
                  value={wallet}
                  onChange={(e) => setWallet(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg"
                  required
                  disabled={loading}
                >
                  <option value="">Select Wallet</option>
                  <option value="paytm">Paytm</option>
                  <option value="phonepe">PhonePe</option>
                  <option value="gpay">Google Pay</option>
                </select>
                <button
                  type="submit"
                  className="w-full py-2 bg-gray-700 text-white rounded-lg font-semibold"
                  disabled={loading}
                >
                  Pay ${total.toFixed(2)}
                </button>
              </form>
            )}
            {paymentTab === "cod" && (
              <form onSubmit={handlePaymentNext} className="space-y-4">
                <div className="text-gray-700 font-semibold mb-4">
                  You can pay with cash when your order is delivered.
                </div>
                <button
                  type="submit"
                  className="w-full py-2 bg-gray-700 text-white rounded-lg font-semibold"
                  disabled={loading}
                >
                  Place Order (Cash on Delivery)
                </button>
              </form>
            )}
          </div>

          {paymentError && (
            <div className="text-red-600 text-sm mb-4">{paymentError}</div>
          )}

          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => goToStep(2)}
              className="px-4 py-2 bg-gray-200 rounded-lg text-gray-700 font-semibold hover:bg-gray-300"
            >
              Back
            </button>
          </div>

          <div className="flex items-center mt-4">
            <svg
              className="w-4 h-4 text-green-600 mr-1"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 11V17M12 7h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
              />
            </svg>
            <span className="text-xs text-green-700 font-medium">
              100% Secure Payments
            </span>
          </div>
        </div>

        {/* Step 4: Confirmation */}
        <div
          className={`transition-all duration-300 ${
            step === 4 ? "block" : "hidden"
          }`}
        >
          <div className="flex flex-col items-center justify-center min-h-[30vh]">
            <svg
              className="w-16 h-16 text-green-500 mb-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
            <div className="text-2xl font-bold text-green-700 mb-2">
              Order Placed Successfully!
            </div>
            <div className="text-gray-700 mb-4">
              Thank you for shopping with us. Redirecting to home page...
            </div>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-700"></div>
          </div>
        </div>
      </div>

      {/* Order Summary Sidebar */}
      <div className="hidden md:block w-full max-w-xs bg-white rounded-2xl shadow-xl p-6 sticky top-8 self-start">
        <h3 className="text-lg font-bold mb-4">Order Summary</h3>
        <ul className="divide-y divide-gray-200 mb-4">
          {cart.map((item) => (
            <li
              key={item.id}
              className="flex justify-between items-center py-2 text-sm"
            >
              <span>
                {item.name} x{item.qty}
              </span>
              <span className="font-medium text-gray-800">
                ${(item.price * item.qty).toFixed(2)}
              </span>
            </li>
          ))}
        </ul>
        <div className="font-bold text-lg text-right text-gray-800 mb-2">
          Total: ${total.toFixed(2)}
        </div>
        <div className="flex items-center mt-2">
          <svg
            className="w-4 h-4 text-green-600 mr-1"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 11V17M12 7h.01M21 12c0 4.97-4.03 9-9 9s-9-4.03-9-9 4.03-9 9-9 9 4.03 9 9z"
            />
          </svg>
          <span className="text-xs text-green-700 font-medium">
            100% Secure Payments
          </span>
        </div>
      </div>
    </div>
  );
}
