// useEffect(() => {
//   const url = new URL(window.location.href);
//   const code = url.searchParams.get('code');
//   const redirectCode = new URL(window.location.href).searchParams.get('code');
//   console.log('너왔니코드?', redirectCode);

//   if (redirectCode) {
//     const getKakaoToken = async () => {
//       try {
//         const response = await axios.get(
//           `${
//             import.meta.env.VITE_BE_SERVER
//           }/users/oauth/kakao?code=${redirectCode}`,
//         );
//         console.log('이게 카카오의 reponse 헤더야', response.headers);
//         const { ACCESS_KEY: accessKey, REFRESH_KEY: refreshKey } =
//           response.headers;
//         const accessToken = accessKey.split('Bearer ').pop() || '';
//         const refreshToken = refreshKey.split('Bearer ').pop() || '';
//         console.log('🐵 🍕 getKakaoToken 🍕 accessToken:', accessToken);
//         const accessTokenDecoded: any = jwtDecode(accessToken);
//         const accessTokenExpirationTime = new Date(
//           accessTokenDecoded.exp * 1000,
//         );

//         Cookies.set('accessToken', accessToken, {
//           expires: accessTokenExpirationTime,
//         });
//         setToken({ accessToken, refreshToken });

//         alert('카카오 로그인 성공');
//         navigate('/');
//       } catch (error) {
//         console.error(error);
//         alert('카카오 로그인 실패');
//       }
//     };
//     getKakaoToken();
//   }
// }, [navigate, setToken]);
