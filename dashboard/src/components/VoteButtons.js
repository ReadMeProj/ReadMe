import "../App.css";
import React, { Component } from "react";
import { axiosClient } from "../network/apiClient";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

class VoteButtons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemId: props.id,
      itemType: props.type,
      userVote: null,
      itemData: [],
    };
  }
  async componentDidMount() {
    // Get the votes got the item with the given id.
    var userId = window.localStorage.getItem("UserId");
    if (this.state.itemId) {
      await axiosClient
        .get(`/api/vote/${this.state.itemId}/user/${userId}`)
        .then((response) => {
          if (response.data["Error"] == null) {
            this.setState({
              userVote: response.data["Data"].up ? "up" : "down",
            });
          } else {
            this.setState({ userVote: "none" });
          }
        })
        .then(
          axiosClient
            .get(`/api/${this.state.itemType}/id/${this.state.itemId}`)
            .then((response) => {
              this.setState({ itemData: response.data["Data"] });
            })
        );
    }
  }

  getVoteButtons(userVote, votes) {
    return (
      <div className="row">
        <div className="col-1">
          <div className="row d-flex justify-content-center">
            <FontAwesomeIcon
              icon={["fas", "arrow-alt-circle-up"]}
              size="lg"
              color={userVote === "up" ? "green" : "gray"}
              onClick={() => {
                if (userVote !== "up")
                  this.vote(this.state.itemType, this.state.itemId, "up");
                else this.vote(this.state.itemType, this.state.itemId, "none");
              }}
              cursor="pointer"
            />
          </div>
          <div className="row d-flex justify-content-center">
            <small>{votes[0]}</small>
          </div>
        </div>
        <div className="col-1">
          <div className="row d-flex justify-content-center">
            <FontAwesomeIcon
              icon={["fas", "arrow-alt-circle-down"]}
              size="lg"
              color={userVote === "down" ? "red" : "gray"}
              onClick={() => {
                if (userVote !== "down")
                  this.vote(this.state.itemType, this.state.itemId, "down");
                else this.vote(this.state.itemType, this.state.itemId, "none");
              }}
              cursor="pointer"
            />
          </div>
          <div className="row d-flex justify-content-center">
            <small>{votes[1]}</small>
          </div>
        </div>
      </div>
    );
  }

  async vote(itemType, itemId, voteType) {
    var userId = window.localStorage.getItem("UserId");
    let headers = {
      headers: {
        Token: localStorage.getItem("Token"),
        Username: localStorage.getItem("Username"),
      },
    };
    await axiosClient
      .post(`/api/votes/${itemType}/${itemId}/${voteType}`, {}, headers)
      .then(() => {
        if (this.state.itemId) {
          axiosClient
            .get(`/api/vote/${this.state.itemId}/user/${userId}`)
            .then((response) => {
              if (response.data["Error"] == null) {
                this.setState({
                  userVote: response.data["Data"].up ? "up" : "down",
                });
              } else {
                this.setState({ userVote: "none" });
              }
            })
            .then(
              axiosClient
                .get(`/api/${this.state.itemType}/id/${this.state.itemId}`)
                .then((response) => {
                  this.setState({ itemData: response.data["Data"] });
                })
            );
        }
      }); // To re-render the component with the new info from the server after voting.
  }

  render() {
    const { userVote: curUserVote, itemData: item } = this.state;
    var votes = [0, 0];
    if (item.votes) votes = [item.votes.up, item.votes.down];
    if (item.fakevotes) votes = [item.fakevotes.up, item.fakevotes.down];

    return (
      <div style={{ marginLeft: "20px" }}>
        {this.getVoteButtons(curUserVote, votes)}
      </div>
    );
  }
}

export default VoteButtons;
