import React, { useState } from "react";

function StarRating({ rating }) {
  const fullStars = Math.floor(rating);
  const halfStar = rating % 1 >= 0.5;
  return (
    <div className="star-rating-small">
      {[...Array(fullStars)].map((_, i) => (
        <span key={i} className="star-filled-small">
          ⭐
        </span>
      ))}
      {halfStar && <span className="star-filled-small">⭐</span>}
      {[...Array(5 - fullStars - (halfStar ? 1 : 0))].map((_, i) => (
        <span key={i} className="star-empty-small">
          ⭐
        </span>
      ))}
      <span className="star-rating-value-small">{rating.toFixed(1)}</span>
    </div>
  );
}

function Badge({ badge }) {
  if (!badge) return null;
  const color = badge === "Bestseller" ? "bg-amber-500" : "bg-emerald-600";
  return (
    <span
      className={`absolute top-2 left-2 px-2 py-0.5 text-xs text-white rounded-md font-medium shadow-sm ${color}`}
    >
      {badge}
    </span>
  );
}

export default function ProductList({ products, viewType, onAddToCart }) {
  const [addedItems, setAddedItems] = useState(new Set());

  const handleAddToCart = (product) => {
    onAddToCart(product);
    setAddedItems((prev) => new Set(prev).add(product.id));
    setTimeout(() => {
      setAddedItems((prev) => {
        const newSet = new Set(prev);
        newSet.delete(product.id);
        return newSet;
      });
    }, 1000);
  };
  if (viewType === "grid") {
    return (
      <div className="product-grid w-full max-w-7xl mx-auto py-8 px-8 min-h-screen bg-gray-50">
        {products.map((product) => (
          <div
            key={product.id}
            className="bg-white rounded-xl border border-gray-100 shadow-lg hover:shadow-xl transition-all duration-300 w-full p-6 relative group cursor-pointer mx-auto flex flex-col min-h-[450px] hover:transform hover:scale-[1.02]"
          >
            <Badge badge={product.badge} />

            {/* Image Container */}
            <div className="w-full mb-4 flex-shrink-0">
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover rounded-xl shadow-sm"
              />
            </div>

            {/* Content Container - Takes remaining space */}
            <div className="flex-1 flex flex-col justify-start text-center min-h-0">
              <h2 className="text-base font-bold text-slate-800 line-clamp-1 mb-2 leading-tight">
                {product.name}
              </h2>
              <div className="flex justify-center mb-2">
                <StarRating rating={product.rating} />
              </div>
              <p className="text-emerald-600 font-bold text-lg mb-2">
                ${product.price}
              </p>
              <p className="text-sm text-slate-600 mb-4 line-clamp-2 overflow-hidden leading-relaxed text-overflow-ellipsis">
                {product.description}
              </p>
            </div>

            {/* Button Container - Always at bottom */}
            <div className="flex-shrink-0 mt-auto pt-2 flex justify-center">
              <button
                className={`px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-300 flex items-center justify-center gap-2 shadow-md hover:shadow-lg transform hover:scale-[1.02] ${
                  addedItems.has(product.id)
                    ? "bg-emerald-600 text-white hover:bg-emerald-700"
                    : "bg-blue-600 text-white hover:bg-blue-700"
                }`}
                onClick={() => handleAddToCart(product)}
              >
                {addedItems.has(product.id) ? (
                  <>
                    <span>Added! ✓</span>
                  </>
                ) : (
                  <>
                    <svg
                      className="w-4 h-4"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                    </svg>
                    <span>Add to Cart</span>
                  </>
                )}
              </button>
            </div>
          </div>
        ))}
      </div>
    );
  }
  // List view unchanged
  return (
    <div className="w-full flex flex-col gap-4 items-center py-8 px-8 bg-gray-50">
      {products.map((product) => (
        <div
          key={product.id}
          className="w-full max-w-2xl bg-white rounded-xl shadow-lg flex items-center gap-6 p-6 border border-gray-100 hover:shadow-xl transition-all duration-300 relative hover:transform hover:scale-[1.01]"
        >
          <img
            src={product.image}
            alt={product.name}
            className="w-24 h-24 object-cover rounded-xl shadow-sm"
          />
          <div className="flex-1">
            <h2 className="text-base font-bold text-slate-800 mb-1 leading-tight">
              {product.name}
            </h2>
            <div className="flex mb-1">
              <StarRating rating={product.rating} />
            </div>
            <p className="text-emerald-600 font-bold text-lg mb-1">
              ${product.price}
            </p>
            <p className="text-sm text-slate-600 mb-1 leading-relaxed line-clamp-3 overflow-hidden text-overflow-ellipsis">
              {product.description}
            </p>
          </div>
          <button
            className={`px-4 py-2 rounded-lg font-semibold shadow-md transition-all duration-300 text-sm flex items-center gap-2 hover:shadow-lg transform hover:scale-[1.02] ${
              addedItems.has(product.id)
                ? "bg-emerald-600 text-white hover:bg-emerald-700"
                : "bg-blue-600 text-white hover:bg-blue-700"
            }`}
            onClick={() => handleAddToCart(product)}
          >
            {addedItems.has(product.id) ? (
              <>
                <span>Added! ✓</span>
              </>
            ) : (
              <>
                <svg
                  className="w-4 h-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3zM16 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM6.5 18a1.5 1.5 0 100-3 1.5 1.5 0 000 3z" />
                </svg>
                <span>Add to Cart</span>
              </>
            )}
          </button>
        </div>
      ))}
    </div>
  );
}
