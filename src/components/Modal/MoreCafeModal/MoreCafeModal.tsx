import React from 'react';
import { useRecoilState } from 'recoil';
import { isMoreCafeModalState } from '../../../recoil/atom/modalState';

const MoreCafeModal = () => {
  const [isMoreCafeModalOpen, setIsMoreCafeModalOpen] =
    useRecoilState(isMoreCafeModalState);

  // 외부영역을 클릭했을 때 모달창 꺼짐
  const handleOverlayClick = e => {
    if (e.target === e.currentTarget) {
      setIsMoreCafeModalOpen(false);
    }
  };

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
                <div className="card bg-white rounded-[0.5rem] p-2 flex my-3">
                  <div className="left flex justify-center items-center">
                    <div className="border-2 w-[6rem] h-[6rem] m-2">사진</div>
                  </div>
                  <div className="right m-2">
                    <div className="text-[2rem] my-1">카페명입니다.</div>
                    <div className="text-[1rem]">
                      주소: 서울시 강동구 양재대로 123456
                    </div>
                    <div className="text-[1rem]">
                      시간: 평일 08:00~22:00 | 주말 09:00~20:00{' '}
                    </div>
                  </div>
                </div>

                <div className="card bg-white rounded-[0.5rem] p-2 flex my-3">
                  <div className="left flex justify-center items-center">
                    <div className="border-2 w-[6rem] h-[6rem] m-2">사진</div>
                  </div>
                  <div className="right m-2">
                    <div className="text-[2rem] my-1">카페명입니다.</div>
                    <div className="text-[1rem]">
                      주소: 서울시 강동구 양재대로 123456
                    </div>
                    <div className="text-[1rem]">
                      시간: 평일 08:00~22:00 | 주말 09:00~20:00{' '}
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="bottom flex justify-center">
              <div className="page-nation w-full flex justify-center">
                <div
                  className="page-number flex items-center justify-center w-[2rem] h-[2rem] border-[0.07rem]
          border-black m-2 rounded-[50%] text-center"
                >
                  1
                </div>
                <div
                  className="page-number flex items-center justify-center w-[2rem] h-[2rem] border-[0.07rem]
          border-black m-2 rounded-[50%] text-center"
                >
                  2
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MoreCafeModal;
