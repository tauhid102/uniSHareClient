import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";

const Download = () => {
  const { ids } = useParams();
  const [comment, setComment] = useState("");
  const [rating, setRating] = useState("");
  const [download, setDownloads] = useState([]);
  const [review, setReview] = useState([]);
  useEffect(() => {
    const url = `https://uniserver.vercel.app/question/${ids}`;
    fetch(url)
      .then((res) => res.json())
      .then((data) => setDownloads(data));
  }, [download]);
  useEffect(() => {
    const url = "https://uniserver.vercel.app/review";
    fetch(url)
      .then((res) => res.json())
      .then((data) => setReview(data));
  }, [review]);
  const reviewFilter = review.filter((item) => item.id === ids);
  console.log(reviewFilter);
  const addReview = (e, id) => {
    e.preventDefault();
    let currentDate = new Date().toJSON().slice(0, 10);
    const request = {
      comment: comment,
      rating: rating,
      date: currentDate,
      id: id,
      status: "Not Approved",
    };
    console.log(request);
    //save in the database
    fetch("https://uniserver.vercel.app/review", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(request),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("Review is added successfully");
      });
  };
  return (
    <div>
      <h5 className="mt-4 text-center  mt-3 border bg-info p-2">
        Downloads Question
      </h5>
      <div className="container">
        <div className="row row-cols-lg-2 row-cols-md-1">
          <div className="col">
            <div class="card-group">
              <div class="card">
                <img src={download.image} class="card-img-top" alt="..." />
                <div class="card-body">
                  <h5 class="card-title">Name: {download.courseTitle}</h5>
                  <p class="card-text">Exam: {download.exam}</p>
                  <p class="card-text">Category: {download.category}</p>
                  <p class="card-text">Description: {download.description}</p>
                  <button
                    onClick={() => download(download.image)}
                    type="button"
                    class="btn btn-primary"
                  >
                    Download
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className="col">
            <div>
              <div class="modal-dialog">
                <div class="modal-content">
                  <div class="modal-header">
                    <h5 class="modal-title" id="exampleModalLabel">
                      Please Review
                    </h5>
                  </div>
                  <div className="container-fluid">
                    <form onSubmit={(e) => addReview(e, download._id)}>
                      <div className="row">
                        <div className="col-md-12">
                          <label htmlFor="inputEmail1" className="form-label">
                            Comment
                          </label>
                          <input
                            type="text"
                            className="form-control"
                            id="inputEmail1"
                            onBlur={(e) => setComment(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-md-12 ">
                        <div className="">
                          <label htmlFor="inputState" className="form-label">
                            Rating
                          </label>
                          <input
                            type="number"
                            className="form-control"
                            id="inputEmail1"
                            onBlur={(e) => setRating(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="col-12 text-center mt-3">
                        <button
                          type="submit"
                          className="btn btn-primary w-100 button text-center mb-3"
                        >
                          Post
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <h4 className="text-center mt-3 border bg-info p-2">Recent Review</h4>
        <div class="row row-cols-2 row-cols-md-2 g-4">
          {reviewFilter?.map((ques) => (
            <div class="col" key={ques._id}>
              <div class="card">
                <div className="card-body">
                  <h5 className="card-title">Comment: {ques.comment}</h5>
                  <h6>Date: {ques.date}</h6>
                  <h6 className="card-title">Rating: {ques.rating}</h6>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Download;
