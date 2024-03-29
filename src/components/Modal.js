import React from "react";

const Modal = (props) => {
  const { onCancel, onConfirm, explanation, title } = props;
  return (
    <div
      onClick={onCancel}
      style={{
        position: "absolute",
        top: 0,
        left: 0,
        width: "%100",
        height: "100vh",
        backgroundColor: "rgba(0,0,0,0.2)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "default",
        zIndex: "1",
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
        <h1 className="text-center">{title}</h1>
        <p className="text-center">{explanation}</p>
        <div className="d-flex justify-content-center">
          <button
            onClick={onCancel}
            className="btn btn-outline-danger btn-sm mx-2"
          >
            Cancel
          </button>
          <button
            onClick={onConfirm}
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
