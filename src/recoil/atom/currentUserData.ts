import { atom } from 'recoil';
import { IGlobalUserData } from '../../types/userApi.type';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist();

export const currentUserState = atom<IGlobalUserData>({
  key: 'currentUserState',
  default: {
    username: '',
    email: '',
    token: '',
    bio: '',
    image: '',
  },
  effects_UNSTABLE: [persistAtom],
});

export const loggedState = atom<boolean>({
  key: 'loggedState',
  default: false,
});
