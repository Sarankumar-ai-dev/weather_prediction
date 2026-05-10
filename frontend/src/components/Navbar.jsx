import React, { useState } from "react";
import "./navbar.css";
import { FaLocationDot, FaMapLocationDot } from "react-icons/fa6";
import { FaSearch } from "react-icons/fa";
import { BsStars } from "react-icons/bs";
import { useNavigate } from "react-router-dom";

const Navbar = ({ onSearch }) => {
  const [place, setPlace] = useState("");
  const navigate = useNavigate();

  const handleSearch = () => {
    if (place.trim()) onSearch(place);
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
          onKeyDown={(e) => e.key === "Enter" && handleSearch()}
        />

        <button className="search-btn" onClick={handleSearch}>
          <FaSearch />
        </button>
      </div>
    </div>
  );
};

export default Navbar;