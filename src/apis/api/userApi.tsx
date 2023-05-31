import axios, { AxiosResponse } from 'axios';
import jwtDecode from 'jwt-decode';
import Cookies from 'js-cookie';

const userApi = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL as string,
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

// 1. User login
const loginUser = async (user: IUser): Promise<Tokens | number> => {
  try {
    const response: AxiosResponse = await userApi.post('/users/login', user);
    const { authorization: tokenOrigin } = response.headers;
    const tokens = tokenOrigin; // Split the tokens if they are comma-separated
    const accessToken = tokens[0];
    const refreshToken = tokens[1];
    const accessTokenDecoded: any = jwtDecode(accessToken);
    const refreshTokenDecoded: any = jwtDecode(refreshToken);
    const accessTokenExpirationTime = new Date(accessTokenDecoded.exp * 1);
    const refreshTokenExpirationTime = new Date(refreshTokenDecoded.exp * 1);

    Cookies.set('refreshToken', refreshToken, {
      expires: refreshTokenExpirationTime,
    }); // Store refreshToken in a cookie

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
