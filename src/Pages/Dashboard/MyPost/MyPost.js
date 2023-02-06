import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthProvider";

const MyPost = () => {
  const [history, setHistory] = useState([]);
  const { user } = useContext(AuthContext);
  const url = `http://localhost:5000/history?email=${user?.email}`;
  useEffect(() => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setHistory(data));
  }, [user.email]);
  return (
    <div>
      <h3 className="text-center mt-3 border bg-info p-2">My History</h3>
      <table className="table table-responsive{-sm|-md|-lg|-xl|-xxl}">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Course</th>
            <th scope="col">Tags</th>
            <th scope="col">Description</th>
            <th scope="col">Category</th>
            <th scope="col">Status</th>
            <th scope="col text-center">Image</th>
          </tr>
        </thead>
        <tbody>
          {history?.map((his,i) => (
            <tr key={his._id}>
              <th scope="row">{i+1}</th>
              <td>{his.courseTitle}</td>
              <td>{his.enterTag}</td>
              <td>{his.description}</td>
              <td>{his.category}</td>
              <td>{his.status}</td>
              <td><img src={his.image} width='200px'></img></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default MyPost;
