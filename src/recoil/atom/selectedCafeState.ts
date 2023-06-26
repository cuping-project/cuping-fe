import { atom } from 'recoil';

const selectedCafeState = atom({
  key: 'selectedCafe',
  default: null,
});

export { selectedCafeState };
