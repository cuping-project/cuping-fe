import React, { useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import { useRecoilState } from 'recoil';
import axios from 'axios';
import { useMutation, useQuery } from 'react-query';
import { loginState } from '../../recoil/atom/loginState';
import {
  isCommentModalState,
  isLoginModalState,
} from '../../recoil/atom/modalState';
import CommentModal from '../Modal/CommentModal/CommentModal';
import LoginModal from '../Modal/LoginModal/LoginModal';
import bini from '../../assets/img/beni.svg';
import profileImage from '../../assets/img/detail-profile-card.png';
import beanPageIdState from '../../recoil/atom/beanPageIdState';
import { getCommentApi } from '../../apis/api/CommentApi/CommentApi';

const BeanComments = () => {
  // 로그인이 되었는지 확인하기 위한 상태 변수
  const [loggedin, setLoggedin] = useRecoilState(loginState);

  // 댓글을 담기 위한 변수
  const [commentList, setCommentList] = useState([]);
  const [commentCount, setCommentCount] = useState(0);

  // cardPageId를 담기 위한 상태 변수
  const [beanPageId, setBeanPageId] = useRecoilState(beanPageIdState);

  // 로그인 모달 관련된 변수
  const [isLoginModalOpen, setIsLoginModalOpen] =
    useRecoilState(isLoginModalState);

  const openLoginModal = () => {
    setIsLoginModalOpen(true);
  };

  // 댓글 모달 관련된 변수
  const [isCommentModalOpen, setIsCommentModalOpen] =
    useRecoilState(isCommentModalState);

  const openCommentModal = () => {
    setIsCommentModalOpen(true);
  };

  // 댓글 가져오기
  const { data } = useQuery(['comments', beanPageId], () =>
    getCommentApi(beanPageId),
  );

  // 페이지네이션을 위한 로직
  const [page, setPage] = useState(1);
  const commentPerPage = 4;

  const getVisibleComments = () => {
    const indexOfLastComment = page * commentPerPage;
    const indexOfFirstComment = indexOfLastComment - commentPerPage;
    return commentList.slice(indexOfFirstComment, indexOfLastComment);
  };

  const handlePageClick = pageNumber => {
    setPage(pageNumber);
  };

  const tatalPages = Math.ceil(commentList.length / commentPerPage);
  const pageNumbers = [];
  for (let i = 1; i <= tatalPages; i += 1) {
    pageNumbers.push(i);
  }

  // 메인페이지가 로딩되었을 때 로그인이 되어있는지 판단
  useEffect(() => {
    const checkLoginStatus = () => {
      const accessToken = Cookies.get('ACCESS_KEY');
      if (accessToken) {
        setLoggedin(true);
      } else {
        setLoggedin(false);
      }
    };

    checkLoginStatus();
  }, []);

  // 댓글 표시하기
  useEffect(() => {
    if (data) {
      setCommentCount(data.data.commentList.length);
      setCommentList(data.data.commentList);
    }
  }, [data, beanPageId]);

  return (
    <div className="beanComments-container">
      <div className="middle-top w-full flex justify-between">
        <div className="middle-title text-[2.5rem] flex">
          <div className="text-primary-color-orange">{commentCount}</div>
          <div>건의 커핑 노트</div>
        </div>
        {loggedin ? (
          <>
            <div
              className="middle-review-button cursor-pointer border-[0.07rem] flex items-center font-semibold
    border-primary-color-orange rounded-xl m-2 py-1 px-4 text-primary-color-orange text-[1.25rem]"
              onClick={openCommentModal}
              role="presentation"
            >
              + 리뷰 추가하기
            </div>
            <CommentModal />
          </>
        ) : (
          <>
            <div
              className="middle-review-button cursor-pointer border-[0.07rem] flex items-center font-semibold
    border-primary-color-orange rounded-xl m-2 py-1 px-4 text-primary-color-orange text-[1.25rem]"
              onClick={openLoginModal}
              role="presentation"
            >
              + 리뷰 추가하기
            </div>
            <LoginModal />
          </>
        )}
      </div>
      <div className="middle-card-area grid grid-cols-2">
        {/* card */}
        {commentList.map(comment => (
          <div
            key={comment.id}
            className="middle-card flex border-[0.07rem] border-gray-200 m-3 p-5 rounded-xl"
          >
            <div className="card-picture mr-5 min-w-[60px] flex-shrink-0 flex items-center justify-center">
              {comment.user.profile_image === null ? (
                <img src={bini} className="w-[3rem]" alt="프로필 카드" />
              ) : (
                <img src={profileImage} alt="프로필 카드" />
              )}
            </div>
            <div className="card-contents">
              <div className="card-nickname">{comment.user.nickname}</div>
              <div className="flex mb-2">
                <div className="card-days text-[0.8rem] flex items-end">
                  2023. 06. 01
                </div>
              </div>
              <div className="card-text">{comment.content}</div>
            </div>
          </div>
        ))}
      </div>
      <div className="page-nation w-full flex justify-center">
        <div
          className="page-number flex items-center justify-center w-[2.5rem] h-[2.5rem] border-[0.07rem]
    border-primary-color-orange m-2 rounded-[50%] text-center"
        >
          1
        </div>
        <div
          className="page-number flex items-center justify-center w-[2.5rem] h-[2.5rem] border-[0.07rem]
    border-primary-color-orange m-2 rounded-[50%] text-center"
        >
          2
        </div>
      </div>
    </div>
  );
};

export default BeanComments;
