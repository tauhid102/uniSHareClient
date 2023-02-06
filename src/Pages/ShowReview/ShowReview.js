import React, { useEffect, useState } from "react";

const ShowReview = () => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    fetch("https://uni-share-server.vercel.app/review")
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);
  return (
    <div>
      
    </div>
  );
};

export default ShowReview;
