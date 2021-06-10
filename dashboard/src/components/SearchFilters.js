import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function SearchFilters(params) {
  const [toDateInit, setToDate] = useState(new Date());
  const [fromDateInit, setFromDate] = useState(1577829600000);

  return (
    <div className="searchFilterBox">
      <div className="d-flex justify-content-center">Search Filters</div>
      <div
        style={{
          borderTop: "2px",
          borderTopStyle: "solid",
          borderColor: "#eaf6fd",
        }}
      />
      <div
        className="d-flex justify-content-around"
        style={{ alignItems: "center" }}
      >
        <div
          className="d-flex justify-content-around"
          style={{ alignItems: "center" }}
        >
          <div className="col-6">
            <form action="/" method="get">
              <label>Include Tag:</label>
              <input type="text" placeholder=" Tag for articles" name="tag" />
              <br />
              <button className="btn btn-outline-info" type="submit">
                Filter Tag
              </button>
            </form>
          </div>
          <div className="col-7">
            <form action="/" method="get">
              <div className="row" style={{ alignItems: "center" }}>
                <div className="col-2">From-to:</div>
                <div className="col-5">
                  <DatePicker
                    selected={fromDateInit}
                    onChange={(date) => setFromDate(date)}
                    name="from"
                  />
                  <br />
                  <DatePicker
                    selected={toDateInit}
                    onChange={(date) => setToDate(date)}
                    name="to"
                  />
                </div>
                <div className="col-3">
                  <button className="btn btn-outline-info" type="submit">
                    Filter Date
                  </button>
                </div>
              </div>
            </form>
          </div>
          <div
            style={{
              borderRight: "2px",
              borderRightStyle: "solid",
              borderColor: "#eaf6fd",
              minHeight: "80px",
            }}
          />
        </div>
        <div className="col-2">
          <button
            className="btn btn-outline-info"
            style={{ width: "200px" }}
            onClick={() => {
              params.refreshFeedFunc("real");
            }}
          >
            Most Reliable First
          </button>
          <button
            className="btn btn-outline-info"
            style={{ width: "200px" }}
            onClick={() => {
              params.refreshFeedFunc("fake");
            }}
          >
            Least Reliable First
          </button>
        </div>
      </div>
    </div>
  );
}

export default SearchFilters;
