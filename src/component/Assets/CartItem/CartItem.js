import React from "react";
import "./CartItem.css";
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
    <section className="cart-section">
      <div className="cart-product-details">
        <div className="cart-product-image" onClick={handleClick}>
          <img src={product?.thumbnail} />
        </div>
        <div className="cart-product-description">
          <div className="title" onClick={handleClick}>
            {product.title}
          </div>
          <div className="seller">Seller : Shopper's Ekart</div>
          <div className="old-price">Rs.{product.price}</div>
          <div className="discount">
            {product.discountPercentage} % discount
          </div>
          <div className="discounted-price">
            Rs.
            {(
              product.price -
              (product.discountPercentage / 100) * product.price
            ).toFixed(2)}
          </div>
        </div>
        <div className="cart-delivery-detail">Deliver by 2 Jan 2024 </div>
      </div>
      <div className="cart-product-qty">
        <button
          onClick={() => dispatch(decreaseQty(product.id))}
          className="decrease-qty"
        >
          -
        </button>
        <div className="qty">{product.qty}</div>

        <button
          onClick={() => dispatch(increaseQty(product.id))}
          className="increase-qty"
        >
          +
        </button>
        <button
          onClick={() => dispatch(removeCartItem(product.id))}
          className="remove-btn"
        >
          Remove
        </button>
      </div>
    </section>
  );
};

export default CartItem;
