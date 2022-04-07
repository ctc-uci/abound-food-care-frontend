/* eslint-disable no-undef */
import { useState, useEffect } from 'react';

const debounce = (func, delay) => {
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => func.apply(this, args), delay);
  };
};

const getWindowDimensions = hasWindow => {
  const width = hasWindow ? window.innerWidth : null;
  const height = hasWindow ? window.innerHeight : null;

  return { width, height };
};

const useWindowDimension = () => {
  const hasWindow = typeof window !== 'undefined';

  const [windowDimensions, setWindowDimensions] = useState(getWindowDimensions(hasWindow));

  const handleResize = debounce(() => {
    setWindowDimensions(getWindowDimensions(hasWindow));
  }, 200);

  // eslint-disable-next-line consistent-return
  useEffect(() => {
    if (hasWindow) {
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [hasWindow]);

  return windowDimensions;
};

export default useWindowDimension;
