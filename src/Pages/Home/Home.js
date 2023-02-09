import React from "react";
import image3 from "../../images/12022.jpg";
import { Link } from "react-router-dom";
import Forum from "../Forum/Forum"
import '../Style/style.css';
const Home = () => {
  return (
    <div>
      <div>
        <div className="">
        </div>
        <div className="">
          <div className="">
            <img
              src={image3}
              className="d-block w-100"
              height="550px"
              alt="..."
            />
            <div className="carousel-caption d-none d-md-block">
              <Link to="/dashboard/uploadFile" className="btn btn-danger">
                Upload File
              </Link>
            </div>
          </div>
        </div>
      </div>
      <Forum></Forum>
    </div>
  );
};

export default Home;
