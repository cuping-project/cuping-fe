import React from 'react';

const Menu = ({ setSelected }) => {
  const menuItems = ['내 정보 관리', '카페 정보 관리'];

  return (
    <div className="menu w-[20.75rem] pl-[5.25rem]">
      {menuItems.map((item, index) => {
        // Define a variable to hold the CSS class name
        let buttonClass;
        if (index === 0) {
          // 첫번째 버튼
          buttonClass =
            ' first-button-class mb-[1.5rem] text-[2rem] w-[13.6rem] ';
        } else {
          // 두번째 버튼
          buttonClass =
            'second-button-class mb-[1.5rem] text-[2rem] w-[15rem] ';
        }

        return (
          <button
            type="button"
            key={index}
            onClick={() => setSelected(item)}
            className={buttonClass} // Use the variable here
          >
            {item}
          </button>
        );
      })}
    </div>
  );
};

export default Menu;
