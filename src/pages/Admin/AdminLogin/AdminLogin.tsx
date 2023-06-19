import React from 'react';
import cupingLogo from '../../../assets/img/cupping-logo-word.svg';

const AdminLogin = () => {
  return (
    <div className="mainContainer w-[100vw] h-[100vh]">
      <div
        className="absolute w-[26.75rem]
        p-[14px] rounded-[5px] overflow-y-auto bg-white
      top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2"
      >
        <div className="w-full flex justify-center">
          <img src={cupingLogo} alt="" />
        </div>
        <div className="p-[2.4rem] w-[22rem] m-auto">
          <div className="w-full mb-3">
            <div className="mb-1 font-semibold">아이디</div>
            <input
              type="text"
              className="w-full border-2 rounded-[0.3rem] h-[2.8rem] p-2"
              placeholder="아이디를 입력하세요."
            />
          </div>
          <div className="w-full mb-3">
            <div className="mb-1 font-semibold">비밀번호</div>
            <input
              type="password"
              className="w-full border-2 rounded-[0.3rem] h-[2.8rem] p-2"
              placeholder="비밀번호 입력(영문, 숫자 조합 최소 8자)"
            />
          </div>
          <div className="w-full mb-3">
            <div className="mb-1 font-semibold">adminKey</div>
            <input
              type="password"
              className="w-full border-2 rounded-[0.3rem] h-[2.8rem] p-2"
              placeholder="adminKey를 입력하세요"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full border-2 rounded-[0.5rem]
              bg-primary-color-orange text-white h-[2.5rem]"
            >
              로그인
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;
