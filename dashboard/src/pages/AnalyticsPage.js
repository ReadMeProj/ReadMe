import "../App.css";
import React, { Component } from "react";
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'


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
        <Tabs defaultActiveKey="home" transition={false} id="noanim-tab-example">
          <Tab eventKey="home" title="Home">
            Hi
          </Tab>
          <Tab eventKey="profile" title="Profile">
            Something else
          </Tab>
          <Tab eventKey="contact" title="Contact">
            Something different
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default AnalyticsPage;
