import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const ManageReview = () => {
  const [review, setReview] = useState([]);
  const [accepted, setAccepted] = useState(true);
  const url = "http://localhost:5000/review";
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setReview(data));
  }, [review, accepted]);

  const handleCancel = (id) => {
    const proceed = window.confirm("Are you sure, you want to delete?");
    if (proceed) {
      const url = `http://localhost:5000/review/${id}`;
      fetch(url, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.deletedCount > 0) {
            toast.success("Cancel Successfully");
            const restQuestion = review.filter((data) => data._id !== id);
            setReview(restQuestion);
          }
        });
    }
  };
  const handleApproved = (id) => {
    setAccepted(true);
    const ids = { id };
    const proceed = window.confirm("Are you sure, you want to accepted?");
    if (proceed) {
      const url = `http://localhost:5000/review/${id}`;
      fetch(url, {
        method: "PUT",
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.modifiedCount > 0) {
            toast.success("Accepted Successfully");
            setAccepted(false);
          }
        });
    }
  };

  return (
    <div>
      <h3 className="text-center mt-3">Manage All Review</h3>
      <table className="table table-responsive{-sm|-md|-lg|-xl|-xxl}">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Email</th>
            <th scope="col">Comment</th>
            <th scope="col">Problem</th>
            <th scope="col">Rating</th>
            <th scope="col">Status</th>
            <th scope="col text-center">Approved</th>
            <th scope="col text-center">Delete</th>
          </tr>
        </thead>
        <tbody>
          {review?.map((his, i) => (
            <tr key={his._id}>
              <th scope="row">{i + 1}</th>
              <td>{his.email}</td>
              <td>{his.comment}</td>
              <td>{his.problem}</td>
              <td>{his.rating}</td>
              <td>{his.status}</td>
              <td className="">
                <button className="btn" onClick={() => handleApproved(his._id)}>
                  <i class="fa-regular fa-square-check h5 text-info"></i>
                </button>
              </td>
              <td className="">
                <button className="btn" onClick={() => handleCancel(his._id)}>
                  <i class="fa-solid fa-trash-can h5 text-danger"></i>
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ManageReview;
