import { useEffect, useState } from 'react';

export function useDebounce(value, delay) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

export function isValidImage(img) {
  const fileSize = img.size / 1024 / 1024;

  const fileType = img.type;

  if (fileSize <= 10) {
    if (
      fileType === 'image/jpeg' ||
      fileType === 'image/png' ||
      fileType === 'image/jpg'
    )
      return true;
  }
  return false;
}

export function sortParamTransformer(str) {
  if (typeof str !== 'string') {
    return '';
  }

  const arr = str.split('-');

  const direction = {
    asc: 'asc',
    desc: 'desc',
  };

  if (arr[1] === direction.asc) {
    arr.pop();

    str = arr.join('');
    str = 'type.' + str;
  } else if (arr[1] === direction.desc) {
    arr.pop();

    str = arr.join('');
    str = '-type.' + str;
  } else {
    str = '';
  }

  return str;
}
