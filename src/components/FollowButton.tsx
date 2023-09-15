import { useState } from 'react';
import { profileApi } from '../api/userApi';
import { getToken } from '../services/tokenService';
import { useNavigate } from 'react-router-dom';

const FollowButton = ({ username, following }: { username: string; following: boolean }) => {
  const [isFollowing, setIsFollowing] = useState(following);
  const [isDisabled, setIsDisabled] = useState(false);

  const navigate = useNavigate();

  const onClickFollowButton = async () => {
    if (!getToken()) {
      navigate('/register');
      return;
    }

    setIsDisabled(true);

    if (isFollowing) {
      setIsFollowing(false);
      await profileApi.unfollow(username);
    } else {
      setIsFollowing(true);
      await profileApi.follow(username);
    }

    setIsDisabled(false);
  };

  return (
    <button
      className={`btn btn-sm btn${isFollowing ? '' : '-outline'}-secondary action-btn`}
      onClick={onClickFollowButton}
      disabled={isDisabled}
    >
      <i className="ion-plus-round"></i>
      &nbsp; {isFollowing ? 'Unfollow' : 'Follow'} {username}
    </button>
  );
};

export default FollowButton;
