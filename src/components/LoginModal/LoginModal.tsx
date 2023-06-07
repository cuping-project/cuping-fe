import React from 'react';
import styles from './LoginModal.module.css';

interface ModalProps {
  isOpen: boolean;
  closeModal: () => void;
}

const Modal: React.FC<ModalProps> = ({ isOpen, closeModal }) => {
  // 외부영역을 클릭했을 때 모달창 꺼짐
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      closeModal();
    }
  };

  return (
    <div style={{ display: isOpen ? 'block' : 'none' }}>
      <div className={styles.modalWrapper} onClick={handleOverlayClick}>
        <div className={styles.modalCotent}>
          <div className="ContentArea mx-[74px] my-[24px]">
            <div className="textArea mb-[24px]">
              <p className="text-[20px] font-semibold">
                로그인이 필요한 서비스 입니다.
              </p>
              <p className="text-[20px] font-semibold">로그인 하시겠습니까?</p>
            </div>
            <div className="flex justify-center">
              <div
                onClick={closeModal}
                className="font-semibold border-[.1rem] rounded-[12px]
                py-[8px] px-[28px] mr-[33px] text-primaryColor border-primaryColor cursor-pointer"
              >
                취소
              </div>
              <div
                className="font-semibold border-[.1rem] rounded-[12px]
              py-[8px] px-[28px] mr-[33px] bg-primaryColor text-white border-primaryColor cursor-pointer"
              >
                확인
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
