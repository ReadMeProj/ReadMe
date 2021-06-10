import "../App.css";
import React, { Component } from "react";
import Tabs from 'react-bootstrap/Tabs'
import Tab from 'react-bootstrap/Tab'
import { Bar, Doughnut } from 'react-chartjs-2';
import { getVotesBySites, getTagsCount } from "../network/lib/apiRequestFunctions"
import Spinner from 'react-bootstrap/Spinner'


class AnalyticsPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      VotesAnalytics: {
        data: null,
        isFetched: false
      },
      TagsAnalytics: {
        data: null,
        isFetched: false
      }
    };
  }

  componentDidMount() {
    this.fetchVotesAnalytics();
    this.fetchTagsAnalytics();
  }

  async fetchVotesAnalytics() {
    let response = await getVotesBySites();
    if (response && response.data) {
      let graphLabels = Object.keys(response.data.sites).sort(function (a, b) {
        return response.data.sites[a].up + response.data.sites[a].down > response.data.sites[b].up + response.data.sites[b].down ? 1 : -1
      }).slice(-6, -1);
      let downData = [];
      let upData = [];
      graphLabels.forEach((label) => {
        downData.push(response.data.sites[label].down);
        upData.push(response.data.sites[label].up);
      })
      this.setState({
        ...this.state,
        VotesAnalytics: {
          data:
          {
            labels: graphLabels,
            upData,
            downData
          },
          isFetched: true
        }
      })
    }
  }

  async fetchTagsAnalytics() {
    let response = await getTagsCount();
    if (response && response.data) {
      let topTenTags = Object.keys(response.data.labels).sort(function (a, b) {
        return response.data.labels[a].score > response.data.labels[b].score ? 1 : -1
      }).slice(-11, -1);
      let scores = [];
      topTenTags.forEach((tag) => {
        scores.push(response.data.labels[tag].score)
      })
      this.setState({
        ...this.state,
        TagsAnalytics: {
          data: {
            labels: topTenTags,
            scores
          },
          isFetched: true
        }
      })
    }
  }


  renderBarChart(barChartData) {
    const data = {
      labels: barChartData.labels,
      datasets: [
        {
          label: '# of Down Votes',
          data: barChartData.downData,
          backgroundColor: 'rgb(255, 99, 132)',
        },
        {
          label: '# of Up Votes',
          data: barChartData.upData,
          backgroundColor: 'rgb(54, 162, 235)',
        }
      ],
    };

    const options = {
      responsive: true,
      maintainAspectRatio: false
    };


    return (
      <div className="chart">
        <Bar data={data} options={options} />
      </div>
    )
  }


  renderDonutChart(donutData) {
    const data = {
      labels: donutData.labels,
      datasets: [
        {
          label: 'Tags distribution',
          data: donutData.scores,
          backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
          ],
          borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          borderWidth: 1,
        },
      ],
    };
    const options = {
      responsive: true,
      maintainAspectRatio: false
    }

    return (
      <div className="chart">
        <Doughnut data={data} options={options} />
      </div>
    )
  }

  renderLoading() {
    return (
      <Spinner className="Loading" animation="border" />
    )
  }
  render() {
    return (
      <div>
        <br />
        <h2>Advanced Analytics!</h2>
        <hr />
        <br />
        <Tabs defaultActiveKey="votes" transition={false} id="noanim-tab-example">
          <Tab eventKey="votes" title="Votes by sites">
            {this.state.VotesAnalytics.isFetched ? this.renderBarChart(this.state.VotesAnalytics.data) :
              this.renderLoading()}
          </Tab>
          <Tab eventKey="tags" title="Tags distribution">
            {this.state.TagsAnalytics.isFetched ? this.renderDonutChart(this.state.TagsAnalytics.data) :
              this.renderLoading()}
          </Tab>
        </Tabs>
      </div>
    );
  }
}

export default AnalyticsPage;
