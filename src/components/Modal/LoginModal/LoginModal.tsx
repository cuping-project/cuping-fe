import React from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
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

  const navigate = useNavigate();
  const homeHandler = () => {
    navigate('/login');
  };

  return (
    <div
      className={`${styles.modalContainer} ${isOpen ? 'visible' : 'hidden'}`}
    >
      <div
        className={styles.modalWrapper}
        onClick={handleOverlayClick}
        role="presentation"
      >
        <div className={styles.modalContent}>
          <div className={styles.contentArea}>
            <div className={styles.textArea}>
              <p className={styles.textLogin}>로그인이 필요한 서비스 입니다.</p>
              <p className={styles.textLoginQuestion}>로그인 하시겠습니까?</p>
            </div>
            <div className={styles.loginAnswer}>
              <div
                onClick={closeModal}
                className={styles.loginCancel}
                role="presentation"
              >
                취소
              </div>
              <div
                onClick={homeHandler}
                role="presentation"
                className={styles.loginOk}
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
