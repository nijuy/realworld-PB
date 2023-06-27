import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Layout from '../layout/Layout';
import { profileApi } from '../../api/userApi';
import { IProfile } from '../../types/userApi.type';
import { currentUserState } from '../../recoil/atom/currentUserData';
import { useRecoilValue } from 'recoil';

const Profile = () => {
  const user = useRecoilValue(currentUserState);

  const username = useParams().username;
  const [profileData, setProfileData] = useState<IProfile>();

  const getProfile = async () => {
    try {
      if (username !== undefined) {
        const response = await profileApi.read(username);
        setProfileData(response.data.profile);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProfile();
  }, [username]);

  return (
    <Layout>
      <div className="profile-page">
        {profileData && (
          <div className="user-info">
            <div className="container">
              <div className="row">
                <div className="col-xs-12 col-md-10 offset-md-1">
                  <img src={profileData.image} className="user-img" />
                  <h4>{profileData.username}</h4>
                  <p>{profileData.bio}</p>
                  {user.user.username !== profileData.username ? (
                    <button className="btn btn-sm btn-outline-secondary action-btn">
                      <i className="ion-plus-round"></i>
                      &nbsp; Follow {profileData.username}
                    </button>
                  ) : (
                    <a
                      ui-sref="app.settings"
                      className="btn btn-sm btn-outline-secondary action-btn"
                      ng-show="$ctrl.isUser"
                      href="#/settings"
                    >
                      <i className="ion-gear-a"></i> Edit Profile Settings
                    </a>
                  )}
                </div>
              </div>
            </div>
          </div>
        )}

        <div className="container">
          <div className="row">
            <div className="col-xs-12 col-md-10 offset-md-1">
              <div className="articles-toggle">
                <ul className="nav nav-pills outline-active">
                  <li className="nav-item">
                    <a className="nav-link active" href="">
                      My Articles
                    </a>
                  </li>
                  <li className="nav-item">
                    <a className="nav-link" href="">
                      Favorited Articles
                    </a>
                  </li>
                </ul>
              </div>

              <div className="article-preview">
                <div className="article-meta">
                  <a href="">
                    <img src="http://i.imgur.com/Qr71crq.jpg" />
                  </a>
                  <div className="info">
                    <a href="" className="author">
                      Eric Simons
                    </a>
                    <span className="date">January 20th</span>
                  </div>
                  <button className="btn btn-outline-primary btn-sm pull-xs-right">
                    <i className="ion-heart"></i> 29
                  </button>
                </div>
                <a href="" className="preview-link">
                  <h1>How to build webapps that scale</h1>
                  <p>This is the description for the post.</p>
                  <span>Read more...</span>
                </a>
              </div>

              <div className="article-preview">
                <div className="article-meta">
                  <a href="">
                    <img src="http://i.imgur.com/N4VcUeJ.jpg" />
                  </a>
                  <div className="info">
                    <a href="" className="author">
                      Albert Pai
                    </a>
                    <span className="date">January 20th</span>
                  </div>
                  <button className="btn btn-outline-primary btn-sm pull-xs-right">
                    <i className="ion-heart"></i> 32
                  </button>
                </div>
                <a href="" className="preview-link">
                  <h1>The song you won't ever stop singing. No matter how hard you try.</h1>
                  <p>This is the description for the post.</p>
                  <span>Read more...</span>
                  <ul className="tag-list">
                    <li className="tag-default tag-pill tag-outline">Music</li>
                    <li className="tag-default tag-pill tag-outline">Song</li>
                  </ul>
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default Profile;
