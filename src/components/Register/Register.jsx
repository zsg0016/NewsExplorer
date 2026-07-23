import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import { useForm } from "../../hooks/useForm";
import { useEffect, useState } from "react";
import "./Register.css";

function Register({
  isOpen,
  handleKeyPress,
  onClose,
  handleSubmit,
  failed,
  activeModal,
  onSwitch,
}) {
  const [change, setChange] = useState(true);
  const {
    values,
    formValid,
    handleChange,
    handleReset,
    toggleFormValid,
    isEmail,
    emailValid,
  } = useForm({
    email: "",
    password: "",
    name: "",
  });

  const handleSubmitRegister = (event) => {
    event.preventDefault();
    const newUser = {
      email: values.email,
      password: values.password,
      name: values.name,
    };
    handleSubmit(newUser, handleReset);
  };

  useEffect(() => {
    toggleFormValid();
  }, [change]);

  return (
    <ModalWithForm
      isOpen={isOpen}
      title="Sign up"
      onClose={onClose}
      handleSubmit={handleSubmitRegister}
      handleKeyPress={handleKeyPress}
      buttonText="Sign up"
      valid={formValid && emailValid}
      activeModal={activeModal}
      onSwitch={onSwitch}
    >
      <fieldset className="form__area">
        <label className="form__label" htmlFor="register-email">
          Email
          <input
            type="email"
            placeholder="Enter email"
            id="register-email"
            name="email"
            value={values.email}
            className="form__input"
            onChange={(e) => {
              handleChange(e);
              setChange(!change);
              isEmail(e.target.value);
            }}
            required
          />
          {!emailValid && (
            <label className="form__error">Invalid email address</label>
          )}
        </label>
        <label className="form__label" htmlFor="register-password">
          Password
          <input
            type="password"
            placeholder="Enter password"
            id="register-password"
            name="password"
            value={values.password}
            className="form__input"
            onChange={(e) => {
              handleChange(e);
              setChange(!change);
            }}
            required
          />
        </label>
        <label className="form__label" htmlFor="register-name">
          Username
          <input
            type="text"
            placeholder="Enter your username"
            id="register-name"
            name="name"
            className="form__input"
            value={values.name}
            onChange={(e) => {
              handleChange(e);
              setChange(!change);
            }}
            required
          />
        </label>
      </fieldset>
      {failed && (
        <label className="form__error">Invalid registration data</label>
      )}
    </ModalWithForm>
  );
}

export default Register;
