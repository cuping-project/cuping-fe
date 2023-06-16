import React from 'react';
import authInstance from '../../utils/authInstance';

const myPageApi = async () => {
  try {
    const response = await authInstance.get(
      `${import.meta.env.VITE_BE_SERVER}/mypage`,
    );

    return response;
  } catch (error) {
    console.log(error);
  }
};

export default myPageApi;
