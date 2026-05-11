import React, { useState } from "react";
import "./navbar.css";
import { FaLocationDot } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";

const Navbar = ({ onSearch }) => {
  const [place, setPlace] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {

    if (!place.trim()) return;
    if (loading) return;

    try {
      setLoading(true);
      await onSearch(place.trim());

    } catch (error) {
      console.error("Search error:", error);

    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="navbar">

      <div className="search-container">

        <FaLocationDot className="search-icon" />

        <input
          type="text"
          placeholder="Search location..."
          className="search-bar"
          value={place}
          onChange={(e) => setPlace(e.target.value)}

          onKeyDown={(e) => {
            if (e.key === "Enter") {
              handleSearch();
            }
          }}

          disabled={loading}
        />

        <button
          className="search-btn"
          onClick={handleSearch}
          disabled={loading}
        >
          {
            loading ? "..." : <FaSearch />
          }
        </button>

      </div>

    </div>
  );
};

export default Navbar;