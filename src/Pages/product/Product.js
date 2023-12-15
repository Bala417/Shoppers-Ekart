import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { FiLoader } from "react-icons/fi";
import axios from "axios";
import "./Product.css";
import ProductReview from "../../component/Assets/productReview/ProductReview";
import { current } from "@reduxjs/toolkit";

const Product = () => {
  const [product, setProduct] = useState();
  const [selectedPreviewImg, setSelectedPreviewImg] = useState();
  const params = useParams();
  const productId = Number(params.id);
  const [currentThumbnail, setCurrentThumbnail] = useState(null);
  useEffect(() => {
    const getResponse = async () => {
      try {
        const response = await axios.get(
          "https://dummyjson.com/products?skip=0&limit=100"
        );
        const { products } = response.data;

        products.map((item) => {
          return item.id === productId ? setProduct(item) : "";
        });
      } catch (error) {
        console.log(error);
      }
    };
    getResponse();
  }, [productId]);

  const handleClick = (item) => {
    setCurrentThumbnail(item);
  };

  return (
    <div>
      {product ? (
        <div className="container">
          <div className="left-pane">
            {
              <div className="thumbnail-container">
                {currentThumbnail === null ? (
                  <img src={product?.thumbnail} className="thumbnail" />
                ) : (
                  <img src={currentThumbnail} className="thumbnail" />
                )}
              </div>
            }

            <div className="product-preview-pics zoom">
              {product.images.map((item, index) => {
                return (
                  <img
                    className={
                      currentThumbnail == item ? `selected preview-pic` : ""
                    }
                    src={item}
                    alt={`image ${index}`}
                    key={index}
                    onClick={() => handleClick(item)}
                  />
                );
              })}
            </div>
          </div>
          <div className="right-pane">
            <p className="title">{product?.title}</p>
            <p className="description">{product?.description}</p>
            <p className="brand">Brand: {product?.brand}</p>
            <p className="rating">
              <span>Rating:</span> {product?.rating}
            </p>
            <span className="deal">Deal</span>
            <div className="product-price">
              <p className="discount">{product?.discountPercentage}%</p>
              <p className="price-with-discount">
                <span>$</span>
                {(
                  product?.price -
                  (product?.discountPercentage / 100) * product?.price
                ).toFixed(2)}
              </p>
            </div>

            <p className="price-without-discount">
              <span>M.R.P:</span> {product?.price}
            </p>

            <p className="stock">
              <span>Stock:</span> {product?.stock}
            </p>
          </div>
          <ProductReview productId={productId} />
        </div>
      ) : (
        <div className="loader">
          <FiLoader size={60} />
        </div>
      )}
    </div>
  );
};
export default Product;
