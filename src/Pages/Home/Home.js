import React from "react";
import image1 from "../../images/Carosol_1.jpg";
import image2 from "../../images/Carosol_3.jpg";
import image3 from "../../images/Carosol_4.jpg";
import { Link } from "react-router-dom";
import AllFile from "../AllFile/AllFile";
const Home = () => {
  return (
    <div>
      <div
        id="carouselExampleCaptions"
        className="carousel slide mb-4"
        data-bs-ride="carousel"
      >
        <div className="carousel-indicators">
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="0"
            className="active"
            aria-current="true"
            aria-label="Slide 1"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="1"
            aria-label="Slide 2"
          ></button>
          <button
            type="button"
            data-bs-target="#carouselExampleCaptions"
            data-bs-slide-to="2"
            aria-label="Slide 3"
          ></button>
        </div>
        <div className="carousel-inner">
          <div className="carousel-item active">
            <img
              src={image1}
              className="d-block w-100"
              height="500px"
              alt="..."
            />
            <div className="carousel-caption d-none d-md-block">
              <Link to="/dashboard/uploadFile" className="btn btn-danger">
                Upload File
              </Link>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src={image2}
              className="d-block w-100"
              height="500px"
              alt="..."
            />
            <div className="carousel-caption d-none d-md-block">
              <Link to="/dashboard/uploadFile" className="btn btn-danger">
                Upload File
              </Link>
            </div>
          </div>
          <div className="carousel-item">
            <img
              src={image3}
              className="d-block w-100"
              height="500px"
              alt="..."
            />
            <div className="carousel-caption d-none d-md-block">
              <Link to="/dashboard/uploadFile" className="btn btn-danger">
                Upload File
              </Link>
            </div>
          </div>
        </div>
        <button
          className="carousel-control-prev"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="prev"
        >
          <span
            className="carousel-control-prev-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Previous</span>
        </button>
        <button
          className="carousel-control-next"
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide="next"
        >
          <span
            className="carousel-control-next-icon"
            aria-hidden="true"
          ></span>
          <span className="visually-hidden">Next</span>
        </button>
      </div>
      <AllFile></AllFile>
    </div>
  );
};

export default Home;
