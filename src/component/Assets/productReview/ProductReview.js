import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import "./ProductReview.css";
import profileIcon from "../images/profile-circle-svgrepo-com.svg";
function ProductReview({ productId }) {
  const [productComments, setProductComments] = useState([]);
  const ref = useRef([]);
  useEffect(() => {
    const getComment = async () => {
      try {
        const response = await axios.get(
          "https://dummyjson.com/comments?skip=0&limit=10"
        );
        const { comments } = response.data;
        setProductComments(comments);
      } catch (err) {
        console.log(err);
      }
    };
    getComment();
  }, [productId]);

  return (
    <div className="comment-container">
      {productComments.map((comment) => {
        return (
          <div key={comment.id} className="comments">
            <div className="username-container">
              <img className="profile-icon" src={profileIcon} />

              <div className="username">{comment.user.username}</div>
            </div>
            <div className="comment-date">
              Reviewed in India on 13 December 2023
            </div>
            <div className="verified">Verified Purchase</div>
            <div className="feedback-buttons">
              <button className="feedback-button">Helpful</button>
              <button className="feedback-button">Report</button>
            </div>

            <div className="comment-msg">{comment.body}</div>
          </div>
        );
      })}
    </div>
  );
}

export default ProductReview;
