import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { isLoggedIn, logout } from "../network/lib/apiUserFunctions";
function NavBar() {
  // Check if user is logged in and create the login/logout option.
  var loginLogout;
  var sessionUp;
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
            logout("blah", "blah"); //TODO
          }}
        >
          Logout
        </button>
      </dd>
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
  }
  return (
    <div>
      <dl>
        {loginLogout}
        <dd className="navOption">
          <FontAwesomeIcon icon={["fas", "home"]} size="lg" />
          <Link to="/" className="navLink">
            Dashboard
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
}

export default NavBar;
