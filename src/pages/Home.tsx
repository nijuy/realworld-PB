import Layout from '../components/layout/Layout';
import { useRecoilValue } from 'recoil';
import { currentUserState } from '../recoil/atom/currentUserData';
import { useState, useEffect } from 'react';
import ArticlePreview from '../components/ArticlePreview';
import Loading from '../components/Loading';
import {
  useTagsQuery,
  useGlobalArticlesQuery,
  useFollowingArticlesQuery,
  useTagArticlesQuery,
} from '../hooks/home';

type FeedType = 'following' | 'global' | 'tag';

const Home = () => {
  const user = useRecoilValue(currentUserState);

  const [offset, setOffset] = useState(0);
  const [currentFeed, setCurrentFeed] = useState<FeedType>('global');
  const [currentTag, setCurrentTag] = useState('');

  const { isLoading: tagIsLoading, data: tagData } = useTagsQuery();

  const {
    isLoading: globalTabIsLoading,
    isRefetching: globalTabIsRefetching,
    refetch: globalTabRefetch,
    data: globalArticlesData,
  } = useGlobalArticlesQuery(offset);

  const {
    isLoading: myTabIsLoading,
    isRefetching: myTabIsRefetching,
    data: myArticlesData,
    refetch: myTabRefetch,
  } = useFollowingArticlesQuery(user.user.username, offset);

  const {
    isLoading: tagTabIsLoading,
    isRefetching: tagTabIsRefetching,
    data: tagFeedData,
    refetch: tagTabRefetch,
  } = useTagArticlesQuery(currentTag, offset);

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

  const onClickPageButton = (buttonEvent: React.MouseEvent<HTMLLIElement>) => {
    const pageNumber = Number((buttonEvent.target as HTMLLIElement).innerText);
    setOffset(pageNumber * 10 - 10);
  };

  const onClickTab = (anchorEvent: React.MouseEvent<HTMLAnchorElement>) => {
    setCurrentFeed((anchorEvent.target as Element).id as FeedType);
    setOffset(0);
  };

  const onClickTag = (anchorEvent: React.MouseEvent<HTMLAnchorElement>) => {
    setCurrentFeed('tag');
    setCurrentTag((anchorEvent.target as HTMLAnchorElement).innerText);
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
                  <Loading textValue="articles" />
                ) : (
                  <>
                    {globalArticlesData?.articles.map((article) => (
                      <ArticlePreview key={article.slug} article={article} />
                    ))}
                    {globalTabIsRefetching && <Loading textValue="articles" />}
                    <nav>
                      <ul className="pagination">
                        {pageButtonList(globalArticlesData?.articlesCount as number)}
                      </ul>
                    </nav>
                  </>
                ))}

              {currentFeed === 'following' &&
                (myTabIsLoading ? (
                  <Loading textValue="articles" />
                ) : !myArticlesData?.articlesCount ? (
                  <div className="article-preview">No articles are here... yet.</div>
                ) : (
                  <>
                    {myArticlesData?.articles.map((article) => (
                      <ArticlePreview key={article.slug} article={article} />
                    ))}
                    {myTabIsRefetching && <Loading textValue="articles" />}
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
                  <Loading textValue="articles" />
                ) : !tagFeedData?.articlesCount ? (
                  <div className="article-preview">No articles are here... yet.</div>
                ) : (
                  <>
                    {tagFeedData?.articles.map((article) => (
                      <ArticlePreview key={article.slug} article={article} />
                    ))}
                    {tagTabIsRefetching && <Loading textValue="articles" />}
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
                  <Loading textValue="tags" />
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
