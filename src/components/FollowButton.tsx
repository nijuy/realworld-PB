import { useState } from 'react';
import { profileApi } from '../api/userApi';
import { getToken } from '../services/tokenService';
import { useNavigate } from 'react-router-dom';

const FollowButton = ({ username, following }: { username: string; following: boolean }) => {
  const [isFollowing, setIsFollowing] = useState(following);

  const navigate = useNavigate();

  const onClickFollowButton = async () => {
    if (!getToken()) {
      navigate('/register');
      return;
    }

    if (isFollowing) {
      setIsFollowing(false);
      await profileApi.unfollow(username);
    } else {
      setIsFollowing(true);
      await profileApi.follow(username);
    }
  };

  return (
    <button
      className={`btn btn-sm btn${isFollowing ? '' : '-outline'}-secondary action-btn`}
      onClick={onClickFollowButton}
    >
      <i className="ion-plus-round"></i>
      &nbsp; {isFollowing ? 'Unfollow' : 'Follow'} {username}
    </button>
  );
};

export default FollowButton;
