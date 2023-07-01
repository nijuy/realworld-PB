import { IArticle } from '../types/articleApi.type';

const ArticlePreview = ({ article }: { article: IArticle }) => {
  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };

  return (
    <div className="article-preview">
      <div className="article-meta">
        <a href="profile.html">
          <img src={article.author.image} />
        </a>
        <div className="info">
          <a href="" className="author">
            {article.author.username}
          </a>
          <span className="date">
            {new Date(article.createdAt).toLocaleDateString('en-US', dateOptions)}
          </span>
        </div>
        <button className="btn btn-outline-primary btn-sm pull-xs-right">
          <i className="ion-heart"></i> {article.favoritesCount}
        </button>
      </div>
      <a href="" className="preview-link">
        <h1>{article.title}</h1>
        <p>{article.description}</p>
        <span>Read more...</span>
        <ul className="tag-list">
          {article.tagList.map((tag, index) => (
            <li key={index} className="tag-default tag-pill tag-outline">
              {tag}
            </li>
          ))}
        </ul>
      </a>
    </div>
  );
};

export default ArticlePreview;
