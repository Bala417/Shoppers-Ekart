import React, { useState, useEffect } from "react";
import "./Categorynav.css";
import { selectedCategory } from "../../../../state/reducers/categorySlice";
import { useDispatch } from "react-redux";

function CategoryNav() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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
  };

  return (
    <div className="category-nav">
      <ul className="category-list ">
        {data.map((item, index) => {
          return (
            <li key={index} onClick={() => handleClick(item)}>
              {item}
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default CategoryNav;
