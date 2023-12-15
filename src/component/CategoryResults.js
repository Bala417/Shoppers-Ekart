import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import "./CategoryResults.css";
import { CategoryItem } from "./CategoryItem/CategoryItem";
function CategoryResults() {
  const [categoryProducts, setCategoryProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const selectedCategory = useSelector((state) => state.reducer.category);
  console.log(selectedCategory);

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
      {categoryProducts.map((product, index) => {
        return (
          <div key={index}>
            <CategoryItem product={product} />
          </div>
        );
      })}
    </div>
  ) : (
    <div>Loading...</div>
  );
}

export default CategoryResults;
