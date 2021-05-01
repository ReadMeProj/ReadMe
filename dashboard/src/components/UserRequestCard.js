import React from "react";
import { Link } from "react-router-dom";

function UserRequestCard(props) {
  var requestTitle = "";
  var url = "";
  var id = "12345";

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
  } else {
    url = "";
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
              <p>Status: {"on hold"}</p>
              <Link to={"/fillRequest/" + id} className="btn btn-warning">
                Request Again
              </Link>
              <button className="btn btn-danger">Delete Request</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserRequestCard;
