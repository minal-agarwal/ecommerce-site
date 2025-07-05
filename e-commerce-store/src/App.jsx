import { useState, useEffect } from "react";
import { Routes, Route, Link, useNavigate } from "react-router-dom";
import ProductList from "./components/ProductList";
import SearchBar from "./components/SearchBar";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Toast from "./components/Toast";

const mockProducts = [
  {
    id: 1,
    name: "Wireless Headphones",
    price: 99.99,
    image: "/images/Wireless Headphones.jpeg",
    category: "Electronics",
    description:
      "High-quality wireless headphones with noise cancellation and long battery life.",
    badge: "Bestseller",
    rating: 4.7,
  },
  {
    id: 2,
    name: "Smart Watch",
    price: 149.99,
    image: "/images/Smart Watch.jpeg",
    category: "Electronics",
    description:
      "Track your fitness, receive notifications, and stay connected on the go.",
    badge: "New Arrival",
    rating: 4.3,
  },
  {
    id: 3,
    name: "Bluetooth Speaker",
    price: 59.99,
    image: "/images/Bluetooth Speaker.jpeg",
    category: "Electronics",
    description: "Portable speaker with deep bass and 12-hour playtime.",
    badge: null,
    rating: 4.1,
  },
  {
    id: 4,
    name: "Running Shoes",
    price: 79.99,
    image: "/images/Running Shoes.jpeg",
    category: "Shoes",
    description:
      "Lightweight and comfortable shoes for daily running and workouts.",
    badge: "Bestseller",
    rating: 4.6,
  },
  {
    id: 5,
    name: "Leather Wallet",
    price: 25.99,
    image: "/images/Leather Wallet.jpeg",
    category: "Accessories",
    description:
      "Premium leather wallet with multiple card slots and RFID protection.",
    badge: null,
    rating: 4.2,
  },
  {
    id: 6,
    name: "Handbag",
    price: 49.99,
    image: "/images/Handbag.jpeg",
    category: "Accessories",
    description:
      "Elegant handbag with spacious compartments and modern design.",
    badge: "New Arrival",
    rating: 4.4,
  },
  {
    id: 7,
    name: "Sunglasses",
    price: 35.99,
    image: "/images/Sunglasses.jpeg",
    category: "Accessories",
    description: "UV-protected stylish sunglasses for all occasions.",
    badge: null,
    rating: 4.0,
  },
  {
    id: 8,
    name: "Fitness Tracker",
    price: 59.99,
    image: "/images/Fitness Tracker.jpeg",
    category: "Electronics",
    description:
      "Monitor your health and activity with this advanced fitness tracker.",
    badge: null,
    rating: 4.3,
  },
  {
    id: 9,
    name: "Portable Charger",
    price: 22.99,
    image: "/images/Portable Charger.jpeg",
    category: "Electronics",
    description: "Compact power bank for charging devices on the go.",
    badge: null,
    rating: 4.1,
  },
  {
    id: 10,
    name: "Laptop Backpack",
    price: 39.99,
    image: "/images/Laptop Backpack.jpeg",
    category: "Accessories",
    description:
      "Durable backpack with padded laptop compartment and USB charging port.",
    badge: "Bestseller",
    rating: 4.5,
  },
  {
    id: 11,
    name: "Wireless Keyboard",
    price: 27.99,
    image: "/images/Wireless Keyboard.jpeg",
    category: "Electronics",
    description:
      "Ergonomic wireless keyboard for comfortable typing and minimal distractions.",
    badge: null,
    rating: 4.2,
  },
  {
    id: 13,
    name: "Tablet",
    price: 299.99,
    image: "/images/Tablet.jpeg",
    category: "Electronics",
    description:
      "Lightweight and portable tablet for entertainment and productivity.",
    badge: null,
    rating: 4.4,
  },
  {
    id: 14,
    name: "Formal Shoes",
    price: 89.99,
    image: "/images/Formal Shoes.jpeg",
    category: "Shoes",
    description:
      "Sophisticated and elegant shoes for formal occasions and professional wear.",
    badge: "Bestseller",
    rating: 4.6,
  },
  {
    id: 15,
    name: "Tote Bag",
    price: 59.99,
    image: "/images/Tote Bag.jpeg",
    category: "Accessories",
    description:
      "Versatile tote bag for everyday use, perfect for carrying essentials.",
    badge: "New Arrival",
    rating: 4.3,
  },
  {
    id: 16,
    name: "Men's Belt",
    price: 19.99,
    image: "/images/Men's Belt.jpeg",
    category: "Accessories",
    description: "High-quality leather belt for men, adjustable and durable.",
    badge: null,
    rating: 4.1,
  },
  {
    id: 17,
    name: "Wireless Charger",
    price: 29.99,
    image: "/images/Wireless Charger.jpeg",
    category: "Electronics",
    description: "Fast wireless charging pad for all your devices on the go.",
    badge: null,
    rating: 4.2,
  },
  {
    id: 18,
    name: "Action Camera",
    price: 199.99,
    image: "/images/Action Camera.jpeg",
    category: "Electronics",
    description:
      "Professional action camera for capturing high-quality videos and photos.",
    badge: "Bestseller",
    rating: 4.8,
  },
  {
    id: 19,
    name: "Scarf",
    price: 15.99,
    image: "/images/Scarf.jpeg",
    category: "Accessories",
    description:
      "Soft and stylish scarf for a touch of elegance to any outfit.",
    badge: null,
    rating: 4.0,
  },
  {
    id: 20,
    name: "iPhone 15",
    price: 799.99,
    image: "/images/iPhone 15.jpeg",
    category: "Electronics",
    description:
      "Latest iPhone with advanced camera system and powerful A17 Pro chip.",
    badge: "New Arrival",
    rating: 4.9,
  },
  {
    id: 20,
    name: "Bluetooth Car Adapter",
    price: 24.99,
    image: "/images/Bluetooth Car Adapter.jpeg",
    category: "Electronics",
    description: "Convenient Bluetooth adapter for your car's audio system.",
    badge: null,
    rating: 4.1,
  },
  {
    id: 21,
    name: "iPhone 15",
    price: 15000,
    image: "/images/iPhone 15.jpeg",
    category: "Electronics",
    description:
      "The latest iPhone model with advanced features and stunning design.",
    badge: "New Arrival",
    rating: 4.9,
  },
];

function Navbar({ cartCount }) {
  return (
    <nav className="flex items-center justify-between py-4 px-8 shadow bg-white sticky top-0 z-40 w-full">
      <Link
        to="/"
        className="ecommerce-logo glow-effect flex items-center gap-2 text-3xl font-extrabold text-blue-700 tracking-tight transition-colors duration-200 hover:text-blue-900"
        style={{ letterSpacing: "2px" }}
      >
        <span className="inline-block font-extrabold text-4xl">
          ecommerce store
        </span>
      </Link>
      <div className="flex gap-6 items-center">
        <Link
          to="/cart"
          className="px-6 py-3 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 transition-all duration-200 flex items-center gap-3 shadow-lg"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={2}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z"
            />
          </svg>
          <span>Cart</span>
          {cartCount > 0 && (
            <span className="bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold px-1">
              {cartCount}
            </span>
          )}
        </Link>
      </div>
    </nav>
  );
}

function Home({ products, view, setView, search, setSearch, onAddToCart }) {
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(search.toLowerCase()) ||
      product.description.toLowerCase().includes(search.toLowerCase())
  );
  return (
    <section className="w-full max-w-7xl mx-auto">
      <div className="flex flex-col sm:flex-row items-center justify-between mb-8 gap-4 w-full px-4">
        <SearchBar value={search} onChange={setSearch} />
        <div className="flex gap-2">
          <button
            className={`px-4 py-2 rounded-lg font-semibold shadow-sm transition ${
              view === "grid" ? "bg-blue-600 text-white" : "bg-gray-100 border"
            }`}
            onClick={() => setView("grid")}
          >
            Grid
          </button>
          <button
            className={`px-4 py-2 rounded-lg font-semibold shadow-sm transition ${
              view === "list" ? "bg-blue-600 text-white" : "bg-gray-100 border"
            }`}
            onClick={() => setView("list")}
          >
            List
          </button>
        </div>
      </div>
      <div className="w-full">
        <ProductList
          products={filteredProducts}
          viewType={view}
          onAddToCart={onAddToCart}
        />
      </div>
    </section>
  );
}

function CartPage({ cart, onUpdateQty, onRemove, onCheckout }) {
  return (
    <div className="w-full px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-8 text-center">
          Shopping Cart
        </h1>
        <Cart
          cart={cart}
          onUpdateQty={onUpdateQty}
          onRemove={onRemove}
          onCheckout={onCheckout}
        />
      </div>
    </div>
  );
}

function CheckoutPage({ cart, onPlaceOrder, loading }) {
  return <Checkout cart={cart} onPlaceOrder={onPlaceOrder} loading={loading} />;
}

export default function App() {
  const [view, setView] = useState("grid");
  const [search, setSearch] = useState("");
  const [cart, setCart] = useState(() => {
    const stored = localStorage.getItem("cart");
    return stored ? JSON.parse(stored) : [];
  });
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ message: "", isVisible: false });
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  function handleAddToCart(product) {
    setCart((prev) => {
      const found = prev.find((item) => item.id === product.id);
      if (found) {
        return prev.map((item) =>
          item.id === product.id ? { ...item, qty: item.qty + 1 } : item
        );
      }
      return [...prev, { ...product, qty: 1 }];
    });
    setToast({ message: `${product.name} added to cart!`, isVisible: true });
  }

  function handleUpdateQty(id, qty) {
    setCart((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, qty: Math.max(1, qty) } : item
      )
    );
  }

  function handleRemove(id) {
    setCart((prev) => prev.filter((item) => item.id !== id));
  }

  function handleCheckout() {
    navigate("/checkout");
  }

  function handlePlaceOrder() {
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setCart([]);
      navigate("/");
      setToast({
        message: "Order placed successfully! Thank you for shopping with us.",
        isVisible: true,
      });
    }, 2000);
  }

  function closeToast() {
    setToast({ message: "", isVisible: false });
  }

  return (
    <div className="min-h-screen overflow-x-hidden bg-gradient-to-br from-blue-50 to-gray-100">
      <Navbar cartCount={cart.length} />
      <div className="w-full">
        <Routes>
          <Route
            path="/"
            element={
              <Home
                products={mockProducts}
                view={view}
                setView={setView}
                search={search}
                setSearch={setSearch}
                onAddToCart={handleAddToCart}
              />
            }
          />
          <Route
            path="/cart"
            element={
              <CartPage
                cart={cart}
                onUpdateQty={handleUpdateQty}
                onRemove={handleRemove}
                onCheckout={handleCheckout}
              />
            }
          />
          <Route
            path="/checkout"
            element={
              <CheckoutPage
                cart={cart}
                onPlaceOrder={handlePlaceOrder}
                loading={loading}
              />
            }
          />

          <Route
            path="*"
            element={
              <div className="flex flex-col items-center justify-center min-h-[60vh]">
                <div className="bg-white p-8 rounded shadow text-2xl font-bold text-red-700 mb-4">
                  404 - Page Not Found
                </div>
                <Link to="/" className="text-blue-600 underline">
                  Back to Home
                </Link>
              </div>
            }
          />
        </Routes>
      </div>
      {loading && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-40 z-50">
          <div className="bg-white p-8 rounded shadow text-xl font-bold text-blue-700">
            Processing payment...
          </div>
        </div>
      )}
      <Toast
        message={toast.message}
        isVisible={toast.isVisible}
        onClose={closeToast}
      />
    </div>
  );
}
