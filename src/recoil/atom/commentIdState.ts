import { atom } from 'recoil';

const commentIdState = atom({
  key: 'commentIdState',
  default: '',
});

export default commentIdState;
