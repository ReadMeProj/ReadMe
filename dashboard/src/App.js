import "./App.css";
import { React, Component } from "react";
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
import QuestionPage from "./pages/QuestionPage";
import OpenRequestsPage from "./pages/OpenRequestsPage";
import SignUpPage from "./pages/SignUpPage";
import AnalyticsPage from "./pages/AnalyticsPage";
import RecommendationsPage from "./pages/RecommendationsPage";
import { createBrowserHistory } from "history";
import { isLoggedIn, getUserById } from "./network/lib/apiUserFunctions";
import UserScore from "./components/UserScore";
import AboutPage from "./pages/AboutPage";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      score: 0,
      refreshScoreFunc: async function () {
        await getUserById().then((response) => {
          if (response.data["Error"] == null)
            this.setState({ score: response.data["Data"].credit });
        });
      },
    };
  }
  async componentDidMount() {
    await getUserById().then((response) => {
      if (response.data["Error"] == null)
        this.setState({ score: response.data["Data"].credit });
    });
  }
  render() {
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
          style={{
            background: "none",
            border: "none",
            margin: "0",
            padding: "0",
          }}
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
      history.push(`/about`);
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
                  minHeight: "100%",
                }}
              >
                {logoImg}
                <br />
                <div className="col-5" style={{ paddingTop: "40%" }} />
                <NavBar isPremium={this.state.score >= 500} />
                <UserScore score={this.state.score} />
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
                      <FeedPage
                        refreshScoreFunc={this.state.refreshScoreFunc.bind(
                          this
                        )}
                      />
                    </Route>
                    <Route path="/recommendations">
                      <RecommendationsPage
                        refreshScoreFunc={this.state.refreshScoreFunc.bind(
                          this
                        )}
                      />
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
                      <LikesPage
                        refreshScoreFunc={this.state.refreshScoreFunc.bind(
                          this
                        )}
                      />
                    </Route>
                    <Route path="/login">
                      <LoginPage />
                    </Route>
                    <Route path="/signUp">
                      <SignUpPage />
                    </Route>
                    <Route exact path="/moreInfo">
                      <ArticlePage
                        isPremium={this.state.score >= 500}
                        refreshScoreFunc={this.state.refreshScoreFunc.bind(
                          this
                        )}
                      />
                    </Route>
                    <Route path="/focusQuestion">
                      <QuestionPage
                        refreshScoreFunc={this.state.refreshScoreFunc.bind(
                          this
                        )}
                      />
                    </Route>
                    <Route path="/about">
                      <AboutPage />
                    </Route>
                    <Route path="/analytics">
                      <AnalyticsPage />
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
}

export default App;
