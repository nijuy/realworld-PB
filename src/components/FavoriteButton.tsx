import { useState } from 'react';
import { IArticle } from '../types/articleApi.type';
import { articleApi } from '../api/articlesApi';
import { getToken } from '../services/tokenService';
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
      await articleApi.unfavorite(article.slug);
      setFavoriteCount(favoriteCount - 1);
      setFavorited(false);
    } else {
      await articleApi.favorite(article.slug);
      setFavoriteCount(favoriteCount + 1);
      setFavorited(true);
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
