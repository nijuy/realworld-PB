import Layout from '../layout/Layout';
import { useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { articleApi, commentApi } from '../../api/articlesApi';
import { currentUserState } from '../../recoil/atom/currentUserData';
import { useRecoilValue } from 'recoil';
import { INewCommentRequest } from '../../types/articleApi.type';

const Article = () => {
  const user = useRecoilValue(currentUserState);

  const slug = useParams().URLSlug;

  const navigate = useNavigate();

  const dateOptions = { year: 'numeric', month: 'long', day: 'numeric' };

  const commentRef = useRef<HTMLTextAreaElement>(null);

  const { data: articleData } = useQuery({
    queryKey: ['article'],
    queryFn: async () => {
      try {
        if (slug !== undefined) {
          const response = await articleApi.read(slug);
          return response.data.article;
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  const { data: commentList, refetch } = useQuery({
    queryKey: ['comment'],
    queryFn: async () => {
      try {
        if (slug !== undefined) {
          const response = await commentApi.read(slug);
          return response.data.comments;
        }
      } catch (error) {
        console.log(error);
      }
    },
  });

  const onSubmitCommentData = (formEvent: React.FormEvent<HTMLFormElement>) => {
    formEvent.preventDefault();
    const commentData = {
      comment: {
        body: commentRef.current!.value,
      },
    };
    addComment(commentData);
    commentRef.current!.value = '';
  };

  const addComment = async (commentData: INewCommentRequest) => {
    try {
      if (slug !== undefined) {
        await commentApi.create(slug, commentData);
        refetch();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteComment = async (commentId: number) => {
    try {
      if (slug !== undefined) {
        await commentApi.delete(slug, commentId);
        refetch();
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteArticle = async () => {
    try {
      if (slug !== undefined) {
        await articleApi.delete(slug);
        navigate('/');
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <Layout>
      <div className="article-page">
        <div className="banner">
          <div className="container">
            <h1>{articleData?.title}</h1>

            <div className="article-meta">
              <a href="">
                <img src={articleData?.author.image} />
              </a>
              <div className="info">
                <a href="" className="author">
                  {articleData?.author.username}
                </a>
                <span className="date">
                  {new Date(articleData?.createdAt).toLocaleDateString('en-US', dateOptions)}
                </span>
              </div>
              {user.user.username !== articleData?.author.username ? (
                <>
                  <button className="btn btn-sm btn-outline-secondary">
                    <i className="ion-plus-round"></i>
                    &nbsp; Follow {articleData?.author.username} <span className="counter"></span>
                  </button>
                  &nbsp;&nbsp;
                  <button className="btn btn-sm btn-outline-primary">
                    <i className="ion-heart"></i>
                    &nbsp; Favorite Article
                    <span className="counter">({articleData?.favoritesCount})</span>
                  </button>
                </>
              ) : (
                <>
                  <span ng-show="$ctrl.canModify" className="ng-scope">
                    <a
                      className="btn btn-outline-secondary btn-sm"
                      ui-sref="app.editor({ slug: $ctrl.article.slug })"
                      href={`#/editor/${slug}`}
                    >
                      <i className="ion-edit"></i> Edit Article
                    </a>
                    &nbsp;&nbsp;
                    <button
                      className="btn btn-outline-danger btn-sm"
                      ng-class="{disabled: $ctrl.isDeleting}"
                      ng-click="$ctrl.deleteArticle()"
                      onClick={deleteArticle}
                    >
                      <i className="ion-trash-a"></i> Delete Article
                    </button>
                  </span>
                </>
              )}
            </div>
          </div>
        </div>

        <div className="container page">
          <div className="row article-content">
            <div className="col-xs-12">
              <p>{articleData?.body}</p>
              <ul className="tag-list">
                {articleData?.tagList.map((tagData, index) => (
                  <li key={index} className="tag-default tag-pill tag-outline ng-binding ng-scope">
                    {tagData}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          <hr />

          <div className="article-actions">
            <div className="article-meta">
              <a href="profile.html">
                <img src={articleData?.author.image} />
              </a>
              <div className="info">
                <a href="" className="author">
                  {articleData?.author.username}
                </a>
                <span className="date">
                  {new Date(articleData?.createdAt).toLocaleDateString('en-US', dateOptions)}
                </span>
              </div>
              {user.user.username !== articleData?.author.username ? (
                <>
                  <button className="btn btn-sm btn-outline-secondary">
                    <i className="ion-plus-round"></i>
                    &nbsp; Follow {articleData?.author.username} <span className="counter"></span>
                  </button>
                  &nbsp;&nbsp;
                  <button className="btn btn-sm btn-outline-primary">
                    <i className="ion-heart"></i>
                    &nbsp; Favorite Article
                    <span className="counter">({articleData?.favoritesCount})</span>
                  </button>
                </>
              ) : (
                <>
                  <span ng-show="$ctrl.canModify" className="ng-scope">
                    <a
                      className="btn btn-outline-secondary btn-sm"
                      ui-sref="app.editor({ slug: $ctrl.article.slug })"
                      href={`#/editor/${slug}`}
                    >
                      <i className="ion-edit"></i> Edit Article
                    </a>
                    &nbsp;&nbsp;
                    <button
                      className="btn btn-outline-danger btn-sm"
                      ng-class="{disabled: $ctrl.isDeleting}"
                      ng-click="$ctrl.deleteArticle()"
                      onClick={deleteArticle}
                    >
                      <i className="ion-trash-a"></i> Delete Article
                    </button>
                  </span>
                </>
              )}
            </div>
          </div>

          <div className="row">
            <div className="col-xs-12 col-md-8 offset-md-2">
              <form className="card comment-form" onSubmit={onSubmitCommentData}>
                <div className="card-block">
                  <textarea
                    className="form-control"
                    placeholder="Write a comment..."
                    rows={3}
                    ref={commentRef}
                  ></textarea>
                </div>
                <div className="card-footer">
                  <img src="http://i.imgur.com/Qr71crq.jpg" className="comment-author-img" />
                  <button className="btn btn-sm btn-primary">Post Comment</button>
                </div>
              </form>

              {commentList &&
                commentList.map((commentData, index) => (
                  <div className="card" key={index}>
                    <div className="card-block">
                      <p className="card-text">{commentData.body}</p>
                    </div>
                    <div className="card-footer">
                      <a href="" className="comment-author">
                        <img src={commentData.author.image} className="comment-author-img" />
                      </a>
                      &nbsp;&nbsp;
                      <a href="" className="comment-author">
                        {commentData.author.username}
                      </a>
                      <span className="date-posted">
                        {new Date(commentData?.createdAt).toLocaleDateString('en-US', dateOptions)}
                      </span>
                      <span className="mod-options" ng-show="$ctrl.canModify">
                        <i
                          className="ion-trash-a"
                          ng-click="$ctrl.deleteCb()"
                          onClick={() => {
                            deleteComment(commentData.id);
                          }}
                        ></i>
                      </span>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Article;
