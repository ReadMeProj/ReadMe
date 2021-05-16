import React from "react";
import "../assets/Icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const SearchBar = () => (
  <form action="/" method="get">
    <div className="searchBar" style={{ marginLeft: "20%" }}>
      <input
        type="text"
        id="header-search"
        placeholder="Search articles"
        name="q"
        style={{
          minWidth: "400px",
          backgroundColor: "transparent",
          border: "none",
        }}
      />
      <button type="submit" className="iconButton">
        <FontAwesomeIcon icon={["fas", "search"]} size="lg" />
      </button>
    </div>
  </form>
);

export default SearchBar;
