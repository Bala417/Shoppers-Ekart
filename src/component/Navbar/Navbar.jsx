import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
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
    <div className="container mx-auto flex-wrap sticky top-0 left-0  sm:w-full right-0 backdrop-blur flex flex-row justify-evenly py-4 px-10 bg-transparent ">
      <div
        className="cursor-pointer flex xl:basis-1/2"
        onClick={() => navigate("/")}
      >
        <FaOpencart size={60} className="text-blue-500 " />
        <p className="text-3xl font-bold underline pl-5 pt-3">
          Shopper's E-kart
        </p>
      </div>
      <div className="flex ml-4 md:ml-0 xl:basis-1/4">
        <form onSubmit={handleSearch} className="flex items-center  ">
          <input
            className="border border-gray-300 py-1 px-2 rounded-md focus:outline-none"
            placeholder="Search..."
            onChange={(e) => setSearch(e.target.value)}
            value={search}
          />
          <button
            type="submit"
            className="ml-2 bg-blue-500 text-white py-1 px-2 rounded-md focus:outline-none active:scale-95"
          >
            <CiSearch size={20} />
          </button>
        </form>
      </div>
      <div className="flex items-center xl:basis-1/4">
        <p className="mr-4">Profile Name</p>
        <button className="bg-red-500 text-white py-1 px-2 rounded-md focus:outline-none">
          Logout
        </button>
        <div className="ml-4 relative active:scale-95">
          <HiShoppingCart
            size={45}
            onClick={() => navigate("/cartPage")}
            className="cursor-pointer "
          />
          {cartItemCount > 0 && (
            <div className="absolute top-0 right-0 bg-red-500 text-white rounded-full w-5 h-5 flex items-center justify-center">
              {cartItemCount}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
