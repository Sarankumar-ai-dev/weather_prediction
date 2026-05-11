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

      console.log("Search Error:", error);

    } finally {

      setTimeout(() => {
        setLoading(false);
      }, 1000);
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

          // ONLY state update
          onChange={(e) => {
            setPlace(e.target.value);
          }}

          // Enter key search
          onKeyDown={(e) => {

            if (e.key === "Enter" && !loading) {
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
            loading
              ? "Loading..."
              : <FaSearch />
          }

        </button>

      </div>

    </div>
  );
};

export default Navbar;