import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../../context/AuthProvider";

const UploadFile = () => {
  const { user } = useContext(AuthContext);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const imageHostKey = "aa91add8de89860b67783f4c97d0e4c3";
  const uploadFIle = (data) => {
    const image = data?.img[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?expiration=600&key=${imageHostKey}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        if (imgData.success) {
          console.log(imgData.data.url);
          const question = {
            courseTitle: data.courseTitle,
            exam: data.exam,
            description: data.description,
            category: data.category,
            image: imgData.data.url,
            email: user.email,
            status: "Not Approved",
          };
          //save in the database
          fetch("http://localhost:5000/questions", {
            method: "POST",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(question),
          })
            .then((res) => res.json())
            .then((data) => {
              console.log(data);
              toast.success("Question is added successfully");
            });
        }
      });
  };

  return (
    <div>
      <div className="container mt-5">
        <h4 className="text-center">Upload file</h4>
        <div className="row g-3 w-75 border p-4 d-block m-auto">
          <form onSubmit={handleSubmit(uploadFIle)}>
            <div className="row">
              <div className="col-md-6">
                <label htmlFor="inputEmail1" className="form-label">
                  Cource Title
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
                <div className="">
                  <label htmlFor="inputState" className="form-label">
                    Mid/Final or CT
                  </label>
                  <select
                    {...register("exam", {
                      required: "This is required",
                    })}
                    id="inputState"
                    className="form-select"
                  >
                    <option selected>CT</option>
                    <option>Mid</option>
                    <option>Final</option>
                    <option>Other</option>
                  </select>
                </div>
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
                  <option selected>CSE Theory</option>
                  <option>CSE Lab</option>
                  <option>Math</option>
                  <option>English</option>
                  <option>EEE Theory</option>
                  <option>EEE Lab</option>
                </select>
              </div>
              <div className="col-md-6 ">
                <label htmlFor="inputEmail1" className="form-label">
                  Photo
                </label>
                <input
                  type="file"
                  className="form-control"
                  id="inputEmail1"
                  {...register("img", {
                    required: "Photo is required",
                  })}
                />
                {errors.img && (
                  <p className="text-danger">{errors.img?.message}</p>
                )}
              </div>
            </div>
            <div className="col-12 text-center mt-3">
              <button
                type="submit"
                className="btn btn-primary w-100 button text-center"
              >
                Upload
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UploadFile;
