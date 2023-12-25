import React, { useState } from "react";
import { useSelector } from "react-redux";
import { AiOutlineDropbox } from "react-icons/ai";
import CartItem from "../../component/Assets/CartItem/CartItem";

const CartPage = () => {
  const [isCartEmpty, setIsCartEmpty] = useState(false);
  const cartList = useSelector((store) => {
    return store.reducer.cart;
  });

  const originalPrice = cartList.reduce(
    (total, product) => (product.price + total) * product.qty,
    0
  );

  const discount = cartList.reduce(
    (total, product) =>
      ((product.discountPercentage / 100) * product.price + total) *
      product.qty,
    0
  );

  const discountedPrice = originalPrice - discount;

  const totalAmt = cartList.reduce(
    (total, product) =>
      total +
      (
        product.price -
        (product.discountPercentage / 100) * product.price
      ).toFixed(2),
    0
  );

  return (
    <div className="flex flex-col md:flex-row lg:mt-10">
      <div className="left-panel lg:mx-20 xl:mx-40 ">
        {cartList.length !== 0 ? (
          cartList.map((product, index) => {
            return (
              <div key={index}>
                <CartItem product={product} />
              </div>
            );
          })
        ) : (
          <div>
            <AiOutlineDropbox size="200px" color="grey" className="" />
            <p>your cart is empty</p>
          </div>
        )}
      </div>
      <div className="right-panel lg:ml-20 xl:ml-40 text-lg md:text-xl m-5 capitalize">
        <p className="font-semibold text-center mb-2 bg-slate-300 py-2 ">
          Price Details
        </p>
        <div className="flex justify-between mb-2">
          <div>price</div>
          <div>{originalPrice}</div>
        </div>
        <div className="discount flex justify-between mb-2">
          <div>discount</div>
          <div>-{discount.toFixed(2)}</div>
        </div>
        <div className="flex justify-between mb-2">
          <div>Delivery Charge</div>
          <div>
            <span className="charges">Rs.40</span>{" "}
            <span className="text-green-800">Free</span>
          </div>
        </div>
        <div className="flex justify-between mb-2">
          <div>Total Amount</div>
          <div className="font-bold text-xl">
            Rs.{discountedPrice.toFixed(2)}
          </div>
        </div>
        <div className="text-green-600 font-semibold">
          you will save {discount.toFixed(2)} on this order
        </div>
        <div className="flex justify-center my-5">
          <button className="bg-green-500 px-5 mx-3 py-2 hover:bg-green-600 rounded hover:text-white drop-shadow-xl hover:drop-shadow-none active:scale-95">
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
};

export default CartPage;
