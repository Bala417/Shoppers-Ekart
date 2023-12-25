import React from "react";
import { useDispatch } from "react-redux";
import {
  increaseQty,
  decreaseQty,
  removeCartItem,
} from "../../../state/reducers/categorySlice";
import { useNavigate } from "react-router-dom";

const CartItem = ({ product }) => {
  console.log(product);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/product/${product.id}`);
  };
  return (
    <section className="my-5 mb-16">
      <div className="flex flex-col justify-center m-3">
        <div className="flex">
          <div className="w-48 h-48 flex object-contain" onClick={handleClick}>
            <img className="rounded" src={product?.thumbnail} />
          </div>
          <div className="text-lg md:text-xl mx-5">
            <div className="font-bold " onClick={handleClick}>
              {product.title}
            </div>
            <div className="text-slate-500">Seller : Shopper's Ekart</div>
            <div className="">
              <span className="text-green-800 ">
                {product.discountPercentage} %
              </span>
              <span className=" px-2 rounded">Discount</span>
            </div>
            <div className="text-xl font-bold mt-3">
              Rs.
              {(
                product.price -
                (product.discountPercentage / 100) * product.price
              ).toFixed(2)}
            </div>
            <div className="line-through">Rs.{product.price}</div>
            <div className="my-3 text-green-800">Deliver by 2 Jan 2024 </div>
          </div>
        </div>
      </div>
      <div className="flex ">
        <button
          onClick={() => dispatch(decreaseQty(product.id))}
          className="w-8 h-8 border-solid border-2 border-slate-800 rounded mx-2 text-lg text-slate-600 hover:bg-slate-300  drop-shadow-lg hover:drop-shadow-none active:scale-95"
        >
          -
        </button>
        <div className="w-10 h-8 text-center text-lg font-semibold">
          {product.qty}
        </div>

        <button
          onClick={() => dispatch(increaseQty(product.id))}
          className="w-8 h-8 border-solid border-2 border-slate-800 rounded mx-2  text-lg text-slate-600 hover:bg-slate-300  drop-shadow-lg hover:drop-shadow-none active:scale-95"
        >
          +
        </button>
        <button
          onClick={() => dispatch(removeCartItem(product.id))}
          className="text-red-500 border-solid border-2  border-red-500 px-2 mx-2 rounded hover:bg-red-500 hover:text-white active:scale-95"
        >
          Remove
        </button>
      </div>
    </section>
  );
};

export default CartItem;
