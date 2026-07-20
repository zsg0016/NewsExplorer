import ModalWithForm from "../ModalWithForm/ModalWithForm.jsx";
import "../ModalWithForm/ModalWithForm.css";
import { useForm } from "../../hooks/useForm";
import { useEffect, useState } from "react";

function Login({
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
  });

  const handleSubmitLogin = (event) => {
    event.preventDefault();
    const loginData = {
      email: values.email,
      password: values.password,
    };
    handleSubmit(loginData, handleReset);
  };

  useEffect(() => {
    toggleFormValid();
  }, [change]);

  return (
    <ModalWithForm
      isOpen={isOpen}
      title="Sign in"
      onClose={onClose}
      handleSubmit={handleSubmitLogin}
      handleKeyPress={handleKeyPress}
      buttonText="Sign In"
      valid={formValid && emailValid}
      activeModal={activeModal}
      onSwitch={onSwitch}
    >
      <fieldset className="form__area">
        <label className="form__label" htmlFor="login-email">
          Email
          <input
            type="email"
            placeholder="Email"
            id="login-email"
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
        <label className="form__label" htmlFor="login-password">
          Password
          <input
            type="password"
            placeholder="Password"
            id="login-password"
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
      </fieldset>
      {failed && (
        <label className="form__error">Invalid email or password</label>
      )}
    </ModalWithForm>
  );
}

export default Login;
