import "./App.css";
import React from "react";
import RequestsPage from "./pages/RequestsPage";
import UserRequestsPage from "./pages/UserRequestsPage";
import NavBar from "./components/NavBar";
import {
  Route,
  BrowserRouter as Router,
  Switch,
  Link,
  Redirect,
} from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "./assets/siteLogo.png";
import FeedPage from "./pages/FeedPage";
import FillRequestPage from "./pages/FillRequestPage";
import LikesPage from "./pages/LikesPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/UserProfile";
import ArticlePage from "./pages/ArticlePage";
import { isLoggedIn } from "./network/lib/apiUserFunctions";

function App() {
  // Variables to tie the search bar with the other components.
  // const { search } = window.location;
  // const query = new URLSearchParams(search).get("q");
  if (isLoggedIn()) {
    return <Redirect to="/login" />;
  }
  return (
    <div className="App">
      <Router>
        <div className="container-fluid">
          <div className="row">
            <div
              className="col-2"
              style={{
                textAlign: "start",
                padding: "10px 15px 0",
                position: "fixed",
              }}
            >
              <Link to="/">
                <img
                  width={100}
                  height={20}
                  className="float-left"
                  src={logo}
                  alt="logo"
                />
              </Link>
              <br />
              <div style={{ paddingTop: "100px" }}></div>
              <NavBar />
              <FontAwesomeIcon
                icon={["fas", "angle-up"]}
                size="lg"
                style={{ marginTop: "50px" }}
                onClick={() => window.scrollTo(0, 0)}
              />
            </div>
            <div className="col-10" style={{ marginLeft: "250px" }}>
              <div className="scrollableDiv">
                <Switch>
                  <Route exact path="/">
                    <FeedPage />
                  </Route>
                  <Route path="/profile">
                    <ProfilePage />
                  </Route>
                  <Route path="/requests">
                    <RequestsPage />
                  </Route>
                  <Route path="/userRequests">
                    <UserRequestsPage />
                  </Route>
                  <Route path="/fillRequest">
                    <FillRequestPage />
                  </Route>
                  <Route path="/likes">
                    <LikesPage />
                  </Route>
                  <Route path="/login">
                    <LoginPage />
                  </Route>
                  <Route path="/moreInfo">
                    <ArticlePage />
                  </Route>
                </Switch>
              </div>
            </div>
          </div>
        </div>
      </Router>
    </div>
  );
}

export default App;
