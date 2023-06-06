import { useState } from 'react';

const useToggle = () => {
  const [value, setValue] = useState(false);

  const handler = () => {
    setValue(currentValue => !currentValue);
  };

  return [value, handler, setValue];
};

export default useToggle;
