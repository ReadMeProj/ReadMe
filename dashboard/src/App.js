import "./App.css";
import React from "react";
// import RequestsPage from "./pages/RequestsPage";
import UserRequestsPage from "./pages/UserRequestsPage";
import NavBar from "./components/NavBar";
import { Route, BrowserRouter as Router, Switch, Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import logo from "./assets/siteLogo.png";
import FeedPage from "./pages/FeedPage";
import LikesPage from "./pages/LikesPage";
import LoginPage from "./pages/LoginPage";
import ProfilePage from "./pages/UserProfile";
import ArticlePage from "./pages/ArticlePage";
import RecommendationsPage from "./pages/RecommendationsPage";
import { createBrowserHistory } from "history";
import { isLoggedIn } from "./network/lib/apiUserFunctions";
import UserScore from "./components/UserScore";
import QuestionPage from "./pages/QuestionPage";
import OpenRequestsPage from "./pages/OpenRequestsPage";

function App() {
  const history = createBrowserHistory();
  var logoImg = (
    <Link to="/">
      <img
        width={100}
        height={20}
        className="float-left"
        src={logo}
        alt="logo"
      />
    </Link>
  );
  if (!isLoggedIn()) {
    logoImg = (
      <button
        className="astext"
        onClick={() => {
          alert("Please log in!");
        }}
      >
        <img
          width={100}
          height={20}
          className="float-left"
          src={logo}
          alt="logo"
        />
      </button>
    );
    history.push(`/login`);
  }
  let params = new URLSearchParams(document.location.search.substring(1));
  let articleID = params.get("articleId"); // Will be null if there is no articleId value in the URL.
  let requestID = params.get("requestId");
  if (articleID) {
    history.push("moreInfo?articleId=" + articleID);
  }
  if (requestID) {
    history.push("focusQuestion?requestId=" + articleID);
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
              {logoImg}
              <br />
              <div style={{ paddingTop: "100px" }}></div>
              <NavBar />
              <UserScore />
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
                  <Route path="/recommendations">
                    <RecommendationsPage />
                  </Route>
                  <Route path="/profile">
                    <ProfilePage />
                  </Route>
                  <Route path="/requests">
                    <OpenRequestsPage />
                  </Route>
                  <Route path="/userRequests">
                    <UserRequestsPage />
                  </Route>
                  <Route path="/likes">
                    <LikesPage />
                  </Route>
                  <Route path="/login">
                    <LoginPage />
                  </Route>
                  <Route exact path="/moreInfo">
                    <ArticlePage />
                  </Route>
                  <Route path="/focusQuestion">
                    <QuestionPage />
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
