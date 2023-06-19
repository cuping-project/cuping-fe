import { atom } from 'recoil';

const likeStatusState = atom({
  key: 'likeStatusState',
  default: false,
});

const likesCountState = atom({
  key: 'likesCountState',
  default: 0,
});

export { likeStatusState, likesCountState };
