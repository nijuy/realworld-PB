import { useState } from 'react';
import { profileApi } from '../api/userApi';

const FollowButton = ({ username, following }: { username: string; following: boolean }) => {
  const [isFollowing, setIsFollowing] = useState(following);

  const onClickFollowButton = async () => {
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
