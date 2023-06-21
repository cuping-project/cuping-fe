import { atom } from 'recoil';

const isLoginModalState = atom({
  key: 'isLoginModalState',
  default: false,
});

const isCommentModalState = atom({
  key: 'isCommentModalState',
  default: false,
});

const isMoreCafeModalState = atom({
  key: 'isMoreCafeModalState',
  default: false,
});

const isDeleteAccountModalState = atom({
  key: 'isDeleteAccountModalState',
  default: false,
});

export {
  isLoginModalState,
  isCommentModalState,
  isMoreCafeModalState,
  isDeleteAccountModalState,
};
