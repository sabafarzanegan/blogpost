import { useState } from "react";
import { Poststore } from "../../store/Poststore";
import "./searcgInput.css";

import { BiSearchAlt } from "react-icons/bi";

function SearchInput() {
  const [value, setValue] = useState("");
  const { setSearchQuery } = Poststore((state) => state);
  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = e.target.value;
    setValue(inputValue);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSearchQuery(value);
  };
  return (
    <div className="search-input-container">
      <form className="from-search" onSubmit={handleSubmit}>
        <input
          value={value}
          type="text"
          placeholder="در بین مقالات جستجو کنید..."
          className="search-input"
          onChange={handleSearch}
        />
        <button type="submit">
          <BiSearchAlt />
        </button>
      </form>
    </div>
  );
}

export default SearchInput;
