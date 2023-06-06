// // CallbackPage.tsx
// import React from 'react';
// import axios from 'axios';
// import Cookies from 'js-cookie';
// import jwtDecode from 'jwt-decode';
// import { useNavigate } from 'react-router-dom';
// import { useRecoilState } from 'recoil';
// import tokenState from '../recoil/tokenState/atom';

//   const url = new URL(window.location.href);
//   const code = url.searchParams.get('code');
//   const redirectCode = new URL(window.location.href).searchParams.get('code');
//   console.log('너왔니코드?', redirectCode);

// const Redirection = () => {
//   const navigate = useNavigate();
//   const [token, setToken] = useRecoilState(tokenState);

//   // fetch the code from the URL
//   const url = new URL(window.location.href);
//   const code = url.searchParams.get('code');

//   // async function to get the Kakao tokens
//   const getKakaoToken = async code => {
//     try {
//       const response = await axios.get(
//         `${import.meta.env.VITE_SERVER_URL}/users/oauth/kakao?code=${code}`,
//       );
//       const { ACCESS_KEY: accessKey, REFRESH_KEY: refreshKey } =
//         response.headers;
//       const accessToken = accessKey.split('Bearer ').pop() || '';
//       const refreshToken = refreshKey.split('Bearer ').pop() || '';

//       const accessTokenDecoded: any = jwtDecode(accessToken);
//       const accessTokenExpirationTime = new Date(accessTokenDecoded.exp * 1000);

//       Cookies.set('accessToken', accessToken, {
//         expires: accessTokenExpirationTime,
//       });
//       setToken({ accessToken, refreshToken });

//       alert('카카오 로그인 성공');
//       navigate('/');
//     } catch (error) {
//       console.error(error);
//       alert('카카오 로그인 실패');
//       navigate('/login');
//     }
//   };

//   // fetch the Kakao tokens immediately when the page loads
//   if (code) getKakaoToken(code);

//   return <div>Loading...</div>;
// };

// export default Redirection;
