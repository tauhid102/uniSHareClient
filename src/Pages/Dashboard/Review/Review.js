import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../../context/AuthProvider";
import StarRating from "react-bootstrap-star-rating";

const Review = () => {
  const { user } = useContext(AuthContext);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const addReview = (data) => {
    const request = {
      comment: data.comment,
      problem: data.problem,
      rating: data.rating,
      email: user.email,
      status: "Not Approved",
    };
    //save in the database
    fetch("https://uni-share-server.vercel.app/review", {
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
      <div className="container mt-3">
        <h4 className="text-center border bg-info p-2">Please Give Review</h4>
        <div className="row g-3 w-75 border p-4 d-block m-auto">
          <form onSubmit={handleSubmit(addReview)}>
            <div className="row">
              <div className="col-md-6">
                <label htmlFor="inputEmail1" className="form-label">
                  Comment
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputEmail1"
                  {...register("comment", {
                    required: "Comment is required",
                  })}
                />
                {errors.comment && (
                  <p className="text-danger">{errors.comment?.message}</p>
                )}
              </div>
              <div className="col-md-6 w-50">
                <label htmlFor="inputEmail2" className="form-label">
                  Any Problem
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputEmail2"
                  {...register("problem")}
                />
              </div>
            </div>
            <div className="col-md-12 ">
              <div className="">
                <label htmlFor="inputState" className="form-label">
                  Rating
                </label>
                <select
                  {...register("rating", {
                    required: "This is required",
                  })}
                  id="inputState"
                  className="form-select"
                >
                  <option value={"Great"}>Great</option>
                  <option>Good</option>
                  <option>Average</option>
                  <option>Poor</option>
                </select>
              </div>
            </div>
            <StarRating defaultValue={5} min={0} max={10} step={0.5} />
            <div className="col-12 text-center mt-3">
              <button
                type="submit"
                className="btn btn-primary w-100 button text-center"
              >
                Post
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Review;
