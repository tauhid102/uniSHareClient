import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../../../context/AuthProvider";
import "../../Style/style.css";
import Dropdown from "react-bootstrap/Dropdown";
import { Button } from "react-bootstrap";
const Navbar = () => {
  const { user, logout } = useContext(AuthContext);
  const handleLogout = () => {
    logout().then(() => {});
  };
  const [users, setUser] = useState({});
  useEffect(() => {
    fetch(`https://uni-share-server.vercel.app/point/user?email=${user?.email}`)
      .then((res) => res.json())
      .then((data) => setUser(data));
  }, [users]);
  return (
    <div>
      {user?.uid && (
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <div className="container">
            <Link className="navbar-brand" to="/home">
                <span className="logoColor">Uni</span>Share
            </Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0 ">
              <li className="nav-item">
                {user?.uid && (
                  <Link className="nav-link" to="/allFile">
                    <span className="h6">All Files</span>
                  </Link>
                )}
              </li>
            </ul>
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
              <ul className="navbar-nav ms-auto mb-2 mb-lg-0 ">
                <li className="nav-item">
                  {user?.uid ? (
                    ""
                  ) : (
                    <Link to="/login" className="nav-link"></Link>
                  )}
                </li>
                <li className="nav-item">
                  {user?.uid && (
                    <>
                      <Dropdown>
                        <Dropdown.Toggle
                          id="dropdown-basic"
                          className="navbarDropdown"
                        >
                          <img
                            src={user.photoURL}
                            class="d-flex m-auto  profileImageNavbar"
                            alt="..."
                            height="50px"
                            width="50px"
                          />
                        </Dropdown.Toggle>
                        <Dropdown.Menu>
                          <Dropdown.Item as={Link} to="/dashboard">
                            Dashboard
                          </Dropdown.Item>
                          <Dropdown.Item>
                            {user?.uid && <h6>Point:{users[0]?.point}</h6>}
                          </Dropdown.Item>
                          <Dropdown.Item>
                            <Button
                              onClick={handleLogout}
                              className="btn btn-danger"
                            >
                              Sign Out
                            </Button>
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </>
                  )}
                </li>
              </ul>
            </div>
          </div>
        </nav>
      )}
    </div>
  );
};

export default Navbar;
