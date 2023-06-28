import { useParams } from 'react-router-dom';
import Layout from '../layout/Layout';
import { useEffect, useState } from 'react';
import { articleApi } from '../../api/articlesApi';
import { ISingleArticleResponse } from '../../types/articleApi.type';

const EditArticle = () => {
  const slug = useParams().URLSlug;

  const [article, setArticle] = useState<ISingleArticleResponse>();

  const getArticle = async () => {
    try {
      if (slug !== undefined) {
        const response = await articleApi.read(slug);
        setArticle(response.data);
      }
    } catch (error) {
      console.log(error);
    }
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
              <form>
                <fieldset>
                  <fieldset className="form-group">
                    <input
                      type="text"
                      className="form-control form-control-lg"
                      placeholder="Article Title"
                      defaultValue={article?.article.title}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="What's this article about?"
                      defaultValue={article?.article.description}
                    />
                  </fieldset>
                  <fieldset className="form-group">
                    <textarea
                      className="form-control"
                      rows={8}
                      placeholder="Write your article (in markdown)"
                      defaultValue={article?.article.body}
                    ></textarea>
                  </fieldset>
                  <fieldset className="form-group">
                    <input type="text" className="form-control" placeholder="Enter tags" />
                    <div className="tag-list">
                      {article?.article.tagList &&
                        article?.article.tagList.map((tagData, index) => (
                          <span
                            key={index}
                            ng-repeat="tag in $ctrl.article.tagList"
                            className="tag-default tag-pill ng-binding ng-scope"
                          >
                            <i className="ion-close-round" ng-click="$ctrl.removeTag(tag)"></i>
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

export default EditArticle;
