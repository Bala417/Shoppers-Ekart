import React, { useState, useEffect, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { FiLoader } from "react-icons/fi";
import axios from "axios";
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

  const handlePreviewHover = (item) => {
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
        <div className="flex-col ml-5">
          <div className=" flex flex-col md:flex-row ">
            <div className="left-pane flex-col justify-center flex md:w-[40rem] px-5 mx-5">
              {
                <div className="h-[30rem] hover:cursor-zoom-in hover:scale-110 flex justify-center">
                  {currentThumbnail === null ? (
                    <img
                      src={product?.thumbnail}
                      className="object-contain h-[30rem]"
                      alt={product.title}
                    />
                  ) : (
                    <img
                      src={currentThumbnail}
                      className="object-contain h-[30rem] p-5"
                      alt={product.title}
                    />
                  )}
                </div>
              }

              <div className="flex w-90 object-contain justify-center ">
                {product.images.map((item, index) => {
                  return (
                    <img
                      className={
                        currentThumbnail === item
                          ? ` object-contain w-20 h-20 m-1 hover:scale-90 hover:border-black`
                          : "object-contain w-20 h-20 m-1 "
                      }
                      src={item}
                      alt={`${index}`}
                      key={index}
                      onMouseEnter={() => handlePreviewHover(item)}
                    />
                  );
                })}
              </div>
            </div>
            <div className="right-pane m-5 md:m-10 p-5  ">
              <p className=" font-bold text-xl">{product.title}</p>
              <p className="description ">{product.description}</p>
              <p className="brand py-2 text-orange-500 font-bold">
                Brand: {product?.brand}
              </p>
              <p className="rating ">
                <span>Rating:</span> {product?.rating}
              </p>

              <div className="product-price ">
                <p className="discount text-green-500 my-2 ">
                  {product?.discountPercentage}%{" "}
                  <span className=" bg-red-500 text-white rounded px-3 text-md py-1 ">
                    Deal
                  </span>
                </p>

                <div className="my-2">
                  <span className="price-with-discount text-xl font-bold mr-3">
                    <span>$</span>
                    {(
                      product?.price -
                      (product?.discountPercentage / 100) * product?.price
                    ).toFixed(2)}
                  </span>
                  <span className="price-without-discount text-md line-through ">
                    <span>M.R.P:</span> ${product?.price}
                  </span>
                </div>
              </div>

              <p className="stock pb-5">
                <span>Stock:</span> {product?.stock}
              </p>
              {!isInCart ? (
                <button
                  onClick={() => handleAddToCart(product)}
                  className="addToCart text-slate-200 bg-green-400 px-3 rounded py-2 hover:bg-green-500 hover:text-white active:border-white active:scale-95"
                >
                  Add to Cart
                </button>
              ) : (
                <div className="">
                  <button
                    className="text-slate-200 bg-green-400 px-3 rounded py-2 hover:bg-green-500  active:border-white active:scale-95"
                    onClick={() => navigate("/cartPage")}
                  >
                    Go to Cart
                  </button>
                  {showSuccessfullMsg && (
                    <p
                      ref={confirmationRef}
                      className="confirmationRef text-green-500 "
                    >
                      Successfully Added
                    </p>
                  )}
                </div>
              )}
            </div>
          </div>
          <ProductReview productId={productId} />
        </div>
      ) : (
        <div className="loader flex justify-center my-56">
          <FiLoader size={40} /> <span> Loading...</span>
        </div>
      )}
      <Footer />
    </div>
  );
};
export default Product;
