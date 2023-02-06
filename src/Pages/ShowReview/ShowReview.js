import React, { useEffect, useState } from "react";

const ShowReview = () => {
  const [reviews, setReviews] = useState([]);
  useEffect(() => {
    fetch("http://localhost:5000/review")
      .then((res) => res.json())
      .then((data) => setReviews(data));
  }, []);
  return (
    <div>
      
    </div>
  );
};

export default ShowReview;
