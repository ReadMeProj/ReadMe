import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

function NavBar(params) {
  return (
    <div>
      <dl>
        <dd className="navOption">
          <FontAwesomeIcon icon={["fas", "home"]} size="lg" />
          <Link to="/" className="navLink">
            Dashboard
          </Link>
        </dd>
        <dd className="navOption">
          <FontAwesomeIcon icon={["fas", "user-circle"]} size="lg" />
          <Link to="/login" className="navLink">
            My Profile
          </Link>
        </dd>
        <dd className="navOption">
          <FontAwesomeIcon icon={["fas", "inbox"]} size="lg" />
          <Link to="/requests" className="navLink">
            My Requests
          </Link>
        </dd>
        <dd className="navOption">
          <FontAwesomeIcon icon={["fas", "tasks"]} size="lg" />
          <Link to="/requests" className="navLink">
            Requested Of Me
          </Link>
        </dd>
      </dl>
    </div>
  );
}

export default NavBar;
