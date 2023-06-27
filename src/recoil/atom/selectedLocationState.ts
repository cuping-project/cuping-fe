import { atom, selectorFamily } from 'recoil';

const selectedLocationState = atom({
  key: 'selectedLocation',
  default: {
    city: '위치',
    district: '선택',
  },
});

export { selectedLocationState };
