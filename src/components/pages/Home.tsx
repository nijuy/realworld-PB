import Layout from '../layout/Layout';
import tagApi from '../../api/tagApi';
import { useQuery } from '@tanstack/react-query';
import { feedApi } from '../../api/articlesApi';
import { useRecoilValue } from 'recoil';
import { currentUserState } from '../../recoil/atom/currentUserData';
import { useState, useEffect } from 'react';
import ArticlePreview from '../ArticlePreview';

const Home = () => {
  const user = useRecoilValue(currentUserState);

  const [offset, setOffset] = useState(0);
  const [isMyArticles, setIsMyArticles] = useState(false);

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

  const onClickTab = () => {
    setIsMyArticles(!isMyArticles);
    setOffset(0);
  };

  useEffect(() => {
    if (isMyArticles) {
      myTabRefetch();
    } else {
      globalTabRefetch();
    }
  }, [user, offset]);

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
                        className={`nav-link${isMyArticles ? ' active' : ''}`}
                        onClick={onClickTab}
                      >
                        Your Feed
                      </a>
                    </li>
                  )}
                  <li className="nav-item">
                    <a className={`nav-link${!isMyArticles ? ' active' : ''}`} onClick={onClickTab}>
                      Global Feed
                    </a>
                  </li>
                </ul>
              </div>

              {!isMyArticles &&
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

              {isMyArticles &&
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
                        <a key={index} href="" className="tag-pill tag-default">
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
