import React, { useEffect } from 'react';
import { useRecoilState } from 'recoil';
import Cookies from 'js-cookie';
import { Navigate, useNavigate } from 'react-router-dom';
import Header from '../../../components/Header/Header';
import profileDefault from '../../../assets/img/profill-default.png';
import profileSelctor from '../../../assets/img/my-profill-selector.png';
import { loginState } from '../../../recoil/atom/loginState';
import myPageApi from '../../../apis/api/myPageApi/myPageApi';
import nicknameState from '../../../recoil/atom/nicknameState';
import UpdateProfile from './UpdateProfile/UpdateProfile';
import FavoriteBeansList from './FavoriteBeansList/FavoriteBeansList';

const UserMyPage = () => {
  const navigate = useNavigate();
  // 로그인이 되었는지 확인하기 위한 상태 변수
  const [, setLoggedin] = useRecoilState(loginState);

  // 닉네임 가져오기
  const [nickname, setNickname] = useRecoilState(nicknameState);

  // 닉네임 가져오기
  useEffect(() => {
    const fetchNickname = async () => {
      const response = await myPageApi();
      setNickname(response.data.data.nickname);
    };

    fetchNickname();
  }, [nickname]);

  // 마이페이지가 로딩되었을 때 로그인이 되어있는지 판단
  useEffect(() => {
    const checkLoginStatus = () => {
      const accessToken = Cookies.get('ACCESS_KEY');
      if (accessToken) {
        setLoggedin(true);
      } else {
        setLoggedin(false);
        navigate('/login');
        alert('마이페이지는 로그인 후 이용 가능합니다.');
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <div className="full-conainer w-full h-[100vh] bg-[#f4f4f5]">
      <div className="body-container">
        <div className="Header">
          <Header />
        </div>
        <div className="contents-area max-w-[1440px] mx-auto pt-[12rem]">
          <div
            className="info-bar w-full flex justify-between border-2 rounded-2xl p-[2rem] text-4xl
            bg-[#fff]"
          >
            <div className="flex items-center">
              <div>안녕하세요!&nbsp;</div>
              <div className="text-primary-color-orange">{nickname}</div>
              <div>&nbsp;님!</div>
            </div>
            <div className="flex items-center">
              <div className="mr-[2rem]">
                <img src={profileDefault} alt="" />
              </div>
              <div className="text-primary-color-orange">{nickname}</div>
            </div>
          </div>
          <div className="contents-box w-full grid grid-cols-10 mt-[3rem]">
            <div className="col-span-3 text-3xl mx-auto">
              <div
                className="m-[2rem] hover:font-semibold cursor-pointer"
                onClick={() => {
                  alert('준비중입니다.');
                }}
                role="presentation"
              >
                내 정보 관리
              </div>
              <div className="m-[2rem] hover:font-semibold cursor-pointer">
                찜한 원두
              </div>
            </div>
            <div className="col-span-7 flex">
              {/* <UpdateProfile /> */}
              <FavoriteBeansList />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserMyPage;
