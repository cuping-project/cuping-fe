import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Cookies from 'js-cookie';
import { useRecoilState } from 'recoil';
import cuppingLogo from '../../assets/img/cupping-logo-word.svg';
import beniImg from '../../assets/img/beni.svg';
import logout from '../../assets/img/logout.png';
import { loginState } from '../../recoil/atom/loginState';
import { cardState } from '../../recoil/atom/cardState';
import { ICard } from './types';

const Header: React.FC = () => {
  const [loggined, setLoggedin] = useRecoilState(loginState);
  const [cards, setCards] = useRecoilState(cardState);
  const navigate = useNavigate();
  // 로그인 상태 변수

  // 검색 결과 가져오기
  const getSearchResults = async () => {
    try {
      const { data } = await axios.get(
        `${import.meta.env.VITE_BE_SERVER}/main/beans/search?keyword=`,
      );
      return data.data;
    } catch (err) {
      console.log('✨ ‣ getSearchResults ‣ err:', err);
    }
  };

  // 로고 클릭시 메인 페이지로 이동
  const handleHomePage = async () => {
    try {
      // const searchResults = await getSearchResults();
      // setCards(searchResults);
      // navigate('/');
      window.location.href = '/';
    } catch (err) {
      console.log('✨ ‣ handleSearch ‣ err:', err);
    }
  };

  // 로그아웃 버튼 클릭 시
  const logoutHandler = () => {
    Cookies.remove('ACCESS_KEY');
    setLoggedin(false);
    navigate('/');
    alert('로그아웃 되었습니다.');
  };

  //  메인페이지가 로딩되었을 때 로그인이 되어있는지 판단
  useEffect(() => {
    const checkLoginStatus = () => {
      const accessToken = Cookies.get('ACCESS_KEY');
      if (accessToken) {
        setLoggedin(true);
      } else {
        setLoggedin(false);
      }
    };

    checkLoginStatus();
  }, []);

  return (
    <div
      className="bg-container w-full fixed bg-[#fff] z-[10]
    d1920:h-[9rem] d1440:h-[9rem] d1024:h-[9rem] tablet:h-[9rem] mobile:h-[6rem]"
    >
      <div
        className="header container max-w-[1440px] flex justify-between items-center
        d1920:p-[2.5rem] d1440:p-[2.5rem] mobile:p-[1.25rem] mx-auto"
      >
        <div className="logo m-2 relative z-10 flex justify-center items-center ">
          <button type="button">
            <img
              src={cuppingLogo}
              className="d1920:w-[14rem] d1440:w-[10rem] d1024:w-[8rem] tablet:w-[6.5rem]
                mobile:w-[5rem]"
              onClick={handleHomePage}
              role="presentation"
              alt="커핑로고"
            />
          </button>
        </div>
        {loggined ? (
          <div className="function-bar flex items-center">
            <div className="profile-img">
              <img src={beniImg} alt="" className="w-[2rem] mr-2" />
            </div>
            <div className="mypage text-primary-color-orange font-bold relative z-10 mr-[3rem]">
              <button
                onClick={() => {
                  navigate('/usermypage');
                }}
                type="button"
              >
                마이 페이지
              </button>
            </div>
            <button
              className="logout w-[2rem] relative z-10"
              onClick={logoutHandler}
              type="submit"
            >
              <img src={logout} className="cursor-pointer" alt="" />
            </button>
          </div>
        ) : (
          <div className="function-bar flex">
            <div
              className="signup text-primary-color-orange
          m-2 p-2 relative z-10 cursor-pointer"
              onClick={() => navigate('/signup')}
              role="presentation"
            >
              회원가입
            </div>
            <div
              className="login bg-primary-color-orange
            m-2 px-4 py-2 rounded-lg relative z-10
            cursor-pointer text-white"
              onClick={() => navigate('/login')}
              role="presentation"
            >
              로그인
            </div>
          </div>
        )}
      </div>
      <div className="border-[1px] border-[#e1e1e1]" />
    </div>
  );
};

export default Header;
