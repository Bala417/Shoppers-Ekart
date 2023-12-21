import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiLoader } from "react-icons/fi";
import axios from "axios";
import "./Product.css";
import ProductReview from "../../component/Assets/productReview/ProductReview";
import { useDispatch, useSelector } from "react-redux";
import Footer from "../../component/footer/Footer";
import { cartReducer } from "../../state/reducers/categorySlice";

const Product = () => {
  const [product, setProduct] = useState();
  const params = useParams();
  const productId = Number(params.id);
  const [currentThumbnail, setCurrentThumbnail] = useState(null);
  const cartItemList = useSelector((store) => store.reducer.cart);
  const [showSuccessfullMsg, setShowSuccessfullMsg] = useState(false);
  const confirmationRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();

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
  const productInCart = useSelector((state) => state.reducer.cart);
  const isInCart = productInCart.find(
    (productInCart) => productInCart.id === productId
  );
  const handleAddToCart = (product) => {
    dispatch(cartReducer(product));
    setShowSuccessfullMsg(true);

    setTimeout(() => {
      setShowSuccessfullMsg(false);
    }, 2000);
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
              <span>M.R.P:</span> ${product?.price}
            </p>

            <p className="stock">
              <span>Stock:</span> {product?.stock}
            </p>
            {!isInCart ? (
              <button
                onClick={() => handleAddToCart(product)}
                className="addToCart"
              >
                Add to Cart
              </button>
            ) : (
              <div className="alreadyInCart">
                <button onClick={() => navigate("/cartPage")}>
                  Go to Cart
                </button>
                {showSuccessfullMsg && (
                  <p ref={confirmationRef} className="confirmationRef">
                    Successfully Added
                  </p>
                )}
              </div>
            )}
          </div>
          <ProductReview productId={productId} />
        </div>
      ) : (
        <div className="loader">
          <FiLoader size={40} /> <span> Loading...</span>
        </div>
      )}
      <Footer />
    </div>
  );
};
export default Product;
