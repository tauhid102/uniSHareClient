import React, { useEffect, useState } from "react";
import '../Style/style.css'
const Forum = () => {
  const [forums, setForums] = useState([]);
  useEffect(() => {
    fetch("https://uniserver.vercel.app/forum")
      .then((res) => res.json())
      .then((data) => setForums(data));
  }, []);
  
  let arr = Object.entries(forums);
  arr.reverse();
  let reversedObj = Object.fromEntries(arr);
  console.log(reversedObj);
  return (
    <div className="container forum">
    <h4 className="text-center mt-3 border bg-info p-2">Recent Post</h4>
      <div class="row row-cols-2 row-cols-md-2 g-4">
        {forums?.map((ques) => (
          <div class="col" key={ques._id}>
            <div class="card">
              <div className="card-body">
                <h5 className="card-title">Title:{ques.courseTitle}</h5>
                <h6>Date: {ques.date}</h6>
                <h6 className="card-title">Category: {ques.category}</h6>
                <h6 className="card-title">Tag: {ques.enterTag}</h6>
                <p className="card-text">Description: {ques.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Forum;
