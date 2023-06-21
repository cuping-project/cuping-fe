import React from 'react';
import { useRecoilState } from 'recoil';
import { isDeleteAccountModalState } from '../../../recoil/atom/modalState';

const DeleteAccountModal = () => {
  const [isDeleteAccountModalOpen, setIsDeleteAccountModalOpen] =
    useRecoilState(isDeleteAccountModalState);

  // 외부영역을 클릭했을 때 모달창 꺼짐
  const handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      setIsDeleteAccountModalOpen(false);
    }
  };

  return (
    <div
      className={`modalContainer fixed inset-0 flex items-center justify-center z-[100] ${
        isDeleteAccountModalOpen ? 'visible' : 'hidden'
      }`}
    >
      <div
        className="absolute z-[99] top-0 left-0 w-[100vw] h-[100vh] bg-black bg-opacity-10"
        onClick={handleOverlayClick}
        role="presentation"
      >
        <div
          className="absolute border-[1px] border-gray-100 p-[14px] rounded-[5px] w-[55.5rem]
        overflow-y-auto bg-white top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2"
        >
          <div className="contentsArea w-full">
            <div className="top">정말 탈퇴하시나요?</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DeleteAccountModal;
