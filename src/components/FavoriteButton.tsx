import { useState } from 'react';
import { IArticle } from '../types/articleApi.type';
import { articleApi } from '../api/articlesApi';

const FavoriteButton = ({ article }: { article: IArticle }) => {
  const [favoriteCount, setFavoriteCount] = useState(article.favoritesCount);
  const [favorited, setFavorited] = useState(article.favorited);

  const onClickFavoriteButton = async () => {
    if (favorited) {
      setFavoriteCount(favoriteCount - 1);
      setFavorited(false);
      await articleApi.unfavorite(article.slug);
    } else {
      setFavoriteCount(favoriteCount + 1);
      setFavorited(true);
      await articleApi.favorite(article.slug);
    }
  };

  return (
    <button
      className={`btn btn${favorited ? '' : '-outline'}-primary btn-sm pull-xs-right`}
      onClick={onClickFavoriteButton}
    >
      <i className="ion-heart" />
      &nbsp;
      {favoriteCount}
    </button>
  );
};

export default FavoriteButton;
