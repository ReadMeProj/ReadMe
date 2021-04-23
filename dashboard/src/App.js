import "./App.css";
import SearchBar from "./components/SearchBar";
import SearchFilterBox from "./components/SearchFilters";
import ArticleCard from "./components/ArticleCard";
//import NavBar from "./components/NavBar";

const posts = [
  {
    id: "1",
    name: "This first post is about React",
    content:
      "malesuada fames ac turpis egestas. Vestibulum tortor quam, feugiat vitae, ultricies eget,",
  },
  {
    id: "2",
    name: "This next post is about Preact",
    content:
      "tempor Pellentesque habitant morbi tristique senectus et netus et malesuada",
  },
  {
    id: "3",
    name: "We have yet another React post!",
    content:
      "fames ac turpis egestas. Vestibulum tortor quam, feugiat  vitae, ultricies eget, tempor sit amet, ante.",
  },
  {
    id: "4",
    name: "This is the fourth and final post",
    content:
      "Donec eu libero sit amet quam egestas semper. Aenean ultricies mi vitae est. Mauris placerat eleifend leo.",
  },
];

const filterPosts = (posts, query) => {
  if (!query) {
    return posts;
  }

  return posts.filter((post) => {
    const postName = post.name.toLowerCase();
    return postName.includes(query);
  });
};

function App() {
  const { search } = window.location;
  const query = new URLSearchParams(search).get("q");
  const filteredPosts = filterPosts(posts, query);

  return (
    <div className="App">
      <header className="App-header">
        <SearchBar />
        <SearchFilterBox />
        <hr />
        <dl>
          {filteredPosts.map((post) => (
            <dd key={post.id}>
              <ArticleCard title={post.name} content={post.content} />
            </dd>
          ))}
        </dl>
      </header>
    </div>
  );
}

export default App;
