import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { isLoggedIn, logout } from "../network/lib/apiUserFunctions";
import PowerUserIcon from "../assets/PowerUser.png";

function NavBar(props) {
  var sessionUp;
  sessionUp = isLoggedIn();
  var isUserPremium;
  isUserPremium = props && props.isPremium ? props.isPremium : false;
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
      {NavBarOption(
        "diagnoses",
        "/analytics",
        "Analytics",
        sessionUp,
        true,
        isUserPremium
      )}
      {NavBarOption("star", "/likes", "My Favorites", sessionUp)}
      {NavBarOption("user-circle", "/profile", "My Profile", sessionUp)}
      {NavBarOption("inbox", "/requests", "Answer Requests", sessionUp)}
      {NavBarOption(
        "tasks",
        "/userRequests",
        "My Requests",
        sessionUp,
        true,
        isUserPremium
      )}
      {NavBarAbout()}
    </div>
  );
}

function NavBarOption(
  iconName,
  linkTo,
  name,
  isSessionUp,
  forPremium,
  userIsPremium
) {
  if (isSessionUp) {
    if ((forPremium && userIsPremium) || !forPremium)
      return NavLinkOption(iconName, linkTo, name, forPremium);
  }
  return NavBlockedOption(iconName, name, forPremium);
}
function NavLinkOption(iconName, linkTo, name, forPremium) {
  return (
    <dd className="navOption">
      <FontAwesomeIcon icon={["fas", `${iconName}`]} size="lg" />
      <Link to={linkTo} className="navLink">
        {name}
      </Link>
      {forPremium ? (
        <img
          width={50}
          height={50}
          src={PowerUserIcon}
          alt="logo"
          style={{ alignSelf: "left", paddingright: 30 }}
        />
      ) : null}
    </dd>
  );
}
function NavBlockedOption(iconName, name, forPremium) {
  return (
    <dd className="navOption">
      <FontAwesomeIcon icon={["fas", `${iconName}`]} size="lg" />
      <button
        className="astext"
        onClick={() => {
          forPremium
            ? alert("This is an option for a premium user!")
            : alert("Please log in!");
        }}
      >
        {name}
      </button>
      {forPremium ? (
        <img
          width={50}
          height={50}
          src={PowerUserIcon}
          alt="logo"
          style={{
            alignSelf: "left",
            paddingright: 30,
            paddingTop: 0,
            paddingBottom: 0,
          }}
        />
      ) : null}
    </dd>
  );
}

function NavBarLogin(isSessionUp) {
  if (isSessionUp)
    return (
      <dd className="navOption">
        <FontAwesomeIcon icon={["fas", "door-open"]} size="lg" />
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

function NavBarAbout() {
  return (
    <dd className="navOption">
      <FontAwesomeIcon icon={faInfoCircle} size="lg" />
      <Link to="/about" className="navLink">
        About ReadMe
      </Link>
    </dd>
  );
}

export default NavBar;
