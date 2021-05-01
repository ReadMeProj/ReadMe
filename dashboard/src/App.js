import "./App.css";
import React from "react";
import LoginPage from "./pages/LoginPage";
import RequestsPage from "./pages/RequestsPage";
import NavBar from "./components/NavBar";
import SearchBar from "./components/SearchBar";
import SearchFilterBox from "./components/SearchFilters";
import { Route, BrowserRouter as Router, Switch, Link } from "react-router-dom";
import logo from "./assets/siteLogo.png";
import FeedPage from "./pages/FeedPage";

function App() {
  // Variables to tie the search bar with the other components.
  const { search } = window.location;
  const query = new URLSearchParams(search).get("q");

  return (
    <div className="App">
      <Router>
        <div className="container-fluid">
          <div className="row">
            <div className="col">
              <div className="row align-items-center">
                <div className="col-sm">
                  <div>
                    <Link to="/login">The user name</Link>
                  </div>
                </div>
                <div className="col-sm">
                  <div>
                    <SearchBar />
                  </div>
                </div>
                <div className="col-sm">
                  <Link to="/">
                    <img
                      width={100}
                      height={20}
                      className="float-right"
                      src={logo}
                      alt="Generic placeholder"
                    />
                  </Link>
                </div>
              </div>
              <div className="row"></div>
            </div>
          </div>
          <div className="row">
            <div className="col-sm" />
            <div className="col-sm">
              <SearchFilterBox />
            </div>
            <div className="col-sm" />
          </div>
          <div className="row">
            <div className="col">
              <hr />
            </div>
          </div>
          <div className="row">
            <div className="col-2">
              <NavBar />
            </div>
            <div className="col-10">
              <div className="App" className="scrollableDiv">
                <Switch>
                  <Route exact path="/">
                    <div>
                      <FeedPage query={query} />
                    </div>
                  </Route>
                  <Route path="/login">
                    <LoginPage />
                  </Route>
                  <Route path="/requests">
                    <RequestsPage />
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
