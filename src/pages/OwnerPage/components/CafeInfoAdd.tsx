import React from 'react';
import OwnerPage from '../OwnerPage';

const CafeInfoAdd = () => {
  return (
    <div>
      <div> 카페 정보 관리</div>
      <div>
        <div>카페 이름</div>
        <input className="w-[3.375rem] h-[3.125rem]" />
      </div>
      <div>
        <div>영업 시간</div>
        <input />
      </div>
    </div>
  );
};

export default CafeInfoAdd;
