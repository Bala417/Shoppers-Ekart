import React, { useState, useEffect } from "react";
import "./Categorynav.css";
import { selectedCategory } from "../../../../state/reducers/categorySlice";
import { useDispatch } from "react-redux";
import { productSearchKey } from "../../../../state/reducers/searchProductSlice";

function CategoryNav() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [categorySelected, setCategorySelected] = useState(null);
  const dispatch = useDispatch();

  useEffect(() => {
    fetch("https://dummyjson.com/products/categories")
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        throw res;
      })
      .then((data) => {
        setData(data);
        setLoading(false);
      })
      .catch((error) => {
        alert("data fetching error");
        setData(error);
        console.log(error);
      });
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleClick = (item) => {
    dispatch(selectedCategory(item));
    setCategorySelected(item);
    dispatch(productSearchKey(""));
  };

  return (
    <div
      className="category-nav overflow-x-scroll scrollbar-hide whitespace-nowrap bg-blue-50 m-10
    "
    >
      <ul className="hide-scroll-custom flex overflow-auto text-center cursor-pointer">
        {data.map((item, index) => {
          return (
            <li
              key={index}
              onClick={() => handleClick(item)}
              className={`${
                item === categorySelected ? "bg-blue-100" : ""
              } p-3 text-center m-2 padding-5 capitalize rounded-lg`}
            >
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default CategoryNav;
