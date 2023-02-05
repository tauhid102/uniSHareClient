import React from "react";

const Loading = () => {
  return (
    <div className="d-flex justify-content-center mt-5">
      <div
        className="spinner-grow"
        style={{ width: "3rem", height: "3rem" }}
        role="status"
      >
        <span className="visually-hidden">Loading...</span>
      </div>
    </div>
  );
};

export default Loading;
