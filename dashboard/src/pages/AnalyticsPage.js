import "../App.css";
import React, { Component } from "react";

class AnalyticsPage extends Component {
  constructor(props) {
    super(props);
    this.state = { articlesData: [] };
  }
  render() {
    const { articlesData: articles } = this.state;
    return <div></div>;
  }
}

export default AnalyticsPage;
