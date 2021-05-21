import React from "react";

function UserRequestCard(props) {
  var requestTitle = "";
  var url = "";
  var id = "";

  if (props != null) {
    if (props.title != null) {
      requestTitle =
        props.title.length > 50
          ? props.title.slice(0, 50).concat("...")
          : props.title;
    } else {
      requestTitle = "Title.";
    }
    if (props.url != null) url = props.url;
    if (props.id != null) id = props.id;
  }

  return (
    <div className="container-fluid align-items-center">
      <div className="row">
        <div className="col align-items-center">
          <div className="articleBox" style={{ width: "80%" }}>
            <a
              href={props.url}
              className="cardLink"
              target="_blank"
              rel="noreferrer"
            >
              <h5>{requestTitle}</h5>
            </a>
            <hr />
            <div className="row justify-content-around">
              <p>Status: {"on hold"}</p>
              <button className="btn btn-warning">Request Again</button>
              <button className="btn btn-danger">Delete Request</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserRequestCard;
