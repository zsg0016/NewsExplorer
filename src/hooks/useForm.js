import { useState } from "react";
import isURL from "validator/lib/isURL";

export function useForm(defaultValues) {
  const [values, setValues] = useState(defaultValues);
  const [formValid, setFormValid] = useState(false);
  const [emailValid, setEmailValid] = useState(true);

  const isEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    setEmailValid(emailRegex.test(value));
  };

  const handleChange = (event) => {
    const { value, name } = event.target;
    setValues({ ...values, [name]: value });
  };
  const handleReset = () => {
    setValues(defaultValues);
    setFormValid(false);
  };

  const toggleFormValid = () => {
    const valid = Object.keys(values).every((key) => {
      return values[key] !== "" && (key !== "image" || isURL(values[key]));
    });
    setFormValid(valid);
  };
  return {
    values,
    handleChange,
    setValues,
    handleReset,
    formValid,
    setFormValid,
    toggleFormValid,
    isEmail,
    emailValid,
    setEmailValid,
  };
}
