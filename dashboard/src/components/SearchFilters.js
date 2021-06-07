import React from "react";

function SearchFilters(params) {
  return (
    <div className="searchFilterBox">
      <form action="/" method="get">
        <div className="row align-items-center" style={{ alignSelf: "center" }}>
          <div className="col-2">Filters:</div>
          <div
            style={{
              borderRight: "2px",
              borderRightStyle: "solid",
              borderColor: "#eaf6fd",
              minHeight: "100px",
            }}
          ></div>
          <div className="col">
            <label>TAGS:</label>
            <input type="text" placeholder=" tag1,tag2,tag3.." name="tags" />
          </div>
        </div>
      </form>
    </div>
  );
}

export default SearchFilters;
