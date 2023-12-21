import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./CategoryResults.css";
import { CategoryItem } from "./CategoryItem/CategoryItem";
import { AiOutlineDropbox } from "react-icons/ai";
import { FiLoader } from "react-icons/fi";

function CategoryResults() {
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const selectedCategory = useSelector((state) => state.reducer.category);

  const searchKey = useSelector((state) => state.search.searchKey);
  const searchProduct = useSelector((state) => state.search.searchProductData);

  useEffect(() => {
    fetch(
      `https://dummyjson.com/products/category/${selectedCategory}?skip=0&limit=5`
    )
      .then((res) => res.json())
      .then((data) => {
        setCategoryProducts(data.products);
        setIsLoading(false);
      })
      .catch((err) => console.log(err));
  }, [selectedCategory]);

  return !isLoading ? (
    <div className="container">
      {!searchKey ? (
        categoryProducts?.map((product, index) => {
          return (
            <div key={index}>
              <CategoryItem product={product} />
            </div>
          );
        })
      ) : searchProduct.products?.length === 0 ? (
        <div>
          <AiOutlineDropbox size="200px" color="grey" className="unboxed" />
          <p className="not-found">product not found</p>
        </div>
      ) : (
        searchProduct.products?.map((product, index) => {
          return (
            <div key={index}>
              <CategoryItem size={20} product={product} />
            </div>
          );
        })
      )}
    </div>
  ) : (
    <div className="loading">
      <FiLoader size={40} /> Loading...
    </div>
  );
}

export default CategoryResults;
