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
  // 페이지를 저장하기 위해 useState를 사용
  const [page, setPage] = useState(1);
  // 페이지당 표시할 댓글 수를 지정
  const commentPerPage = 4;

  /**
   * 현재 페이지에 표시할 댓글을 가져오는 함수
   * @returns {Array} visibleComments
   */
  const getVisibleComments = () => {
    const sortedCommentList = [...commentList].sort((a, b) => b.id - a.id);
    const indexOfLastComment = page * commentPerPage;
    const indexOfFirstComment = indexOfLastComment - commentPerPage;
    return sortedCommentList.slice(indexOfFirstComment, indexOfLastComment);
  };

  /**
   * 클릭 시 페이지를 변경하는 함수
   * @param pageNumber 페이지 번호
   */
  const handlePageClick = pageNumber => {
    setPage(pageNumber);
  };

  /**
   * 총페이지 수를 구하는 함수
   */
  const tatalPages = Math.ceil(commentList.length / commentPerPage);

  /**
   * 페이지네이션을 위한 페이지 번호를 저장하는 배열
   */
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
        {/* ----- 댓글 카드 나열하기 -----  */}
        {getVisibleComments().map(comment => (
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
                  2023.06.01
                </div>
              </div>
              <div className="card-text">{comment.content}</div>
            </div>
          </div>
        ))}
      </div>
      {/* ----- 페이지 번호 ----- */}
      <div className="page-nation w-full flex justify-center">
        {pageNumbers.map(number => (
          <div
            key={number}
            className={`page-number flex items-center justify-center w-[2.5rem] h-[2.5rem] border-[0.07rem]
            ${
              number === page
                ? 'bg-primary-color-orange text-white'
                : 'border-primary-color-orange'
            } m-2 rounded-[50%] text-center cursor-pointer`}
            onClick={() => {
              handlePageClick(number);
            }}
            role="presentation"
          >
            {number}
          </div>
        ))}
      </div>
    </div>
  );
};

export default BeanComments;
