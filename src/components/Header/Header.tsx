import React from 'react';
import { useNavigate } from 'react-router-dom';
import cuppingLogo from '../../assets/cupping-logo.svg';
import beniImg from '../../assets/beni.svg';

interface HeaderProps {
  loggedin: boolean;
}

const Header: React.FC<HeaderProps> = ({ loggedin }) => {
  const navigate = useNavigate();

  const handleHomePage = () => {
    navigate('/');
  };

  const handleSignupPage = () => {
    navigate('/signup');
  };

  const handleLoginPage = () => {
    navigate('/login');
  };

  return (
    <div className="container w-full p-10">
      <div className="header w-[1440px] flex justify-between mx-auto">
        <div className="logo m-2 relative z-10 flex justify-center items-center">
          <button type="button" onClick={handleHomePage}>
            <img
              src={cuppingLogo}
              className="w-[12rem] desktop1440:w-[8rem]"
              alt="커핑로고"
            />
          </button>
        </div>
        {loggedin ? (
          <div className="function-bar flex">
            <div className="profile-img">
              <img src={beniImg} alt="" className="w-8 mr-2" />
            </div>
            <div className="mypage text-primary-color-orange font-bold relative z-10">
              <button type="button">마이 페이지</button>
            </div>
          </div>
        ) : (
          <div className="function-bar flex">
            <div
              className="signup text-primary-color-orange
          m-2 p-2 relative z-10 cursor-pointer"
              onClick={handleSignupPage}
              role="presentation"
            >
              회원가입
            </div>
            <div
              className="login bg-primary-color-orange
            m-2 px-4 py-2 rounded-lg relative z-10
            cursor-pointer text-white"
              onClick={handleLoginPage}
              role="presentation"
            >
              로그인
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Header;
