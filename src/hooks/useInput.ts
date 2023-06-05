import { useRef, useState, ChangeEvent } from 'react';

const useInput = (): [
  string,
  React.RefObject<HTMLInputElement>,
  (e: ChangeEvent<HTMLInputElement>) => void,
] => {
  const [value, setValue] = useState('');
  const valueRef = useRef<HTMLInputElement>(null);

  const handleChangeId = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return [value, valueRef, handleChangeId];
};

export default useInput;

// import { useRef, useState } from 'react';

// const useInput = () => {
//   const [value, setValue] = useState('');
//   const valueRef = useRef();

//   const handler = e => {
//     setValue(e.target.value);
//   };

//   return [value, valueRef, handler];
// };

// export default useInput;
