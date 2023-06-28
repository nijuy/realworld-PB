import { useParams } from 'react-router-dom';
import Layout from '../layout/Layout';
import { useEffect, useState, useRef } from 'react';
import { articleApi } from '../../api/articlesApi';
import { ISingleArticleResponse } from '../../types/articleApi.type';
import { AxiosError } from 'axios';
import { IError } from '../../types/error.type';
import ErrorPrint from '../ErrorPrint';

interface IPostError extends IError {
  postStatus: boolean;
}

const EditArticle = () => {
  const slug = useParams().URLSlug;

  const [article, setArticle] = useState<ISingleArticleResponse>();
  const [tagList, setTagList] = useState<string[]>();
  const [postStatusData, setPostStatusData] = useState<IPostError>();

  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);
  const tagRef = useRef<HTMLInputElement>(null);

  const getArticle = async () => {
    try {
      if (slug !== undefined) {
        const response = await articleApi.read(slug);
        setArticle(response.data);
        setTagList(response.data.article.tagList);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateArticle = async (formEvent: React.FormEvent<HTMLFormElement>) => {
    formEvent.preventDefault();
    try {
      if (slug !== undefined) {
        const articleData = {
          title: titleRef.current!.value,
          description: descriptionRef.current!.value,
          body: bodyRef.current!.value,
          tagList: tagList || [],
        };
        await articleApi.update(slug, { article: articleData });
      }
    } catch (error) {
      const postError = error as AxiosError;
      if (postError.response !== undefined && postError.response.data !== null) {
        const response = postError.response.data as IError;
        setPostStatusData({
          postStatus: false,
          errors: response.errors,
        });
      }
    }
  };

  const addTag = () => {
    const newTag = tagRef.current?.value || '';

    if (newTag === '') {
      alert('태그를 입력해주세요');
      return;
    }

    if (tagList!.includes(newTag)) {
      alert('이미 추가된 태그입니다');
      return;
    }

    setTagList((prevState) => [...prevState!, newTag]);
    tagRef.current!.value = '';
  };

  const removeTag = (removedTag: string) => {
    setTagList((prevState) => prevState!.filter((tag) => tag !== removedTag));
  };

  useEffect(() => {
    getArticle();
  }, [slug]);

  return (
    <Layout>
      <div className="editor-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-10 offset-md-1 col-xs-12">
              {postStatusData && !postStatusData.postStatus && (
                <ul className="error-messages" ng-show="$ctrl.errors">
                  <ErrorPrint errors={postStatusData.errors} />
                </ul>
              )}
              <form onSubmit={updateArticle}>
                <fieldset>
                  <fieldset className="form-group">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Article Title"
                      ref={titleRef}
                      defaultValue={article?.article.title}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="What's this article about?"
                      ref={descriptionRef}
                      defaultValue={article?.article.description}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <textarea
                      className="form-control"
                      rows={8}
                      placeholder="Write your article (in markdown)"
                      ref={bodyRef}
                      defaultValue={article?.article.body}
                    ></textarea>
                  </fieldset>
                  <fieldset className="form-group">
                    <div style={{ display: 'flex' }}>
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Enter tags"
                        ref={tagRef}
                      />
                      <button
                        style={{
                          marginLeft: '20px',
                        }}
                        className="btn btn-md pull-xs-right btn-primary"
                        type="button"
                        onClick={addTag}
                      >
                        Add Tag
                      </button>
                    </div>
                    <div className="tag-list">
                      {tagList &&
                        tagList.map((tagData, index) => (
                          <span
                            key={index}
                            ng-repeat="tag in $ctrl.article.tagList"
                            className="tag-default tag-pill ng-binding ng-scope"
                          >
                            <i
                              className="ion-close-round"
                              ng-click="$ctrl.removeTag(tag)"
                              onClick={() => {
                                removeTag(tagData);
                              }}
                            ></i>
                            {tagData}
                          </span>
                        ))}
                    </div>
                  </fieldset>
                  <button className="btn btn-lg pull-xs-right btn-primary" type="submit">
                    Publish Article
                  </button>
                </fieldset>
              </form>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default EditArticle;
