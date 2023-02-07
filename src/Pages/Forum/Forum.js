import React, { useEffect, useState } from "react";
import '../Style/style.css'
const Forum = () => {
  const [forums, setForums] = useState([]);
  useEffect(() => {
    fetch("https://uni-share-server.vercel.app/forum")
      .then((res) => res.json())
      .then((data) => setForums(data));
  }, []);
  
  let arr = Object.entries(forums);
  arr.reverse();
  let reversedObj = Object.fromEntries(arr);
  console.log(reversedObj);
  return (
    <div className="container forum">
      <h4 className="text-center">Recent Post</h4>
      {forums?.map((ques) => (
        <div
          key={ques._id}
          className="card mb-3 shadow-lg p-3 mb-5 bg-white rounded"
        >
          <div className="row g-0">
            <div className="col-md-12">
              <div className="card-body">
                <h5 className="card-title">Title:{ques.courseTitle}</h5>
                <h6>Date: {ques.date}</h6>
                <h6 className="card-title">Category: {ques.category}</h6>
                <h6 className="card-title">Tag: {ques.enterTag}</h6>
                <p className="card-text">Description: {ques.description}</p>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Forum;
