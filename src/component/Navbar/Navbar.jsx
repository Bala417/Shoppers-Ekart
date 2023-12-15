import React from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import { HiShoppingCart } from "react-icons/hi";
import { FaOpencart } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
function Navbar() {
  const navigate = useNavigate();
  return (
    <div className="navbar">
      <div className="navbar-logo" onClick={() => navigate("/")}>
        <FaOpencart size={60} className="logo" />
        <p>Shopper's E-kart</p>
      </div>
      <div className="navbar-search">
        <form>
          <input placeholder="search" />
          <button className="navbar-search-logo">
            <CiSearch size={20} />
          </button>
        </form>
      </div>
      <div className="navbar-cart">
        <p>Pofile Name</p>
        <button>Logout</button>
        <div className="navbar-cart-logo">
          <HiShoppingCart size={45} />
        </div>
        <div className="navbar-cart-count">0</div>
      </div>
    </div>
  );
}

export default Navbar;
