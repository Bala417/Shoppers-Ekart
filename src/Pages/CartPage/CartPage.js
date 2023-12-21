import React from "react";
import { useSelector } from "react-redux";
import CartItem from "../../component/Assets/CartItem/CartItem";
import "./CartPage.css";

const CartPage = () => {
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

  console.log(`og= ${originalPrice} discount= ${discount}`);

  const totalAmt = cartList.reduce(
    (total, product) =>
      total +
      (
        product.price -
        (product.discountPercentage / 100) * product.price
      ).toFixed(2),
    0
  );

  console.log(totalAmt);
  return (
    <div className="cartpage-container">
      <div className="left-panel">
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
            <p>your cart is empty</p>
          </div>
        )}
      </div>
      <div className="right-panel">
        <p>Price Details</p>
        <div className="price">
          <div>price</div>
          <div>{originalPrice}</div>
        </div>
        <div className="discount">
          <div>discount</div>
          <div>-{discount.toFixed(2)}</div>
        </div>
        <div className="delivery-charge">
          <div>Delivery Charge</div>
          <div>
            <span className="charges">Rs.40</span> <span>Free</span>
          </div>
        </div>
        <div className="total-amt">
          <div>Total Amount</div>
          <div>{discountedPrice.toFixed(2)}</div>
        </div>
        <div className="discount-msg">
          you will save {discount.toFixed(2)} on this order
        </div>
      </div>
    </div>
  );
};

export default CartPage;
