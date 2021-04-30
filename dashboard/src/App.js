import "./App.css";
import React, { useEffect, useState } from "react";
import LoginPage from "./pages/LoginPage";
import RequestsPage from "./pages/RequestsPage";
import NavBar from "./components/NavBar";
import SearchBar from "./components/SearchBar";
import SearchFilterBox from "./components/SearchFilters";
import { Route, BrowserRouter as Router, Switch, Link } from "react-router-dom";
import ArticleList from "./components/ArticleList";
import logo from "./assets/siteLogo.png";

function App () {
  const [articles, setArticles] = useState([]);

  let headers = new Headers();
  //headers.append('Content-Type', 'application/json');
  //headers.append('Accept', 'application/json');
  //headers.append('Origin','http://localhost:8081');

  useEffect(() => 
    fetch("http://localhost:8081/api/getArticles")
          .then((response) => response.json())
          .then((response) => response["Data"])
          .then((response) => setArticles(response))
  );

  return (
      <Router>
        <div className="App">
          <div className="container-fluid">
            <div className="row">
              <div className="col">
                <div className="row align-items-center">
                  <div className="col-sm">
                    <div>
                      <Link to="/login" className="btn btn-primary">
                        Login
                      </Link>
                    </div>
                  </div>
                  <div className="col-sm">
                    <div>
                      <SearchBar />
                    </div>
                  </div>
                  <div className="col-sm">
                    <img
                      width={100}
                      height={20}
                      className="float-right"
                      src={logo}
                      alt="Generic placeholder"
                    />
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
                <div className="App">
                  <Switch>
                    <Route exact path="/">
                      <div>
                        <ArticleList
                          data={articles}
                          //query={query}
                        />
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
        </div>
      </Router>
    );
  }

export default App;
