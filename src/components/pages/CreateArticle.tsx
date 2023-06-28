import { useEffect, useRef, useState } from 'react';
import Layout from '../layout/Layout';
import { getToken } from '../../services/TokenService';
import { useNavigate } from 'react-router-dom';
import { INewArticleRequest } from '../../types/articleApi.type';
import { articleApi } from '../../api/articlesApi';
import { AxiosError } from 'axios';
import { IError } from '../../types/error.type';
import ErrorPrint from '../ErrorPrint';

interface IPostError extends IError {
  postStatus: boolean;
}

const CreateArticle = () => {
  const navigate = useNavigate();

  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);
  const tagRef = useRef<HTMLInputElement>(null);

  const [tagList, setTagList] = useState<string[]>([]);
  const [postStatusData, setPostStatusData] = useState<IPostError>();

  const addTag = () => {
    const newTag = tagRef.current?.value || '';

    if (newTag === '') {
      alert('태그를 입력해주세요');
      return;
    }

    if (tagList.includes(newTag)) {
      alert('이미 추가된 태그입니다');
      return;
    }

    setTagList((prevState) => [...prevState!, newTag]);
    tagRef.current!.value = '';
  };

  const removeTag = (removedTag: string) => {
    setTagList((prevState) => prevState.filter((tag) => tag !== removedTag));
  };

  const onSubmitArticle = () => {
    const articleData = {
      article: {
        title: titleRef.current!.value,
        description: descriptionRef.current!.value,
        body: bodyRef.current!.value,
        tagList: tagList,
      },
    };
    createArticle(articleData);
  };

  const createArticle = async (articleData: INewArticleRequest) => {
    try {
      const response = await articleApi.create(articleData);
      navigate(`/article/${response.data.article.slug}`);
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

  useEffect(() => {
    if (getToken() === null) {
      navigate('/');
    }
  }, []);

  return (
    <Layout>
      <div className="editor-page">
        <div className="container page">
          <div className="row">
            <div className="col-md-10 offset-md-1 col-xs-12">
              {postStatusData && !postStatusData.postStatus && (
                <ul className="error-messages">
                  <ErrorPrint errors={postStatusData.errors} />
                </ul>
              )}
              <form>
                <fieldset>
                  <fieldset className="form-group">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Article Title"
                      ref={titleRef}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="What's this article about?"
                      ref={descriptionRef}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <textarea
                      className="form-control"
                      rows={8}
                      placeholder="Write your article (in markdown)"
                      ref={bodyRef}
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
                          <span key={index} className="tag-default tag-pill">
                            <i className="ion-close-round" onClick={() => removeTag(tagData)}></i>
                            {tagData}
                          </span>
                        ))}
                    </div>
                  </fieldset>
                  <button
                    className="btn btn-lg pull-xs-right btn-primary"
                    type="button"
                    onClick={onSubmitArticle}
                  >
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

export default CreateArticle;
