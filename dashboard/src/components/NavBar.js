import React from "react";
import { Link } from "react-router-dom";

function NavBar(params) {
  return (
    <div>
      <dl>
        <dd>
          <Link to="/" className="btn btn-primary">
            Dashboard
          </Link>
        </dd>
        <dd>
          <Link to="/login" className="btn btn-primary">
            My Profile
          </Link>
        </dd>
        <dd>
          <Link to="/requests" className="btn btn-primary">
            My Requests
          </Link>
        </dd>
        <dd>
          <Link to="/requests" className="btn btn-primary">
            Requested Of Me
          </Link>
        </dd>
      </dl>
    </div>
  );
}

export default NavBar;
