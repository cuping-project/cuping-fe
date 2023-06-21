import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import profileSelctor from '../../../../assets/img/my-profill-selector.png';
import DeleteAccountModal from '../../../../components/Modal/DeleteAccountModal/DeleteAccountModal';
import { isDeleteAccountModalState } from '../../../../recoil/atom/modalState';

const UpdateProfile = () => {
  // 회원 탈퇴 모달 관련된 변수
  const [isDeleteAccountModalOpen, setIsDeleteAccountModalOpen] =
    useRecoilState(isDeleteAccountModalState);

  const openDeleteAccountModal = () => {
    setIsDeleteAccountModalOpen(true);
  };

  return (
    <>
      <div className="text-3xl mr-[6rem]">
        <div className="mb-[3rem]">내 정보 관리</div>
        <div className="">
          <img src={profileSelctor} alt="" />
        </div>
      </div>
      <div>
        <div className="text-xl mt-[4rem]">
          <div className="m-[2rem]">
            <div className="mb-[1rem]">닉네임</div>
            <input
              className="text-md block p-3 rounded-lg w-full shadow-md border-2
                      bg-white focus:bg-white text-sm
                      border-gray-300 focus:border-gray-400
                      placeholder-gray-300 focus:placeholder-gray-200
                      focus:outline-none"
              type="text"
              placeholder="닉네임을 입력하세요. (최대 12자)"
            />
          </div>
          <div className="m-[2rem]">
            <div className="mb-[1rem]">현재 비밀번호</div>
            <input
              className="text-md block p-3 rounded-lg w-full shadow-md border-2
                      bg-white focus:bg-white text-sm
                      border-gray-300 focus:border-gray-400
                      placeholder-gray-300 focus:placeholder-gray-200
                      focus:outline-none"
              placeholder="비밀번호 입력(영문자,숫자, 특수문자 8~12자)"
              type="password"
            />
          </div>
          <div className="m-[2rem]">
            <div className="mb-[1rem]">바꿀 비밀번호</div>
            <input
              className="text-md block p-3 rounded-lg w-full shadow-md border-2
                      bg-white focus:bg-white text-sm
                      border-gray-300 focus:border-gray-400
                      placeholder-gray-300 focus:placeholder-gray-200
                      focus:outline-none"
              placeholder="비밀번호를 다시 입력해주세요."
              type="password"
            />
          </div>
          <div className="m-[2rem] w-[27rem]">
            <div
              className="border-none flex justify-center py-[0.5rem] bg-[#FDD7C0]
                      text-[#fff] text-2xl cursor-pointer rounded-xl hover:bg-[#FDBA92]"
              role="presentation"
              onClick={() => {
                alert('미구현 기능입니다.');
              }}
            >
              저장하기
            </div>
            <div
              className="m-[2rem] flex justify-center cursor-pointer hover:font-semibold"
              role="presentation"
              onClick={openDeleteAccountModal}
            >
              회원 탈퇴
            </div>
            <DeleteAccountModal />
          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateProfile;
