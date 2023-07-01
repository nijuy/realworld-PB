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

  const { data: tagFeedData, refetch: tagFeedRefetch } = useQuery({
    queryKey: ['tagArticles'],
    queryFn: async () => {
      try {
        const response = await feedApi.getFeed({ tag: currentTag });
        console.log(response.data);
        return response.data;
      } catch (error) {
        console.log(error);
      }
    },
    enabled: false,
  });

  const pageButtonList = (articlesCount: number) => {
    const buttonCount = articlesCount / 10 + 1;
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

  const onClickPageButton = (e: React.MouseEvent<HTMLLIElement>) => {
    setOffset(e.target.innerText * 10 - 10);
  };

  const onClickTab = (anchorEvent: React.MouseEvent<HTMLAnchorElement>) => {
    setCurrentFeed(anchorEvent.target.id);
    setOffset(0);
  };

  const onClickTag = (anchorEvent: React.MouseEvent<HTMLAnchorElement>) => {
    setCurrentTag(anchorEvent.target.innerText);
  };

  useEffect(() => {
    if (currentFeed === 'following') {
      myTabRefetch();
    } else {
      globalTabRefetch();
    }
  }, [user, offset]);

  useEffect(() => {
    if (currentTag !== '') {
      tagFeedRefetch();
    }
  }, [currentTag]);

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
                    >
                      Global Feed
                    </a>
                  </li>
                </ul>
              </div>

              {currentFeed === 'global' &&
                (globalTabIsLoading ? (
                  <div> loading ... </div>
                ) : (
                  <>
                    {globalArticlesData?.articles.map((article, index) => (
                      <ArticlePreview key={index} article={article} />
                    ))}
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
                    <nav>
                      <ul className="pagination">
                        <ul className="pagination">
                          {pageButtonList(myArticlesData?.articlesCount)}
                        </ul>
                      </ul>
                    </nav>
                  </>
                ))}
            </div>

            <div className="col-md-3">
              <div className="sidebar">
                <p>Popular Tags</p>

                {tagIsLoading ? (
                  <div> loading ... </div>
                ) : (
                  <div className="tag-list">
                    {tagData!.map((tagData, index) => {
                      return (
                        <a key={index} className="tag-pill tag-default" onClick={onClickTag}>
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
