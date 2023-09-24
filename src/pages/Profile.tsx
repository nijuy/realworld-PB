import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../components/layout/Layout';
import { profileApi } from '../api/userApi';
import { IProfile } from '../types/userApi.type';
import { currentUserState } from '../recoil/atom/currentUserData';
import { useRecoilValue } from 'recoil';
import ArticlePreview from '../components/ArticlePreview';
import FollowButton from '../components/FollowButton';
import Loading from '../components/Loading';
import { useFavoritedArticles, useMyArticlesQuery } from '../hooks/profile';

const Profile = () => {
  const user = useRecoilValue(currentUserState);

  const username = useParams().username;

  const [offset, setOffset] = useState(0);

  const [profileData, setProfileData] = useState<IProfile>();
  const [isMyArticles, setIsMyArticles] = useState(true);

  const {
    isLoading: myTabIsLoading,
    isRefetching: myTabIsRefetching,
    data: myArticlesData,
    refetch: myTabRefetch,
  } = useMyArticlesQuery(username, offset);

  const {
    isLoading: favoritedTabIsLoading,
    isRefetching: favoritedTabIsRefetching,
    data: favoritedArticlesData,
    refetch: favoritedTabRefecth,
  } = useFavoritedArticles(username, offset);

  const getProfile = async () => {
    try {
      if (username !== undefined) {
        const response = await profileApi.read(username);
        setProfileData(response.data.profile);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const onClickTab = () => {
    setIsMyArticles(!isMyArticles);
    setOffset(0);
  };

  const onClickPageButton = (buttonEvent: React.MouseEvent<HTMLLIElement>) => {
    const pageNumber = Number((buttonEvent.target as HTMLLIElement).innerText);
    setOffset(pageNumber * 10 - 10);
  };

  const pageButtonList = (articlesCount: number) => {
    if (articlesCount <= 10) {
      return;
    }

    const buttonCount = articlesCount % 10 ? articlesCount / 10 + 1 : articlesCount / 10;
    const buttonList: React.ReactNode[] = [];
    const currentPage = (offset + 10) / 10;

    for (let i = 1; i <= buttonCount; i++) {
      buttonList.push(
        <li
          key={i}
          className={`page-item ${currentPage === i ? 'active' : ''}`}
          onClick={onClickPageButton}
          style={{
            cursor: 'pointer',
          }}
        >
          <a className="page-link">{i}</a>
        </li>,
      );
    }

    return buttonList;
  };

  useEffect(() => {
    getProfile();
  }, [username]);

  useEffect(() => {
    if (isMyArticles) {
      myTabRefetch();
    } else {
      favoritedTabRefecth();
    }
  }, [offset]);

  return (
    <Layout>
      <div className="profile-page">
        {profileData && (
          <div className="user-info">
            <div className="container">
              <div className="row">
                <div className="col-xs-12 col-md-10 offset-md-1">
                  <img src={profileData.image} className="user-img" />
                  <h4>{profileData.username}</h4>
                  <p>{profileData.bio}</p>
                  {user.user.username !== profileData.username ? (
                    <FollowButton
                      username={profileData.username}
                      following={profileData.following}
                    />
                  ) : (
                    <a
                      ui-sref="app.settings"
                      className="btn btn-sm btn-outline-secondary action-btn"
                      href="#/settings"
                    >
                      <i className="ion-gear-a"></i> Edit Profile Settings
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <div className="articles-toggle">
                <ul className="nav nav-pills outline-active">
                  <li className="nav-item" onClick={onClickTab}>
                    <a
                      className={`nav-link${isMyArticles ? ' active' : ''}`}
                      style={{
                        cursor: 'pointer',
                      }}
                    >
                      My Articles
                    </a>
                  </li>
                  <li className="nav-item" onClick={onClickTab}>
                    <a
                      className={`nav-link${!isMyArticles ? ' active' : ''}`}
                      style={{
                        cursor: 'pointer',
                      }}
                    >
                      Favorited Articles
                    </a>
                  </li>
                </ul>
              </div>

              {isMyArticles &&
                (myTabIsLoading ? (
                  <Loading textValue="articles" />
                ) : !myArticlesData?.articlesCount ? (
                  <div className="article-preview">No articles are here... yet.</div>
                ) : (
                  <>
                    {myArticlesData!.articles.map((articleData) => (
                      <ArticlePreview key={articleData.slug} article={articleData} />
                    ))}
                    {myTabIsRefetching && <Loading textValue="articles" />}
                    <nav>
                      <ul className="pagination">{pageButtonList(myArticlesData.articlesCount)}</ul>
                    </nav>
                  </>
                ))}

              {!isMyArticles &&
                (favoritedTabIsLoading ? (
                  <Loading textValue="articles" />
                ) : !favoritedArticlesData?.articlesCount ? (
                  <div className="article-preview">No articles are here... yet.</div>
                ) : (
                  <>
                    {favoritedArticlesData!.articles.map((articleData) => (
                      <ArticlePreview key={articleData.slug} article={articleData} />
                    ))}
                    {favoritedTabIsRefetching && <Loading textValue="articles" />}
                    <nav>
                      <ul className="pagination">
                        {pageButtonList(favoritedArticlesData.articlesCount)}
                      </ul>
                    </nav>
                  </>
                ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
