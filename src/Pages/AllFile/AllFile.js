import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AuthContext } from "../../context/AuthProvider";
import { toast } from "react-hot-toast";
import "../Style/style.css";
import { Link } from "react-router-dom";
const AllFile = () => {
  const [question, setQuestion] = useState([]);
  const [category, setCategory] = useState([]);
  const [alart, setAlart] = useState(false);
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const url = "https://uniserver.vercel.app/questions";
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setQuestion(data));
  }, [question]);
  const filterQuestion = question.filter((item) => item.status === "Approved");
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
        <h5 className="mt-4 text-center  mt-3 border bg-info p-2">
          Search Result
        </h5>
      ) : (
        alart && (
          <h5 className="mt-4 text-center text-danger  mt-3 border bg-info p-2">
            No Search Result Found
          </h5>
        )
      )}
      <div class="row row-cols-1 row-cols-md-3 g-4">
        {category?.map((ques) => (
          <div class="col shadow-lg" key={ques._id}>
            <div class="card allfile">
              <img
                src={ques.image}
                className="rounded"
                alt="..."
                width="350px"
                height="200px"
              />
              <div className="card-body">
                <h5 className="card-title">{ques.courseTitle}</h5>
                <p className="card-text">{ques.description}</p>
                <h5 className="card-title">{ques.exam}</h5>
                <h5 className="card-title">{ques.category}</h5>
                <Link to={`/download/${ques._id}`}><button className='btn btn-dark'>Download</button></Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div>
        <h5 className="mt-4 text-center  mt-3 border bg-info p-2">All File</h5>
        <div class="row row-cols-1 row-cols-md-2 row-cols-lg-3 g-4">
          {filterQuestion?.map((ques) => (
            <div key={ques._id} class="col">
              <div class="card allfile">
                <img
                  src={ques.image}
                  className="rounded"
                  alt="..."
                  width="350px"
                  height="200px"
                />
                <div className="card-body">
                  <h5 className="card-title">{ques.courseTitle}</h5>
                  <p className="card-text">{ques.description}</p>
                  <h5 className="card-title">{ques.exam}</h5>
                  <h5 className="card-title">{ques.category}</h5>
                  <Link to={`/download/${ques._id}`}><button className='btn btn-dark'>Download</button></Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AllFile;
