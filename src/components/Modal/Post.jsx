import React from 'react';
import DaumPostcode from 'react-daum-postcode';
import './Post.module.css';

const Post = props => {
  const complete = data => {
    let fullAddress = data.address;
    const { zonecode } = data;
    let extraAddress = '';

    if (data.addressType === 'R') {
      if (data.bname !== '') {
        extraAddress += data.bname;
      }
      if (data.buildingName !== '') {
        extraAddress +=
          extraAddress !== '' ? `, ${data.buildingName}` : data.buildingName;
      }
      fullAddress += extraAddress !== '' ? ` (${extraAddress})` : '';
    }
    console.log(data);
    console.log(fullAddress);
    console.log(data.zonecode);

    props.setcompany({
      ...props.company,
      address: fullAddress,
      zonecode,
    });
  };
  return (
    <div className="absolute w-[30rem] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
      <DaumPostcode autoClose onComplete={complete} />
    </div>
  );
};

export default Post;
