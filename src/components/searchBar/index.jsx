import React from "react";
import "./style.css";

export const SearchBar = ({ value, onChange }) => {
  return (
    <input
      type="text"
      name="filter"
      value={value}
      onChange={onChange}
      placeholder="Find by title"
      className="search-field"
    />
  );
};
