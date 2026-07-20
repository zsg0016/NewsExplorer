import "./SearchBar.css";
import { useState } from "react";

function SearchBar({ handleSubmit }) {
  const [currentValue, setCurrentValue] = useState("");
  const handleChange = (e) => {
    setCurrentValue(e.target.value);
  };
  return (
    <form
      className="search__form"
      onSubmit={(e) => {
        e.preventDefault();
        handleSubmit(currentValue);
      }}
    >
      <input
        className="search__input"
        type="text"
        placeholder="Enter topic"
        name="search-input"
        onChange={(e) => {
          handleChange(e);
        }}
      />
      <input className="search__submit-button" type="submit" value="Search" />
    </form>
  );
}

export default SearchBar;
