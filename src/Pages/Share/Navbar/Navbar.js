import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthProvider";
import "../../Style/style.css";
const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const handleLogout = () => {
    logout().then(() => {});
  };
  const [users, setUser] = useState({});
  useEffect(() => {
    fetch(`http://localhost:5000/point/user?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, [users]);
  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="container">
          <Link className="navbar-brand" to="/home">
            <b>
              <span className="logoColor">Uni</span>Share
            </b>
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarTogglerDemo02"
            aria-controls="navbarTogglerDemo02"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <Link className="nav-link active" to="/home">
                  Home
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to="/allFile">
                  All File
                </Link>
              </li>
              <li className="nav-item">
                {user?.uid ? (
                  ""
                ) : (
                  <Link to="/login" className="nav-link">
                    Login
                  </Link>
                )}
              </li>
              <li className="nav-item">
                {user?.uid && (
                  <Link to="/dashboard" className="nav-link">
                    Dashboard
                  </Link>
                )}
              </li>
              <li className="nav-item">
                <p className="nav-link border">Point: {users[0]?.point}</p>
              </li>
              <li className="nav-item">
                {user?.uid && (
                  <>
                    <buttoh onClick={handleLogout} className="btn nav-link">
                      Sign Out
                    </buttoh>
                  </>
                )}
              </li>
            </ul>
          </div>
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
