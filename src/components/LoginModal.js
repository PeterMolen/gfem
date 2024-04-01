import React from "react";
import "./LoginModal.css";

const Modal = ({ closeModal, children }) => {
  return (
    <div className="modal-overlay" onClick={closeModal}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="close-modal" onClick={closeModal}>
          &times;
        </button>
        {children}
      </div>
    </div>
  );
};
 
export default Modal;