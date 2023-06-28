import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../layout/Layout';
import { profileApi } from '../../api/userApi';
import { IProfile } from '../../types/userApi.type';
import { currentUserState } from '../../recoil/atom/currentUserData';
import { useRecoilValue } from 'recoil';
import { useQuery } from '@tanstack/react-query';
import { feedApi } from '../../api/articlesApi';

const Profile = () => {
  const user = useRecoilValue(currentUserState);

  const username = useParams().username;

  const [profileData, setProfileData] = useState<IProfile>();
  const [isMyArticles, setIsMyArticles] = useState(true);

  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };

  const { isLoading: myTabIsLoading, data: myArticlesData } = useQuery({
    queryKey: ['myArticles'],
    queryFn: async () => {
      try {
        if (username !== undefined) {
          const response = await feedApi.getFeed({ author: username, offset: offset });
          return response.data;
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  const { isLoading: favoritedTabIsLoading, data: favoritedArticlesData } = useQuery({
    queryKey: ['favorited'],
    queryFn: async () => {
      try {
        if (username !== undefined) {
          const response = await feedApi.getFeed({ favorited: username, offset: offset });
          return response.data;
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

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
  };

  useEffect(() => {
    getProfile();
  }, [username]);

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
                    <button className="btn btn-sm btn-outline-secondary action-btn">
                      <i className="ion-plus-round"></i>
                      &nbsp; Follow {profileData.username}
                    </button>
                  ) : (
                    <a
                      ui-sref="app.settings"
                      className="btn btn-sm btn-outline-secondary action-btn"
                      ng-show="$ctrl.isUser"
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
                    <a className={`nav-link${isMyArticles ? ' active' : ''}`}>My Articles</a>
                  </li>
                  <li className="nav-item" onClick={onClickTab}>
                    <a className={`nav-link${!isMyArticles ? ' active' : ''}`}>
                      Favorited Articles
                    </a>
                  </li>
                </ul>
              </div>

              {isMyArticles &&
                (myTabIsLoading ? (
                  <div className="article-preview ng-hide" ng-hide="!$ctrl.loading">
                    Loading articles...
                  </div>
                ) : !myArticlesData?.articlesCount ? (
                  <div
                    className="article-preview"
                    ng-show="!$ctrl.loading &amp;&amp; !$ctrl.list.length"
                  >
                    No articles are here... yet.
                  </div>
                ) : (
                  myArticlesData!.articles.map((articleData, index) => (
                    <div className="article-preview" key={index}>
                      <div className="article-meta">
                        <a href={`/profile/${articleData.author.username}`}>
                          <img src={articleData.author.image} />
                        </a>
                        <div className="info">
                          <a href={`/profile/${articleData.author.username}`} className="author">
                            {articleData.author.username}
                          </a>
                          <span className="date">
                            {new Date(articleData.createdAt).toLocaleDateString(
                              'en-US',
                              dateOptions,
                            )}
                          </span>
                        </div>
                        <button className="btn btn-outline-primary btn-sm pull-xs-right">
                          <i className="ion-heart"></i> {articleData.favoritesCount}
                        </button>
                      </div>
                      <a href={`/article/${articleData.slug}`} className="preview-link">
                        <h1>{articleData.title}</h1>
                        <p>{articleData.description}</p>
                        <span>Read more...</span>
                        <ul className="tag-list">
                          {articleData.tagList.map((tagData, tagIndex) => (
                            <li className="tag-default tag-pill tag-outline" key={tagIndex}>
                              {tagData}
                            </li>
                          ))}
                        </ul>
                      </a>
                    </div>
                  ))
                ))}

              {!isMyArticles &&
                (favoritedTabIsLoading ? (
                  <div className="article-preview ng-hide" ng-hide="!$ctrl.loading">
                    Loading articles...
                  </div>
                ) : !favoritedArticlesData?.articlesCount ? (
                  <div
                    className="article-preview"
                    ng-show="!$ctrl.loading &amp;&amp; !$ctrl.list.length"
                  >
                    No articles are here... yet.
                  </div>
                ) : (
                  favoritedArticlesData!.articles.map((articleData, index) => (
                    <div className="article-preview" key={index}>
                      <div className="article-meta">
                        <a href={`/profile/${articleData.author.username}`}>
                          <img src={articleData.author.image} />
                        </a>
                        <div className="info">
                          <a href={`/profile/${articleData.author.username}`} className="author">
                            {articleData.author.username}
                          </a>
                          <span className="date">
                            {new Date(articleData.createdAt).toLocaleDateString(
                              'en-US',
                              dateOptions,
                            )}
                          </span>
                        </div>
                        <button className="btn btn-outline-primary btn-sm pull-xs-right">
                          <i className="ion-heart"></i> {articleData.favoritesCount}
                        </button>
                      </div>
                      <a href={`/article/${articleData.slug}`} className="preview-link">
                        <h1>{articleData.title}</h1>
                        <p>{articleData.description}</p>
                        <span>Read more...</span>
                        <ul className="tag-list">
                          {articleData.tagList.map((tagData, tagIndex) => (
                            <li className="tag-default tag-pill tag-outline" key={tagIndex}>
                              {tagData}
                            </li>
                          ))}
                        </ul>
                      </a>
                    </div>
                  ))
                ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
