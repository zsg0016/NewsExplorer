import "../Modal/Modal.css";

function PopUp({ isOpen, handleOpenLoginModal, onClose }) {
  return (
    <div className={`modal ${isOpen ? `modal__is-opened` : ``}`}>
      <div className="modal__container popup">
        <button type="button" className="modal__close-btn" onClick={onClose} />
        <h1 className="modal__title">
          Registration successfully <br></br>completed!
        </h1>
        <span className="modal__switch" onClick={handleOpenLoginModal}>
          Sign in
        </span>
      </div>
    </div>
  );
}

export default PopUp;
