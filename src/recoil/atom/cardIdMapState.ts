import { atom } from 'recoil';

const cardIdMapState = atom({
  key: 'cardIdMapState',
  default: [],
});

export { cardIdMapState };
