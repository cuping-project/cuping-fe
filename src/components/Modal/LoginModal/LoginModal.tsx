import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import styles from './LoginModal.module.css';
import { isLoginModalState } from '../../../recoil/atom/modalState';

const LoginModal: React.FC = () => {
  const navigate = useNavigate();
  const [isLoginModalOpen, setIsLoginModalOpen] =
    useRecoilState(isLoginModalState);

  // 외부영역을 클릭했을 때 모달창 꺼짐
  const handleOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      setIsLoginModalOpen(false);
    }
  };

  // 로그인 페이지로 이동
  const loginHandler = () => {
    setIsLoginModalOpen(false);
    navigate('/login');
  };

  return (
    <div
      className={`${styles.modalContainer} ${
        isLoginModalOpen ? 'visible' : 'hidden'
      }`}
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
                onClick={handleOverlayClick}
                className={styles.loginCancel}
                role="presentation"
              >
                취소
              </div>
              <div
                onClick={loginHandler}
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

export default LoginModal;
