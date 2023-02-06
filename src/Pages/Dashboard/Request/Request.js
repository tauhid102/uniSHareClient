import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../../context/AuthProvider";

const Request = () => {
  const { user } = useContext(AuthContext);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const request = (data) => {
    let currentDate = new Date().toJSON().slice(0, 10);
    const request = {
      courseTitle: data.courseTitle,
      enterTag: data.enterTag,
      description: data.description,
      category: data.category,
      email: user.email,
      date:currentDate,
      status: "Not Approved",
    };
    //save in the database
    fetch("http://localhost:5000/request", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify(request),
    })
      .then((res) => res.json())
      .then((data) => {
        toast.success("Request is added successfully");
      });
  };
  return (
    <div>
      <div className="container mt-3">
        <h4 className="text-center border bg-info p-2">Request</h4>
        <div className="row g-3 w-75 border p-4 d-block m-auto">
          <form onSubmit={handleSubmit(request)}>
            <div className="row">
              <div className="col-md-6">
                <label htmlFor="inputEmail1" className="form-label">
                  Course Title
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputEmail1"
                  {...register("courseTitle", {
                    required: "Course Title is required",
                  })}
                />
                {errors.courseTitle && (
                  <p className="text-danger">{errors.courseTitle?.message}</p>
                )}
              </div>
              <div className="col-md-6 w-50">
                <label htmlFor="inputEmail2" className="form-label">
                  Enter Tag
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="inputEmail2"
                  {...register("enterTag", {
                    required: "Tag is required",
                  })}
                />
                <label htmlFor="inputEmail4" className="form-label">
                  {errors.enterTag && (
                    <p className="text-danger">{errors.enterTag?.message}</p>
                  )}
                </label>
              </div>
            </div>
            <div className="col-md-12 ">
              <label htmlFor="inputPassword5" className="form-label">
                Description
              </label>
              <textarea
                type="text"
                className="form-control"
                id="inputPassword5"
                {...register("description", {
                  required: "Description is required",
                })}
              />
              {errors.description && (
                <p className="text-danger">{errors.description?.message}</p>
              )}
            </div>
            <div className="row">
              <div className="col-md-6 ">
                <label htmlFor="inputState" className="form-label">
                  Course Category
                </label>
                <select
                  {...register("category", {
                    required: "Category is required",
                  })}
                  id="inputState"
                  className="form-select"
                >
                  <option selected>CSE</option>
                  <option>Math</option>
                  <option>English</option>
                  <option>EEE</option>
                </select>
              </div>
            </div>
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

export default Request;
