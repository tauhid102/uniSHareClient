import React, { useContext } from "react";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider";
import useAdmin from "../../hooks/useAdmin";
import Loading from "../../Loading";
import Navbar from "../Share/Navbar/Navbar";
import "../Style/style.css";
const DashboardLayout = () => {
  const { user, loading } = useContext(AuthContext);
  const [isAdmin, isAdminLoading] = useAdmin(user?.email);
  if (loading || isAdminLoading) {
    return <Loading></Loading>
}
  return (
    <div>
      <Navbar></Navbar>
      <div className="">
        <div className="row g-4">
          <div className="col-2">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
              <div className="">
                <button
                  className="navbar-toggler"
                  type="button"
                  data-bs-toggle="collapse"
                  data-bs-target="#navbarTogglerDemo01"
                  aria-controls="navbarTogglerDemo02"
                  aria-expanded="false"
                  aria-label="Toggle navigation"
                >
                  <span className="navbar-toggler-icon"></span>
                </button>
                <div
                  className="collapse navbar-collapse"
                  id="navbarTogglerDemo01"
                >
                  <div className="dashboard">
                    <ul className="mb-2 mb-lg-0 dashboardLayout">
                      <Link className="navbar-brand" to="/dashboard">
                        <h3 className="">
                          <span className="logoColor">Dash</span>board
                        </h3>
                      </Link>
                      <li className="nav-item">
                        <Link className="nav-link active" to="/dashboard/myProfile">
                          My Profile
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link active" to="/dashboard/uploadFile">
                          Upload File
                        </Link>
                      </li>
                      <li className="nav-item">
                        <Link className="nav-link active" to="/dashboard/request">
                          Request
                        </Link>
                      </li>
                      {/* <li className="nav-item">
                        <Link className="nav-link active" to="/dashboard/review">
                          Review
                        </Link>
                      </li> */}
                      <li className="nav-item">
                        <Link className="nav-link active" to="/dashboard/history">
                          My History
                        </Link>
                      </li>
                      {isAdmin&&<li className="nav-item">
                        <Link className="nav-link" to="/dashboard/allUsers">
                          All Users
                        </Link>
                      </li>}
                      {isAdmin&&<li className="nav-item">
                        <Link className="nav-link" to="/dashboard/managePost">
                          Manage Post
                        </Link>
                      </li>}
                      {isAdmin&&<li className="nav-item">
                        <Link className="nav-link" to="/dashboard/manageRequest">
                          Manage Request
                        </Link>
                      </li>}
                      {isAdmin&&<li className="nav-item">
                        <Link className="nav-link" to="/dashboard/manageReview">
                          Manage Review
                        </Link>
                      </li>}
                    </ul>
                  </div>
                </div>
              </div>
            </nav>
          </div>
          <div className="col-10 border">
            <Outlet></Outlet>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
