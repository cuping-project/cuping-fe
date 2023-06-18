import React from 'react';
import { useRecoilState } from 'recoil';
import { isCommentModalState } from '../../../recoil/atom/modalState';
import nicknameState from '../../../recoil/atom/nicknameState';
import closeIcon from '../../../assets/img/close.svg';

const CommentModal = () => {
  const [isCommentModalOpen, setIsCommentModalOpen] =
    useRecoilState(isCommentModalState);

  const [nickname, setNickname] = useRecoilState(nicknameState);

  // 외부영역을 클릭했을 때 모달창 꺼짐
  const handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      setIsCommentModalOpen(false);
    }
  };

  return (
    <div
      className={`modalContainer fixed inset-0 flex items-center justify-center z-[100] ${
        isCommentModalOpen ? 'visible' : 'hidden'
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
            <div className="top flex justify-between m-3">
              <div className="flex items-center">
                <div className="text-[1.2rem] font-semibold">{nickname}</div>
                <div>님 안녕하세요.</div>
              </div>
              <div className="cursor-pointer w-[1.2rem]">
                <img
                  src={closeIcon}
                  onClick={handleOverlayClick}
                  role="presentation"
                  alt=""
                />
              </div>
            </div>
            <hr />
            <div className="middle w-full">
              <textarea
                className="w-full h-[8rem] m-auto p-3"
                placeholder="원두와 무관한 리뷰는 사전고지 없이 삭제 처리 될 수 있습니다."
              />
            </div>
            <hr />
            <div className="bottom">
              <div className="flex justify-end">
                <button
                  className="flex justify-end rounded-[0.5rem] text-[1.2rem]
                p-2 m-2 bg-primary-color-orange text-white"
                  type="submit"
                >
                  등록하기
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CommentModal;
