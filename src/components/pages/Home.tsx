import Layout from '../layout/Layout';
import tagApi from '../../api/tagApi';
import { useQuery } from '@tanstack/react-query';
import { feedApi } from '../../api/articlesApi';
import { useRecoilValue } from 'recoil';
import { currentUserState } from '../../recoil/atom/currentUserData';
import { useEffect } from 'react';

const Home = () => {
  const user = useRecoilValue(currentUserState);
  let offset = 0;

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
    staleTime: Infinity,
  });

  const {
    isLoading: feedIsLoading,
    refetch,
    data: feedData,
  } = useQuery({
    queryKey: ['feed'],
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

  const pageButtonList = () => {
    const buttonCount = feedData.articlesCount / 10 + 1;
    const buttonList: React.ReactNode[] = [];

    for (let i = 1; i <= buttonCount; i++) {
      buttonList.push(
        <li
          key={i}
          className="page-item ng-scope"
          ng-class="{active: pageNumber === $ctrl.currentPage }"
          ng-repeat="pageNumber in $ctrl.pageRange($ctrl.totalPages)"
          ng-click="$ctrl.changePage(pageNumber)"
          onClick={onClickPageButton}
        >
          <a className="page-link ng-binding" href="">
            {i}
          </a>
        </li>,
      );
    }

    return buttonList;
  };

  const onClickPageButton = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    offset = e.target.innerText * 10 - 10;
    refetch();
  };

  useEffect(() => {
    refetch();
  }, [user]);

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
                      <a className="nav-link disabled" href="">
                        Your Feed
                      </a>
                    </li>
                  )}
                  <li className="nav-item">
                    <a className="nav-link active" href="">
                      Global Feed
                    </a>
                  </li>
                </ul>
              </div>

              {feedIsLoading ? (
                <div> loading ... </div>
              ) : (
                feedData?.articles.map((article, index) => (
                  <div key={index} className="article-preview">
                    <div className="article-meta">
                      <a href="profile.html">
                        <img src={article.author.image} />
                      </a>
                      <div className="info">
                        <a href="" className="author">
                          {article.author.username}
                        </a>
                        <span className="date">January 20th</span>
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
                          <li
                            key={index}
                            className="tag-default tag-pill tag-outline ng-binding ng-scope"
                            ng-repeat="tag in $ctrl.article.tagList"
                          >
                            {tag}
                          </li>
                        ))}
                      </ul>
                    </a>
                  </div>
                ))
              )}
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

            {!feedIsLoading && (
              <nav>
                <ul className="pagination">{pageButtonList()}</ul>
              </nav>
            )}
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Home;
