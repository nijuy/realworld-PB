import { atom } from 'recoil';
import { IGlobalUserData } from '../../api/types/userApi.type';

export const currentUserState = atom<IGlobalUserData>({
  key: 'currentUserState',
  default: {
    username: '',
    email: '',
    token: '',
    bio: '',
    image: '',
  },
});

export const loggedState = atom<boolean>({
  key: 'loggedState',
  default: false,
});
