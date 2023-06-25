import React, { useState } from 'react';
import { useRecoilState, useRecoilValue } from 'recoil';
import {
  isInfoCafeModalState,
  isMoreCafeModalState,
} from '../../../recoil/atom/modalState';
import { visibleCafesState } from '../../../recoil/atom/visibleCafesState';
import beni from '../../../assets/img/beni02.png';
import { selectedCafeState } from '../../../recoil/atom/selectedCafeState';

const MoreCafeModal = () => {
  const [isMoreCafeModalOpen, setIsMoreCafeModalOpen] =
    useRecoilState(isMoreCafeModalState);

  // 외부영역을 클릭했을 때 모달창 꺼짐
  const handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      setIsMoreCafeModalOpen(false);
    }
  };

  // 카페 상세 정보 설정
  const [selectedCafe, setSelectedCafe] = useRecoilState(selectedCafeState);
  const [, setIsInfoCafeModalOpen] = useRecoilState(isInfoCafeModalState);

  const openInfoModalWithSelectedCafe = selectedCafe => {
    setSelectedCafe(selectedCafe);
    setIsInfoCafeModalOpen(true);
  };

  // 카페 데이터 가져오기
  const visibleCafes = useRecoilValue(visibleCafesState);
  const extraCafes = visibleCafes.slice(4);

  // ---페이지네이션---
  const [page, setPage] = useState(1);

  // 페이지 처리 함수
  const cafesPerPage = 5;

  const getVisibleCafes = cafes => {
    const startIndex = (page - 1) * cafesPerPage;
    return cafes.slice(startIndex, startIndex + cafesPerPage);
  };
  const displayedCafes = getVisibleCafes(extraCafes);

  // 페이지 변경 함수
  const handlePageChange = pageNumber => {
    setPage(pageNumber);
  };

  // 전체 페이지 수 계산
  const totalPages = Math.ceil(extraCafes.length / cafesPerPage);

  // 페이지 번호 생성
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div
      className={`modalContainer fixed inset-0 flex items-center justify-center z-[100] ${
        isMoreCafeModalOpen ? 'visible' : 'hidden'
      }`}
    >
      <div
        className="absolute z-[99] top-0 left-0 w-[100vw] h-[100vh] bg-black bg-opacity-10"
        onClick={handleOverlayClick}
        role="presentation"
      >
        <div
          className="absolute border-[2px] border-[#F45A00] p-[14px] rounded-[5px] w-[41.25rem] 
          overflow-y-auto top-[50%] left-[50%] transform -translate-x-1/2 -translate-y-1/2 bg-[#FFF1E9]"
        >
          <div className="contentsArea w-[34.75rem] m-auto">
            <div className="top flex justify-end w-full">
              <div
                className="p-2 cursor-pointer"
                onClick={handleOverlayClick}
                role="presentation"
              >
                x
              </div>
            </div>
            <div className="middle w-full">
              <div className="cards p-2 w-full">
                {displayedCafes.map(cafe => (
                  <div
                    key={cafe.id}
                    className="card bg-white rounded-[0.5rem] p-2 flex my-3 cursor-pointer"
                    onClick={() => openInfoModalWithSelectedCafe(cafe)}
                    role="presentation"
                  >
                    <div className="left flex justify-center items-center">
                      <div className="border-2 w-[6rem] h-[6rem] m-2 ">
                        <img
                          src={cafe.cafeImage}
                          alt=""
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>
                    <div className="right m-2">
                      <div className="text-[1.8rem] my-1">{cafe.cafeName}</div>
                      <div className="text-[1rem]">{cafe.cafeAddress}</div>
                      <div className="text-[1rem]">{cafe.cafePhoneNumber}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="bottom flex justify-center">
              <div className="page-nation w-full flex justify-center">
                {pageNumbers.map(number => (
                  <button
                    type="button"
                    key={number}
                    onClick={() => handlePageChange(number)}
                    className={`page-number flex items-center justify-center w-[2rem] h-[2rem] border-[0.07rem]
          border-black m-2 rounded-[50%] text-center ${
            page === number ? 'bg-[#F45A00] text-white' : 'bg-white'
          }`}
                  >
                    {number}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoreCafeModal;
