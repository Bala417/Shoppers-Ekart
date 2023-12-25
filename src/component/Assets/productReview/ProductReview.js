import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
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
    <div className="comment-container m-5">
      <hr className="border-solid border-slate-200 border-2" />
      <p className="mt-10 ml-5 text-lg">Comments Section</p>
      {productComments.map((comment) => {
        return (
          <div key={comment.id} className="comments m-5 mb-10">
            <div className="username-container flex ">
              <img className="h-8 mr-2 " alt={comment.id} src={profileIcon} />

              <div className="username font-bold">{comment.user.username}</div>
            </div>
            <div className="comment-date text-slate-500">
              Reviewed in India on 13 December 2023
            </div>
            <div className="verified text-orange-500">Verified Purchase</div>
            <div className="feedback-buttons m-2">
              <button className="feedback-button mx-2 px-2 rounded bg-slate-300 border-solid border-2 border-slate-700 hover:bg-slate-400">
                Helpful
              </button>
              <button className="feedback-button mx-2 px-2  text-red-500">
                Report
              </button>
            </div>

            <div className="comment-msg">{comment.body}</div>
          </div>
        );
      })}
    </div>
  );
}

export default ProductReview;
