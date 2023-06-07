import axios, { AxiosResponse } from 'axios';
import jwtDecode from 'jwt-decode';

const userApi = axios.create({
  baseURL: import.meta.env.VITE_BE_SERVER as string,
});

interface IUser {
  userId: string;
  password: string;
}

interface Tokens {
  accessToken: string;
  refreshToken: string;
  accessTokenExpirationTime: Date;
  refreshTokenExpirationTime: Date;
}

interface ErrorResponse {
  response: any;
  status: number;
}

// Define the type for error as Axios returns an object when an error occurs
type AxiosError = Error & Partial<ErrorResponse>;

// User login
const loginUser = async (user: IUser): Promise<Tokens | number> => {
  try {
    const response: AxiosResponse = await userApi.post('/users/login', user);
    const { authorization: tokenOrigin } = response.headers;
    const tokens = tokenOrigin; // Split the tokens if they are comma-separated
    console.log('이게 뤼스펀스 헤더야', response.headers);
    const { access_key: accessKey, refresh_key: refreshKey } = response.headers;
    const accessToken = accessKey.replace('Bearer ', '');
    const refreshToken = refreshKey.replace('Bearer ', '');
    console.log('accessToken?', accessToken);
    console.log('refreshToken?', refreshToken);
    // const accessToken = tokens[0];
    // const refreshToken = tokens[1];
    const accessTokenDecoded: any = jwtDecode(accessToken);
    const refreshTokenDecoded: any = jwtDecode(refreshToken);
    const accessTokenExpirationTime = new Date(accessTokenDecoded.exp * 1000);
    const refreshTokenExpirationTime = new Date(refreshTokenDecoded.exp * 1000);

    return {
      accessToken,
      refreshToken,
      accessTokenExpirationTime,
      refreshTokenExpirationTime,
    };
  } catch (err) {
    const axiosError = err as AxiosError;
    return axiosError.response ? axiosError.response.status : 500; // Return a generic server error status if there's no response from server
  }
};

export default loginUser;
