import { useState, ChangeEvent } from 'react';

type UseInputReturnType = [string, (e: ChangeEvent<HTMLInputElement>) => void];

const useInput = (): UseInputReturnType => {
  // state
  const [value, setValue] = useState<string>('');

  // handler
  const handleChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setValue(e.target.value);
  };

  return [value, handleChange];
};

export default useInput;
