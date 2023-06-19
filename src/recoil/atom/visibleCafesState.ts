import { atom } from 'recoil';

const visibleCafesState = atom({
  key: 'visibleCafesState',
  default: [],
});

export { visibleCafesState };
