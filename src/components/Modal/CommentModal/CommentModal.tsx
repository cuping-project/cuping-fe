import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { useMutation, useQueryClient } from 'react-query';
import { isCommentModalState } from '../../../recoil/atom/modalState';
import nicknameState from '../../../recoil/atom/nicknameState';
import closeIcon from '../../../assets/img/close.svg';
import beanPageIdState from '../../../recoil/atom/beanPageIdState';
import { postCommentApi } from '../../../apis/api/CommentApi/CommentApi';
import myPageApi from '../../../apis/api/myPageApi/myPageApi';

const CommentModal = () => {
  const queryClient = useQueryClient();
  const [isCommentModalOpen, setIsCommentModalOpen] =
    useRecoilState(isCommentModalState);

  const [nickname, setNickname] = useRecoilState(nicknameState);
  const [inputComment, setInputComment] = useState('');
  const [beanPageId, setBeanPageId] = useRecoilState(beanPageIdState);

  // 외부영역을 클릭했을 때 모달창 꺼짐
  const handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      setIsCommentModalOpen(false);
    }
  };

  // 댓글 등록하기
  const postCommentMutation = useMutation(
    () => postCommentApi(beanPageId, inputComment),
    {
      onSuccess: data => {
        queryClient.invalidateQueries('comments');
        alert('댓글이 등록되었습니다.');
        setInputComment('');
        setIsCommentModalOpen(false);
      },
    },
  );

  const postCommentHandler = () => {
    postCommentMutation.mutate();
  };

  // 닉네임 가져오기
  useEffect(() => {
    const fetchNickname = async () => {
      const response = await myPageApi();
      setNickname(response.data.data.nickname);
    };

    fetchNickname();
  }, [nickname]);

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
                onChange={e => setInputComment(e.target.value)}
                value={inputComment}
              />
            </div>
            <hr />
            <div className="bottom">
              <div className="flex justify-end">
                <button
                  className="flex justify-end rounded-[0.5rem] text-[1.2rem]
                p-2 m-2 bg-primary-color-orange text-white"
                  onClick={postCommentHandler}
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
