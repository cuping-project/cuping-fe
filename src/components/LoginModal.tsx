import React from 'react';
import { useNavigate } from 'react-router-dom';

type ModalProps = {
  show: boolean;
  handleClose: () => void;
};

const LoginModal = ({ show, handleClose }: ModalProps) => {
  const navigate = useNavigate();

  const showHideClassName = show
    ? 'fixed z-10 inset-0 overflow-y-auto'
    : 'hidden';

  const handleLoginPage = () => {
    navigate('./login');
  };

  return (
    <div className={showHideClassName}>
      <div className="flex items-center justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
        <div className="fixed inset-0 transition-opacity" aria-hidden="true">
          <div className="absolute inset-0 bg-gray-500 opacity-75" />
        </div>

        <span
          className="hidden sm:inline-block sm:align-middle sm:h-screen"
          aria-hidden="true"
        >
          &#8203;
        </span>

        <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:align-middle sm:max-w-sm sm:w-full sm:p-6">
          <div>
            <p className="text-xl leading-6 font-medium text-gray-900">
              로그인이 필요한 서비스 입니다.
            </p>
            <p className="mt-2 mb-5 text-sm text-gray-500">
              로그인 하시겠습니까?
            </p>
          </div>
          <div className="mt-5 sm:mt-6">
            <button
              type="button"
              onClick={handleLoginPage}
              className="inline-flex justify-center w-full rounded-md border border-transparent shadow-sm px-4 py-2 bg-green-600 text-base font-medium text-white hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 sm:text-sm"
            >
              확인
            </button>
            <button
              type="button"
              onClick={handleClose}
              className="mt-3 inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:text-sm"
            >
              취소
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginModal;
