import React, {Component} from 'react';
import ArticleCard from './article_card'

class Insights extends Component {
   constructor(props) {
     super(props);
 
     this.state = {
       article: [],
     };
   }
 
   componentDidMount() {
     getArticles(this);
   }
 
   render() {
     if (this.props == null) return;
 
     return (
       <div>
         
           <ArticleCard
                     title={this.article.name}
                     content={`Written by ${this.article.author}`}
                     url={this.article.url}
                     id={this.article.id}
                     isLiked={this.isArticleLiked(article.id, "someUserID")} //TODO- move to the articleCard and make it a class with state.
                   />
            
       </div>
     );
   }
 }
 

export default Insights;