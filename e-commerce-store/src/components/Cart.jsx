import React from "react";
import { Link } from "react-router-dom";

export default function Cart({ cart, onUpdateQty, onRemove, onCheckout }) {
  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-2xl shadow-xl p-6 border border-gray-100">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Cart</h2>
      {cart.length === 0 ? (
        <p className="text-gray-400 text-center">Your cart is empty.</p>
      ) : (
        <div className="flex flex-col gap-4">
          {cart.map((item) => (
            <div
              key={item.id}
              className="flex items-center gap-3 border-b pb-3 last:border-b-0 last:pb-0"
            >
              <img
                src={item.image}
                alt={item.name}
                className="w-14 h-14 object-cover rounded-lg border border-gray-100 bg-gray-50"
              />
              <div className="flex-1 min-w-0">
                <div className="font-semibold text-gray-800 truncate">
                  {item.name}
                </div>
                <div className="text-blue-600 font-bold text-sm">
                  ${item.price}
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <button
                    onClick={() => onUpdateQty(item.id, item.qty - 1)}
                    disabled={item.qty <= 1}
                    className="px-2 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300 disabled:opacity-50"
                  >
                    -
                  </button>
                  <span className="font-medium text-gray-700">{item.qty}</span>
                  <button
                    onClick={() => onUpdateQty(item.id, item.qty + 1)}
                    className="px-2 py-1 rounded bg-gray-200 text-gray-700 hover:bg-gray-300"
                  >
                    +
                  </button>
                </div>
              </div>
              <button
                onClick={() => onRemove(item.id)}
                className="text-red-500 ml-2 hover:underline text-sm"
              >
                Remove
              </button>
            </div>
          ))}
          <div className="font-bold text-right mt-2 text-lg text-gray-800">
            Total: ${total.toFixed(2)}
          </div>
          <div className="flex gap-3 mt-4">
            <Link
              to="/"
              className="flex-1 bg-gray-200 text-gray-700 py-3 rounded-full font-semibold text-lg shadow hover:bg-gray-300 transition-all text-center"
            >
              Continue Shopping
            </Link>
            <button
              className="flex-1 bg-blue-600 text-white py-3 rounded-full font-semibold text-lg shadow hover:bg-blue-700 transition-all"
              onClick={onCheckout}
            >
              Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
