import { atom } from 'recoil';

const showCardState = atom({
  key: 'showCardState',
  default: false,
});

export default showCardState;
