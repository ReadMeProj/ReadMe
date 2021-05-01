import React from "react";
import { Link } from "react-router-dom";

function RequestCard(props) {
  var requestTitle = "";
  var url = "";
  var id = "";

  if (props != null && props.title != null) {
    if (props.title.length > 50) {
      requestTitle = props.title.slice(0, 50).concat("...");
    } else {
      requestTitle = props.title;
    }
  } else {
    requestTitle = "Title";
  }
  if (props != null && props.url != null) {
    url = props.url;
  }
  if (props != null && props.id != null) {
    id = props.id;
  }

  return (
    <div className="container-fluid align-items-center">
      <div className="row">
        <div className="col align-items-center">
          <div className="articleBox" style={{ width: "600px" }}>
            <a href={props.url} className="cardLink" target="_blank">
              <h5>{requestTitle}</h5>
            </a>
            <hr />
            <div className="row justify-content-around">
              <a href={props.url} className="btn btn-info" target="_blank">
                View article
              </a>
              <Link to={"/fillRequest/id=" + id} className="btn btn-info">
                Answer
              </Link>
              <button className="btn btn-danger">Deny</button>
              <button className="btn btn-info">Put On Hold</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default RequestCard;
