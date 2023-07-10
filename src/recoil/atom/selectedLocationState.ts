import { atom } from 'recoil';
import { recoilPersist } from 'recoil-persist';

const { persistAtom } = recoilPersist({
  key: 'recoil-persist',
  storage: localStorage,
});

const selectedLocationState = atom({
  key: 'selectedLocation',
  default: {
    city: '위치',
    district: '선택',
  },

  effects_UNSTABLE: [persistAtom],
});

export { selectedLocationState };
