import { useRef, useState, ChangeEvent } from 'react';

const useInput = () => {
  const [value, setValue] = useState('');
  const valueRef = useRef<HTMLInputElement>(null);

  const handleChangeId = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return [value, valueRef, handleChangeId];
};

export default useInput;
