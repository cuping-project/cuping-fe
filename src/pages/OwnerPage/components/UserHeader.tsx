import React from 'react';

const UserHeader = ({ selectedImageURL }) => (
  <div
    className="title-container w-[84rem] h-[7.5rem] bg-white
      px-8 py-8 mt-[3.125rem] mx-auto
      rounded-lg shadow-lg mb-[2.25rem] pl-[3rem] "
  >
    <div className="flex justify-between items-center ">
      <div className="flex text-[2.5rem] font-normal">
        안녕하세요!
        <div className="text-primary-color-orange "> 커핑닉네임</div> 님!
      </div>
      <div className="top-right flex flex-row items-center ">
        <img
          src={selectedImageURL}
          alt="charac"
          className="w-[4.5rem] h-[4.5rem] rounded-full"
        />
        <div className="text-primary-color-orange text-[1.5rem] font-bold mx-[1rem]">
          커핑닉네임
        </div>
      </div>
    </div>
  </div>
);

export default UserHeader;
