import React from "react";

export default function SearchBar({ value, onChange }) {
  const handleKeyPress = (e) => {
    if (e.key === "Enter") {
      // Optionally handle search on Enter
    }
  };

  return (
    <div className="search-bar-modern">
      <span className="search-bar-modern-icon">
        <svg width="32" height="32" fill="none" viewBox="0 0 24 24">
          <path
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 21l-4.35-4.35m1.35-5.15a7 7 0 11-14 0 7 7 0 0114 0z"
          />
        </svg>
      </span>
      <input
        type="text"
        placeholder="Search for Products, Brands and More"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyPress={handleKeyPress}
        className="search-bar-modern-input"
      />
    </div>
  );
}
