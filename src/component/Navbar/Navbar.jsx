import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";
import { HiShoppingCart } from "react-icons/hi";
import { FaOpencart } from "react-icons/fa6";
import { CiSearch } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { productSearchKey } from "../../state/reducers/searchProductSlice";
import { fetchProduct } from "../../state/reducers/searchProductSlice";

function Navbar() {
  const navigate = useNavigate();
  const [search, setSearch] = useState("");

  const dispatch = useDispatch();

  const cartItemAdded = useSelector((store) => {
    return store.reducer.cart;
  });

  const cartItemCount = cartItemAdded.length;

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(productSearchKey(search));
    dispatch(fetchProduct());
    setSearch("");
    navigate("/");
  };
  return (
    <div className="navbar">
      <div className="navbar-logo" onClick={() => navigate("/")}>
        <FaOpencart size={60} className="logo" />
        <p>Shopper's E-kart</p>
      </div>
      <div className="navbar-search">
        <form onSubmit={handleSearch}>
          <input
            placeholder="search"
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <button className="navbar-search-logo" onClick={handleSearch}>
            <CiSearch size={20} />
          </button>
        </form>
      </div>
      <div className="navbar-cart">
        <p>Pofile Name</p>
        <button>Logout</button>
        <div className="navbar-cart-logo">
          <HiShoppingCart size={45} onClick={() => navigate("/cartPage")} />
          {/* {isOpen && <Cart setIsOpen={setIsOpen} isOpen={isOpen} />} */}
        </div>
        <div className="navbar-cart-count">{cartItemCount}</div>
      </div>
    </div>
  );
}

export default Navbar;
