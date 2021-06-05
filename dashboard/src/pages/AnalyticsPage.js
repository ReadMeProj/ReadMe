import "../App.css";
import React, { Component } from "react";

class AnalyticsPage extends Component {
  constructor(props) {
    super(props);
    this.state = { analyticsType: "none" };
  }
  render() {
    const { analyticsType: type } = this.state;
    return (
      <div>
        <br />
        <h2>Advanced Analytics!</h2>
        <hr />
        <br />
        <div className="d-flex justify-content-around">
          <button className="btn btn-info">Show analytics type 1</button>
          <button className="btn btn-info">Show analytics type 2</button>
          <button className="btn btn-info">Show analytics type 3</button>
        </div>
      </div>
    );
  }
}

export default AnalyticsPage;
