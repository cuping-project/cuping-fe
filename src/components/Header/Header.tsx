import React from 'react';
import cuppingLogo from '../../assets/cupping-logo.svg';
import beniImg from '../../assets/beni.svg';

interface HeaderProps {
  loggedin: boolean;
}

const Header: React.FC<HeaderProps> = ({ loggedin }) => {
  return (
    <div className="header w-full flex justify-between p-10">
      <div className="logo m-2 relative z-10 flex justify-center items-center">
        <button type="button">
          <img
            src={cuppingLogo}
            className="w-[5rem] desktop1600:w-[8rem] desktop1700:w-[12rem]"
            alt="커핑로고"
          />
        </button>
      </div>
      {loggedin ? (
        <div className="function-bar flex">
          <div className="profile-img">
            <img src={beniImg} alt="" className="w-8 mr-2" />
          </div>
          <div className="mypage text-primaryColor font-bold relative z-10">
            <button type="button">마이 페이지</button>
          </div>
        </div>
      ) : (
        <div className="function-bar flex">
          <div className="signup text-primaryColor m-2 p-2 relative z-10 cursor-pointer">
            회원가입
          </div>
          <div
            className="login bg-primaryColor m-2 px-4 py-2 rounded-lg relative z-10
            cursor-pointer text-white"
          >
            로그인
          </div>
        </div>
      )}
    </div>
  );
};

export default Header;
