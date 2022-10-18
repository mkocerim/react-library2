import React, { useState } from "react";

const Modal = (props) => {
  const { setShowModal, yapilmasiGerekenIs } = props;
  return (
    <div
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.3)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      className="container"
    >
      <div
        style={{
          width: "50%",
          padding: "20px",
          backgroundColor: "#fff",
          borderRadius: "5px",
        }}
      >
        <h1>Modal</h1>
        <div className="d-flex justify-content-center">
          <button
            onClick={() => setShowModal(false)}
            className="btn btn-outline-danger btn-sm mx-2"
          >
            Cancel
          </button>
          <button
            onClick={yapilmasiGerekenIs}
            className="btn btn-outline-success btn-sm mx-2"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
