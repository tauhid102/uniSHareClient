import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { saveAs } from "file-saver";
import { AuthContext } from "../../context/AuthProvider";
import { toast } from "react-hot-toast";
const AllFile = () => {
  const [question, setQuestion] = useState([]);
  const [category, setCategory] = useState([]);
  const [alart, setAlart] = useState(false);
  const { user } = useContext(AuthContext);
  const [allUsers, setAllUsers] = useState([]);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const url = "http://localhost:5000/questions";
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setQuestion(data));
  }, [question]);
  const filterQuestion=question.filter(item=>item.status==='Approved')
  useEffect(() => {
    fetch("http://localhost:5000/users")
      .then((res) => res.json())
      .then((data) => setAllUsers(data));
  }, [allUsers]);
  const search = (data) => {
    if (data.courseTitle === "") {
      const ct = question.filter((item) => item.exam === data.exam);
      const category = ct.filter((item) => item.category === data.category);
      setCategory(category);
      setAlart(true);
    } else {
      const ct = question.filter((item) => item.exam === data.exam);
      const category = ct.filter((item) => item.category === data.category);
      const course = category.filter((item) =>
        item.courseTitle.includes(data.courseTitle)
      );
      setCategory(course);
      setAlart(true);
    }
  };
  const download = (url) => {
    const email = user?.email;
    const findUser = allUsers.filter((user) => user.email === email);
    if (findUser[0]?.point > 0) {
      fetch(`http://localhost:5000/point/remove/${email}`, {
        method: "PUT",
      })
        .then((res) => res.json())
        .then((data) => {
          saveAs(url, url);
          toast.success("Download Success");
        });
    } else {
      toast("Please Earn Point");
    }
  };
  return (
    <div className="container">
      <div>
        <div className="row g-3 w-75 border p-4 d-block m-auto">
          <form onSubmit={handleSubmit(search)}>
            <div className="row">
              <div className="col-md-2">
                <div className="">
                  <select
                    {...register("exam")}
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
              <div className="col-md-4">
                <select
                  {...register("category")}
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
              <div className="col-md-4">
                <input
                  type="text"
                  className="form-control"
                  id="inputEmail1"
                  {...register("courseTitle")}
                />
                {errors.courseTitle && (
                  <p className="text-danger">{errors.courseTitle?.message}</p>
                )}
              </div>
              <div className="col-2 text-center">
                <button
                  type="submit"
                  className="btn btn-primary w-100 button text-center"
                >
                  <i className="fa-solid fa-magnifying-glass"></i>
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
      {category.length > 0 ? (
        <h5 className="mt-4 text-center">Search Result</h5>
      ) : (
        alart && (
          <h5 className="mt-4 text-center text-danger">
            No Search Result Found
          </h5>
        )
      )}
      {category?.map((ques) => (
        <div
          key={ques._id}
          className="card mb-3 shadow-lg p-3 mb-5 bg-white rounded"
        >
          <div className="row g-0">
            <div className="col-md-4">
              <img src={ques.image} className="img-fluid rounded-start" alt="..." />
            </div>
            <div className="col-md-8">
              <div className="card-body">
                <h5 className="card-title">{ques.courseTitle}</h5>
                <p className="card-text">{ques.description}</p>
                <h5 className="card-title">{ques.exam}</h5>
                <h5 className="card-title">{ques.category}</h5>
                <button
                  className="btn btn-info"
                  onClick={() => download(ques.image)}
                >
                  Download
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
      <div>
        <h5 className="mt-4 text-center">All File</h5>
        {filterQuestion?.map((ques) => (
          <div
            key={ques._id}
            className="card mb-3 shadow-lg p-3 mb-5 bg-white rounded"
          >
            <div className="row g-0">
              <div className="col-md-4">
                <img
                  src={ques.image}
                  className="img-fluid rounded-start"
                  alt="..."
                  width='50%'
                />
              </div>
              <div className="col-md-8">
                <div className="card-body">
                  <h5 className="card-title">{ques.courseTitle}</h5>
                  <p className="card-text">{ques.description}</p>
                  <h5 className="card-title">{ques.exam}</h5>
                  <h5 className="card-title">{ques.category}</h5>
                  <button
                    className="btn btn-info"
                    onClick={() => download(ques.image)}
                  >
                    Download
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllFile;
