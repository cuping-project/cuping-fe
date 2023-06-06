import { atom } from 'recoil';

interface TokenState {
  accessToken: string;
  refreshToken: string;
  accessTokenExpirationTime: Date;
  refreshTokenExpirationTime: Date;
}

type AxiosError = Error & Partial<ErrorResponse>;

const tokenState = atom<TokenState | null>({
  key: 'tokenState',
  default: null,
});

export default tokenState;
