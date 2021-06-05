import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { isLoggedIn, logout } from "../network/lib/apiUserFunctions";

function NavBar() {
  var sessionUp;
  sessionUp = isLoggedIn();
  return (
    <div>
      {NavBarLogin(sessionUp)}
      {NavBarOption("home", "/", "Home", sessionUp)}
      {NavBarOption(
        "grin-stars",
        "/recommendations",
        "You Might Like",
        sessionUp
      )}
      {NavBarOption("diagnoses", "/analytics", "Analytics", sessionUp)}
      {NavBarOption("star", "/likes", "My Favorites", sessionUp)}
      {NavBarOption("user-circle", "/profile", "My Profile", sessionUp)}
      {NavBarOption("inbox", "/requests", "Answer Requests", sessionUp)}
      {NavBarOption("tasks", "/userRequests", "My Requests", sessionUp)}
    </div>
  );
}

function NavBarOption(iconName, linkTo, name, isSessionUp) {
  if (isSessionUp) return NavLinkOption(iconName, linkTo, name);
  return NavBlockedOption(iconName, name);
}
function NavLinkOption(iconName, linkTo, name) {
  return (
    <dd className="navOption">
      <FontAwesomeIcon icon={["fas", `${iconName}`]} size="lg" />
      <Link to={linkTo} className="navLink">
        {name}
      </Link>
    </dd>
  );
}
function NavBlockedOption(iconName, name) {
  return (
    <dd className="navOption">
      <FontAwesomeIcon
        icon={["fas", `${iconName}`]}
        size="lg"
        style={{ marginRight: "20px" }}
      />
      <button
        className="astext"
        onClick={() => {
          alert("Please log in!");
        }}
      >
        {name}
      </button>
    </dd>
  );
}

function NavBarLogin(isSessionUp) {
  if (isSessionUp)
    return (
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
  return (
    <dd className="navOption">
      <FontAwesomeIcon icon={["fas", "user-circle"]} size="lg" />
      <Link to="/login" className="navLink">
        Login
      </Link>
    </dd>
  );
}

export default NavBar;
