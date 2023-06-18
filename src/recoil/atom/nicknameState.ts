import { atom } from 'recoil';

const nicknameState = atom({
  key: 'nicknameState',
  default: '',
});

export default nicknameState;
