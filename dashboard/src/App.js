import "./App.css";
import LoginPage from "./pages/LoginPage";
import RequestsPage from "./pages/RequestsPage";
import NavBar from "./components/NavBar";
import SearchBar from "./components/SearchBar";
import SearchFilterBox from "./components/SearchFilters";
import { Route, BrowserRouter as Router, Switch, Link } from "react-router-dom";
import ArticleList from "./components/ArticleList";
import logo from "./assets/siteLogo.png";

const posts = [
  {
    id: "1",
    name: "This first post is about React",
    content:
      "malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget,",
    link: "",
  },
  {
    id: "2",
    name: "This next post is about Preact",
    content:
      "tempor Pellentesque habitant morbi tristique senectus et netus et malesuada",
    link: "",
  },
  {
    id: "3",
    name: "We have yet another React post!",
    content:
      "fames ac turpis egestas. Vestibulum tortor quam, feugiat  vitae, ultricies eget, tempor sit amet, ante.",
    link: "",
  },
  {
    id: "4",
    name: "This is the fourth and final post",
    content:
      "Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.",
    link: "",
  },
];

function App() {
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
                    <ArticleList data={posts} query={query} />
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
