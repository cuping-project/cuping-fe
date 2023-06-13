import React from 'react';
import DaumPostcode from 'react-daum-postcode';
import styles from './SearchAddressModal.module.css';

const SearchAddress = props => {
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
    <div className={`${styles.container}`}>
      <DaumPostcode autoClose onComplete={complete} />
    </div>
  );
};

export default SearchAddress;
