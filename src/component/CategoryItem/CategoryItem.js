import React from "react";
import { useNavigate } from "react-router-dom";

export const CategoryItem = ({ product }) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate(`/product/${product.id}`);
  };
  return (
    <div className="flex-col jestify-center my-8 w-96 " onClick={handleClick}>
      <div className="flex justify-center">
        <img
          className="h-60 cursor-pointer "
          src={product.images[1]}
          alt={product.title}
        />
      </div>
      <div className="p-2 m-2 text-center flex-col justify-center">
        <div className="text-2xl font-bold line-clamp-1 cursor-pointer">
          {product.title}
        </div>
        <div className="text-2xl font-semibold ">$ {product.price}</div>
        <div className="text-wrap  line-clamp-2 text-center text-slate-800">
          <p className="text-center ">{product.description}</p>
        </div>
        <div className="rating text-orange-600 text-bold">
          rating {product.rating}/5
        </div>
      </div>
    </div>
  );
};
