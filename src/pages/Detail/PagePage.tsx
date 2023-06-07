import React from 'react';

const PagePage: React.FC = () => {
  return (
    <div className="flex flex-col w-full h-screen overflow-y-auto">
      <div className="h-20">헤더부분</div>
      <div className="flex-grow bg-gray-100 p-4 rounded-lg mb-2 overflow-y-auto">
        <div className="flex justify-center flex-wrap space-x-4">
          <div className=" w-96 h-96 flex justify-center items-center bg-white">
            이미지
          </div>
          <div className="w-96 h-96 flex justify-center items-center bg-white">
            그래프
          </div>
        </div>
        <div className="mt-4">text설명</div>
      </div>
      <div className="flex-grow bg-gray-200 p-4 rounded-lg mb-2 overflow-y-auto">
        <div>리뷰</div>
        <button
          type="submit"
          className="mt-2 bg-gray-500 text-white rounded py-2 px-4"
        >
          리뷰 추가
        </button>
      </div>
      <div className="flex-grow bg-gray-300 p-4 rounded-lg overflow-y-auto">
        <div>지도 (To be implemented)</div>
      </div>
    </div>
  );
};
export default PagePage;
