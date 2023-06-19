import React from 'react';
import UserHeader from './UserHeader';

// My Info Component
const MyInfo = ({ userInfo, handleUpdate }) => (
  <div className="contents-container">
    <div className="flex flex-col items-start ml-[4.5rem] mt-[1.5rem] ">
      <div className="w-[4.75rem] text-[2.25rem] font-bold mb-[1.5rem] ">
        이름
      </div>
      <div className="mb-[1.5rem] flex items-center ">
        <div className="text-[1.5rem] font-normal w-[8rem] ">이름</div>
        <input
          type="text"
          className="ml-[1rem] w-[15.2rem] h-[2.5rem] border border-gray-300 rounded-md px-[0.8rem] "
          defaultValue={userInfo.name}
          id="name"
        />
      </div>
      {/* More form fields ... */}
      <div className="w-[14.3rem] mt-[3.125rem] ">
        <button
          type="button"
          onClick={handleUpdate}
          className="bg-primary-color-orange text-white 
      w-[14.3rem] h-[3.75rem] rounded-lg text-[1.5rem] 
      font-bold flex justify-center items-center "
        >
          수정 완료
        </button>
      </div>
    </div>
  </div>
);

export default MyInfo;
