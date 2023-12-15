import React from "react";
import "./CategoryItem.css";
import { useNavigate } from "react-router-dom";

export const CategoryItem = ({ product }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/product/${product.id}`);
  };
  return (
    <div className="product-container" onClick={handleClick}>
      <div className="product-image-container">
        <img className="product-image" src={product.images[1]} />
      </div>
      <div className="product-description">
        <div className="title">{product.title}</div>
        <div className="price">$ {product.price}</div>
        <div className="description">{product.decription}</div>
        <div className="rating">rating {product.rating}/5</div>
      </div>
    </div>
  );
};
