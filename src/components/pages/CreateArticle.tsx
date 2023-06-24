import { useEffect, useRef, useState } from 'react';
import Layout from '../layout/Layout';
import { getToken } from '../../services/TokenService';
import { useNavigate } from 'react-router-dom';

const CreateArticle = () => {
  const navigate = useNavigate();

  const titleRef = useRef<HTMLInputElement>(null);
  const descriptionRef = useRef<HTMLInputElement>(null);
  const bodyRef = useRef<HTMLTextAreaElement>(null);
  const tagRef = useRef<HTMLInputElement>(null);

  const [tagList, setTagList] = useState<string[]>([]);

  const addTag = () => {
    const newTag = tagRef.current?.value || '';

    if (newTag !== '' && !tagList?.includes(newTag)) {
      setTagList((prevState) => [...prevState!, newTag]);
      tagRef.current!.value = '';
    }
  };

  const removeTag = (removedTag: string) => {
    setTagList((prevState) => prevState.filter((tag) => tag !== removedTag));
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
                          <span
                            key={index}
                            ng-repeat="tag in $ctrl.article.tagList"
                            className="tag-default tag-pill ng-binding ng-scope"
                          >
                            <i
                              className="ion-close-round"
                              ng-click="$ctrl.removeTag(tag)"
                              onClick={() => removeTag(tagData)}
                            ></i>
                            {tagData}
                          </span>
                        ))}
                    </div>
                  </fieldset>
                  <button className="btn btn-lg pull-xs-right btn-primary" type="button">
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
