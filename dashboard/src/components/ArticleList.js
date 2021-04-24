import React from "react";
import ArticleCard from "./ArticleCard";

const filteData = (data, query) => {
  if (!query) {
    return data;
  }

  return data.filter((article) => {
    const postName = article.name.toLowerCase();
    return postName.includes(query);
  });
};

/** `params` are `data`, `query`. */
function ArticleList(params) {
  const filteredPosts = filteData(params.data, params.query);
  if (params == null) return;
  return (
    <div>
      <dl>
        {filteredPosts.map((article) => (
          <dd key={article.id}>
            <ArticleCard title={article.name} content={article.content} />
          </dd>
        ))}
      </dl>
    </div>
  );
}

export default ArticleList;
