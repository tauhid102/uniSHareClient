import React, { useEffect, useState } from "react";
import { toast } from "react-hot-toast";

const AllUsers = () => {
  const [loadAdmin, setLoadAdmin] = useState(false);
  const [allUsers, setAllUsers] = useState([]);
  useEffect(() => {
    fetch("https://uniserver.vercel.app/users")
      .then((res) => res.json())
      .then((data) => setAllUsers(data));
  }, [allUsers, loadAdmin]);
  const handleMakeAdmin = (id) => {
    setLoadAdmin(false);
    fetch(`https://uniserver.vercel.app/users/admin/${id}`, {
      method: "PUT",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.modifiedCount > 0) {
          toast.success("Make Admin Successful");
          setLoadAdmin(true);
        }
      });
  };
  const handleCancel = (id) => {
    const proceed = window.confirm("Are you sure, you want to delete?");
    if (proceed) {
      const url = `https://uniserver.vercel.app/allUser/${id}`;
      fetch(url, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((result) => {
          if (result.deletedCount > 0) {
            toast.success("Cancel Successfully");
            const restQuestion = allUsers.filter((data) => data._id !== id);
            setAllUsers(restQuestion);
          }
        });
    }
  };
  return (
    <div>
      <h3 className="text-center mt-3 border bg-info p-2">All User</h3>
      <table className="table table-responsive{-sm|-md|-lg|-xl|-xxl}">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Name</th>
            <th scope="col">Email</th>
            <th scope="col">Role</th>
            <th scope="col">Point</th>
            <th scope="col">Admin</th>
            <th scope="col">Delete</th>
          </tr>
        </thead>
        <tbody>
          {allUsers.map((user, i) => (
            <tr key={user?.email}>
              <th scope="row">{i + 1}</th>
              <td>{user.name}</td>
              <td>{user.email}</td>
              <td>{user.role}</td>
              <td>{user.point}</td>
              <td>
                {user?.role !== "admin" && (
                  <button
                    onClick={() => handleMakeAdmin(user._id)}
                    className="btn btn-primary"
                  >
                    Make Admin
                  </button>
                )}
              </td>
              <td>
                {user?.role !== "admin" && (
                  <button
                    onClick={() => handleCancel(user._id)}
                    className="btn"
                  >
                    <i className="fa-solid fa-trash-can h5 text-danger"></i>
                  </button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AllUsers;
