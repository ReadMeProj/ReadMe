import "../App.css";
import React, { Component } from "react";
import { axiosClient } from "../network/apiClient";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
//router.HandleFunc("/api/votes/{type}/{id}/{vote}", isAuthorized(updateVotes)).Methods("POST")
class VoteButtons extends Component {
  constructor(props) {
    super(props);
    this.state = {
      itemId: props.id,
      itemType: props.type,
      userVote: "none",
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
          this.setState({ userVote: response.data["Data"].up ? "up" : "none" });
        });

      await axiosClient
        .get(`/api/${this.state.itemType}/id/${this.state.itemId}`)
        .then((response) => {
          this.setState({ itemData: response.data["Data"] });
        });
    }
  }

  getVoteButtons(userVote, votes) {
    var voteUp = "none";
    if (userVote) {
      voteUp = userVote;
    }
    return (
      <div className="row">
        <div className="col-1">
          <div className="row d-flex justify-content-center">
            <FontAwesomeIcon
              icon={["fas", "arrow-alt-circle-up"]}
              size="lg"
              color={voteUp === "up" ? "green" : "gray"}
              onClick={() => {
                this.vote(this.state.itemType, this.state.itemId, "up");
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
              color={voteUp === "down" ? "red" : "gray"}
              onClick={() => {
                this.vote(this.state.itemType, this.state.itemId, "down");
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
    let headers = {
      headers: {
        Token: localStorage.getItem("Token"),
        UserName: localStorage.getItem("Username"),
      },
    };
    axiosClient.post(
      `/api/votes/${itemType}/${itemId}/${voteType}`,
      {},
      headers
    );
    //window.location.reload(); this forces refresh for the page- not good...
  }

  render() {
    const { userVote: userVote, itemData: item } = this.state;
    var votes = [0, 0];
    if (item.votes) votes = [item.votes.up, item.votes.down];
    if (item.fakevotes) votes = [item.fakevotes.up, item.fakevotes.down];
    return <div>{this.getVoteButtons(userVote, votes)}</div>;
  }
}

export default VoteButtons;
