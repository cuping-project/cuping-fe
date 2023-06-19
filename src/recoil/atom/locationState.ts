import { atom } from 'recoil';

const locationState = atom({
  key: 'locationState',
  default: [],
});

export { locationState };
