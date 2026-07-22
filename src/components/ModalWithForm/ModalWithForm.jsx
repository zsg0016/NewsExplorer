import { useEffect, useRef } from "react";
import "./ModalWithForm.css";
import "../Modal/Modal.css";
import { handleClicked } from "../../utils/helpers";

function ModalWithForm(props) {
  const formRef = useRef(null);

  useEffect(() => {
    if (props.isOpen) {
      document.addEventListener("keydown", props.handleKeyPress);
      if (formRef.current) {
        formRef.current.reset();
      }
    }

    return () => {
      document.removeEventListener("keydown", props.handleKeyPress);
    };
  }, [props.isOpen]);

  return (
    <div
      id="form-modal"
      className={`modal ${props.isOpen ? `modal__is-opened` : ``} modal_type_${props.name}`}
      onClick={(e) => handleClicked(e, props.onClose)}
    >
      <div className="modal__container">
        <form
          name={props.name}
          className="form"
          ref={formRef}
          onSubmit={(e) => {
            props.handleSubmit(e);
          }}
        >
          <button
            type="button"
            className="form__close-btn"
            onClick={props.onClose}
          ></button>
          <div className="form__header">
            <p className="form__title">{props.title}</p>
          </div>
          {props.children}
          <div className="form__footer">
            <input
              type="submit"
              className={`form__submit-btn ${props.valid ? `` : `form__submit-btn_disabled`}`}
              value={props.buttonText}
            ></input>
            {props.activeModal === "login" && (
              <p className="form__switch">
                or{" "}
                <span
                  className="form__switch-button"
                  onClick={() => {
                    props.onClose();
                    props.onSwitch();
                  }}
                >
                  Sign up
                </span>
              </p>
            )}
            {props.activeModal === "register" && (
              <p className="form__switch">
                or{" "}
                <span
                  className="form__switch-button"
                  onClick={() => {
                    props.onClose();
                    props.onSwitch();
                  }}
                >
                  Sign in
                </span>
              </p>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default ModalWithForm;
