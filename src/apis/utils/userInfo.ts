// 사용자 닉네임 가져오는 함수

import myPageApi from '../api/myPageApi/myPageApi';

const fetchNickname = async () => {
  const response = await myPageApi();
  return response.data.data.nickname;
};

export default fetchNickname;
