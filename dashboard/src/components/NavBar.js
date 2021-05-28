import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { isLoggedIn, logout } from "../network/lib/apiUserFunctions";
function NavBar() {
  // Check if user is logged in and create the login/logout option.
  var loginLogout;
  var sessionUp;
  var navBar;
  sessionUp = isLoggedIn();
  if (sessionUp) {
    loginLogout = (
      <dd className="navOption">
        <FontAwesomeIcon
          icon={["fas", "door-open"]}
          size="lg"
          style={{ marginRight: "20px" }}
        />
        <button
          className="astext"
          onClick={() => {
            var Token = window.localStorage.getItem("Token");
            var Username = window.localStorage.getItem("Username");
            logout(Token, Username);
          }}
        >
          Logout
        </button>
      </dd>
    );
    // set up the rest of the navbar
    navBar = (
      <div>
        <dl>
          {loginLogout}
          <dd className="navOption">
            <FontAwesomeIcon icon={["fas", "home"]} size="lg" />
            <Link to="/" className="navLink">
              Home
            </Link>
          </dd>
          <dd className="navOption">
            <FontAwesomeIcon icon={["fas", "grin-stars"]} size="lg" />
            <Link to="/recommendations" className="navLink">
              You Might Like
            </Link>
          </dd>
          <dd className="navOption">
            <FontAwesomeIcon icon={["fas", "star"]} size="lg" />
            <Link to="/likes" className="navLink">
              Likes
            </Link>
          </dd>
          <dd className="navOption">
            <FontAwesomeIcon icon={["fas", "user-circle"]} size="lg" />
            <Link to="/profile" className="navLink">
              My Profile
            </Link>
          </dd>
          <dd className="navOption">
            <FontAwesomeIcon icon={["fas", "inbox"]} size="lg" />
            <Link to="/requests" className="navLink">
              Answer Requests
            </Link>
          </dd>
          <dd className="navOption">
            <FontAwesomeIcon icon={["fas", "tasks"]} size="lg" />
            <Link to="/userRequests" className="navLink">
              My Requested
            </Link>
          </dd>
        </dl>
      </div>
    );
  } else {
    loginLogout = (
      <dd className="navOption">
        <FontAwesomeIcon icon={["fas", "user-circle"]} size="lg" />
        <Link to="/login" className="navLink">
          Login
        </Link>
      </dd>
    );
    navBar = (
      <div>
        <dl>
          {loginLogout}
          <dd className="navOption">
            <FontAwesomeIcon
              icon={["fas", "home"]}
              size="lg"
              style={{ marginRight: "20px" }}
            />
            <button
              className="astext"
              onClick={() => {
                alert("Please log in!");
              }}
            >
              Dashboard
            </button>
          </dd>
          <dd className="navOption">
            <FontAwesomeIcon
              icon={["fas", "star"]}
              size="lg"
              style={{ marginRight: "20px" }}
            />
            <button
              className="astext"
              onClick={() => {
                alert("Please log in!");
              }}
            >
              Likes
            </button>
          </dd>
          <dd className="navOption">
            <FontAwesomeIcon
              icon={["fas", "user-circle"]}
              size="lg"
              style={{ marginRight: "20px" }}
            />
            <button
              className="astext"
              onClick={() => {
                alert("Please log in!");
              }}
            >
              My Profile
            </button>
          </dd>
          <dd className="navOption">
            <FontAwesomeIcon
              icon={["fas", "inbox"]}
              size="lg"
              style={{ marginRight: "20px" }}
            />
            <button
              className="astext"
              onClick={() => {
                alert("Please log in!");
              }}
            >
              Answer Requests
            </button>
          </dd>
          <dd className="navOption">
            <FontAwesomeIcon
              icon={["fas", "tasks"]}
              size="lg"
              style={{ marginRight: "20px" }}
            />
            <button
              className="astext"
              onClick={() => {
                alert("Please log in!");
              }}
            >
              My Requested
            </button>
          </dd>
        </dl>
      </div>
    );
  }
  return navBar;
}

export default NavBar;
