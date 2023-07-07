import { useState } from 'react';
import { IArticle } from '../types/articleApi.type';
import { articleApi } from '../api/articlesApi';
import { getToken } from '../services/TokenService';
import { useNavigate } from 'react-router-dom';

const FavoriteButton = ({
  article,
  isArticlePage,
}: {
  article: IArticle;
  isArticlePage?: boolean;
}) => {
  const [favoriteCount, setFavoriteCount] = useState(article.favoritesCount);
  const [favorited, setFavorited] = useState(article.favorited);

  const navigate = useNavigate();

  const onClickFavoriteButton = async () => {
    if (!getToken()) {
      navigate('/register');
      return;
    }

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
      className={`btn btn${favorited ? '' : '-outline'}-primary btn-sm ${
        !isArticlePage ? 'pull-xs-right' : ''
      }`}
      onClick={onClickFavoriteButton}
    >
      <i className="ion-heart" />
      &nbsp;
      {isArticlePage ? (
        <>
          {favorited ? 'Unf' : 'F'}avorite Article ({favoriteCount})
        </>
      ) : (
        <>{favoriteCount}</>
      )}
    </button>
  );
};

FavoriteButton.defaultProps = {
  isArticlePage: false,
};

export default FavoriteButton;
