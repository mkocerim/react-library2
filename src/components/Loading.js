import React from "react";

const Loading = () => {
  return (
    <div
      className="container d-flex justify-content alings-item-center"
      style={{
        widows: "100vw",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <button className="btn btn-primary mx-1" type="button">
        <span
          className="spinner-grow spinner-grow-lg"
          aria-hidden="true"
        ></span>
        <span className="visually-hidden">Loading...</span>
      </button>
      <button className="btn btn-primary" type="button">
        <span
          className="spinner-grow spinner-grow-lg"
          aria-hidden="true"
        ></span>
        Loading...
      </button>
    </div>
  );
};

export default Loading;
