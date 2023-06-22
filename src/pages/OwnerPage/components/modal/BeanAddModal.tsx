import React, { useState } from 'react';
import Modal from 'react-modal';

Modal.setAppElement('#root'); // This line is needed for accessibility reasons

const BeanAddModal: React.FC = () => {
  const [modalIsOpen, setModalIsOpen] = useState(false);

  const openModal = () => {
    setModalIsOpen(true);
  };

  const closeModal = () => {
    setModalIsOpen(false);
  };

  return (
    <div>
      <div className="flex flex-row mb-[1.5rem] mt-[1rem]">
        <div className="text-[1.5rem] font-bold mr-[3.375rem]">
          사용 원두
          <span className="text-red-600 text-[1.7rem] ">*</span>
        </div>
      </div>
      <div className="modal-box flex ">
        <div className="h-[19.875rem] w-[18.625rem] border-2 border-dashed border-gray-200 rounded-lg flex justify-center items-center mb-[2rem]">
          <button type="button" className="text-[1.75rem]" onClick={openModal}>
            + 원두 추가하기
          </button>
        </div>
      </div>

      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="원두 추가 모달"
        style={{
          content: {
            width: '1116px',
            height: '1150px',
          },
        }}
      >
        <h2>원두 추가</h2>
        <button type="button" onClick={closeModal}>
          close
        </button>
        <div>I am a modal</div>
      </Modal>
    </div>
  );
};

export default BeanAddModal;
