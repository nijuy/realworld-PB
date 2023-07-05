import Layout from '../layout/Layout';
import tagApi from '../../api/tagApi';
import { useQuery } from '@tanstack/react-query';
import { feedApi } from '../../api/articlesApi';
import { useRecoilValue } from 'recoil';
import { currentUserState } from '../../recoil/atom/currentUserData';
import { useState, useEffect } from 'react';
import ArticlePreview from '../ArticlePreview';

type FeedType = 'following' | 'global' | 'tag';

const Home = () => {
  const user = useRecoilValue(currentUserState);

  const [offset, setOffset] = useState(0);
  const [currentFeed, setCurrentFeed] = useState<FeedType>('global');
  const [currentTag, setCurrentTag] = useState('');

  const { isLoading: tagIsLoading, data: tagData } = useQuery({
    queryKey: ['tags'],
    queryFn: async () => {
      try {
        const response = await tagApi.get();
        return response.data.tags;
      } catch (error) {
        console.log(error);
      }
    },
  });

  const {
    isLoading: globalTabIsLoading,
    isRefetching: globalTabIsRefetching,
    refetch: globalTabRefetch,
    data: globalArticlesData,
  } = useQuery({
    queryKey: ['globalArticles'],
    queryFn: async () => {
      try {
        const response = await feedApi.getFeed({ offset: offset });
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
    staleTime: 60000,
  });

  const {
    isLoading: myTabIsLoading,
    isRefetching: myTabIsRefetching,
    data: myArticlesData,
    refetch: myTabRefetch,
  } = useQuery({
    queryKey: ['myArticles'],
    queryFn: async () => {
      try {
        if (user.user.username !== undefined) {
          const response = await feedApi.getFollowingFeed(offset);
          return response.data;
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  const {
    isLoading: tagTabIsLoading,
    isRefetching: tagTabIsRefetching,
    data: tagFeedData,
    refetch: tagTabRefetch,
  } = useQuery({
    queryKey: ['tagArticles'],
    queryFn: async () => {
      try {
        const response = await feedApi.getFeed({ offset: offset, tag: currentTag });
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
    enabled: false,
  });

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
        >
          <a className="page-link">{i}</a>
        </li>,
      );
    }
    return buttonList;
  };

  const onClickPageButton = (buttonEvent: React.MouseEvent<HTMLLIElement>) => {
    setOffset(buttonEvent.target.innerText * 10 - 10);
  };

  const onClickTab = (anchorEvent: React.MouseEvent<HTMLAnchorElement>) => {
    setCurrentFeed(anchorEvent.target.id);
    setCurrentTag('');
    setOffset(0);
  };

  const onClickTag = (anchorEvent: React.MouseEvent<HTMLAnchorElement>) => {
    setCurrentFeed('tag');
    setCurrentTag(anchorEvent.target.innerText);
    setOffset(0);
  };

  useEffect(() => {
    if (currentFeed === 'following') {
      myTabRefetch();
    } else if (currentFeed === 'global') {
      globalTabRefetch();
    } else {
      tagTabRefetch();
    }
  }, [user, currentTag, offset]);

  return (
    <Layout>
      <div className="home-page">
        <div className="banner">
          <div className="container">
            <h1 className="logo-font">conduit</h1>
            <p>A place to share your knowledge.</p>
          </div>
        </div>

        <div className="container page">
          <div className="row">
            <div className="col-md-9">
              <div className="feed-toggle">
                <ul className="nav nav-pills outline-active">
                  {user.user.token && (
                    <li className="nav-item">
                      <a
                        className={`nav-link${currentFeed === 'following' ? ' active' : ''}`}
                        id="following"
                        onClick={onClickTab}
                        style={{
                          cursor: 'pointer',
                        }}
                      >
                        Your Feed
                      </a>
                    </li>
                  )}
                  <li className="nav-item">
                    <a
                      className={`nav-link${currentFeed === 'global' ? ' active' : ''}`}
                      id="global"
                      onClick={onClickTab}
                      style={{
                        cursor: 'pointer',
                      }}
                    >
                      Global Feed
                    </a>
                  </li>

                  {currentTag !== '' && (
                    <li className="nav-item">
                      <a
                        className="nav-link active ng-binding"
                        style={{
                          cursor: 'pointer',
                        }}
                      >
                        <i className="ion-pound"></i> {currentTag}
                      </a>
                    </li>
                  )}
                </ul>
              </div>

              {currentFeed === 'global' &&
                (globalTabIsLoading ? (
                  <div className="article-preview">Loading articles...</div>
                ) : (
                  <>
                    {globalArticlesData?.articles.map((article, index) => (
                      <ArticlePreview key={index} article={article} />
                    ))}
                    {globalTabIsRefetching && (
                      <div className="article-preview">Loading articles...</div>
                    )}
                    <nav>
                      <ul className="pagination">
                        {pageButtonList(globalArticlesData?.articlesCount as number)}
                      </ul>
                    </nav>
                  </>
                ))}

              {currentFeed === 'following' &&
                (myTabIsLoading ? (
                  <div className="article-preview">Loading articles...</div>
                ) : !myArticlesData?.articlesCount ? (
                  <div className="article-preview">No articles are here... yet.</div>
                ) : (
                  <>
                    {myArticlesData?.articles.map((article, index) => (
                      <ArticlePreview key={index} article={article} />
                    ))}
                    {myTabIsRefetching && (
                      <div className="article-preview">Loading articles...</div>
                    )}
                    <nav>
                      <ul className="pagination">
                        <ul className="pagination">
                          {pageButtonList(myArticlesData?.articlesCount)}
                        </ul>
                      </ul>
                    </nav>
                  </>
                ))}

              {currentFeed === 'tag' &&
                (tagTabIsLoading ? (
                  <div className="article-preview">Loading articles...</div>
                ) : !tagFeedData?.articlesCount ? (
                  <div className="article-preview">No articles are here... yet.</div>
                ) : (
                  <>
                    {tagFeedData?.articles.map((article, index) => (
                      <ArticlePreview key={index} article={article} />
                    ))}
                    {tagTabIsRefetching && (
                      <div className="article-preview">Loading articles...</div>
                    )}
                    <nav>
                      <ul className="pagination">
                        <ul className="pagination">{pageButtonList(tagFeedData?.articlesCount)}</ul>
                      </ul>
                    </nav>
                  </>
                ))}
            </div>

            <div className="col-md-3">
              <div className="sidebar">
                <p>Popular Tags</p>

                {tagIsLoading ? (
                  <div className="article-preview">Loading tags...</div>
                ) : (
                  <div className="tag-list">
                    {tagData!.map((tagData, index) => {
                      return (
                        <a
                          key={index}
                          className="tag-pill tag-default"
                          onClick={onClickTag}
                          style={{
                            cursor: 'pointer',
                          }}
                        >
                          {tagData}
                        </a>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
