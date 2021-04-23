import React from "react";
import searchIcon from "../assets/search.svg";
const SearchBar = () => (
  <form action="/" method="get">
    <div className="searchBar">
      <input
        type="text"
        id="header-search"
        placeholder="Search articles"
        name="q"
      />
      <button type="submit" className="iconButton">
        <img
          width={30}
          height={30}
          className="align-self-center mr-3"
          src={searchIcon}
          alt="Search"
        />
      </button>
    </div>
  </form>
);

export default SearchBar;
