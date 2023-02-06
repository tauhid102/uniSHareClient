import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const ManagePost = () => {
  const [question, setQuestion] = useState([]);
  const [accepted, setAccepted] = useState(true);
  const url = "http://localhost:5000/questions";
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setQuestion(data));
  }, [question, accepted]);

  const handleCancel = (id) => {
    const proceed = window.confirm("Are you sure, you want to delete?");
    if (proceed) {
      const url = `http://localhost:5000/questions/${id}`;
      fetch(url, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.deletedCount > 0) {
            toast.success("Cancel Successfully");
            const restQuestion = question.filter((data) => data._id !== id);
            setQuestion(restQuestion);
          }
        });
    }
  };
  const handleApproved = (id) => {
    setAccepted(true);
    const ids = { id };
    const proceed = window.confirm("Are you sure, you want to accepted?");
    if (proceed) {
      const url = `http://localhost:5000/questions/${id}`;
      fetch(url, {
        method: "PUT",
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.modifiedCount > 0) {
            toast.success("Accepted Successfully");
            setAccepted(false);
            handleAddPoint(id);
          }
        });
    }
  };
  const handleAddPoint = (id) => {
    const userInfo = question.filter((item) => item._id === id);
    const email = userInfo[0].email;
    fetch(`http://localhost:5000/point/update/${email}`, {
      method: "PUT",
    })
      .then((res) => res.json())
      .then((data) => {
      });
  };

  return (
    <div>
      <h3 className="text-center mt-3 border bg-info p-2">Manage All Post</h3>
      <table className="table table-responsive{-sm|-md|-lg|-xl|-xxl}">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Email</th>
            <th scope="col">Course</th>
            <th scope="col">Exam</th>
            <th scope="col">Description</th>
            <th scope="col">Category</th>
            <th scope="col">Status</th>
            <th scope="col text-center">Image</th>
            <th scope="col text-center">Approved</th>
            <th scope="col text-center">Delete</th>
          </tr>
        </thead>
        <tbody>
          {question?.map((his, i) => (
            <tr key={his._id}>
              <th scope="row">{i + 1}</th>
              <td>{his.email}</td>
              <td>{his.courseTitle}</td>
              <td>{his.exam}</td>
              <td>{his.description}</td>
              <td>{his.category}</td>
              <td>{his.status}</td>
              <td>
                <img src={his.image} width="200px"></img>
              </td>
              <td className="">
                <button className="btn" onClick={() => handleApproved(his._id)}>
                  <i className="fa-regular fa-square-check h5 text-info"></i>
                </button>
              </td>
              <td className="">
                <button className="btn" onClick={() => handleCancel(his._id)}>
                  <i className="fa-solid fa-trash-can h5 text-danger"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManagePost;
