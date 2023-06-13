import { atom } from 'recoil';

const cardState = atom({
  key: 'cardState',
  default: [],
});

export { cardState };
