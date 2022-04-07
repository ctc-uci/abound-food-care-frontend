import { useState, useEffect } from 'react';

import useWindowDimension from './useWindowDimension';

const useMobileWidth = (delimit = 768) => {
  const { width } = useWindowDimension();

  const [isMobile, setIsMobile] = useState(width);

  useEffect(() => {
    setIsMobile(width < delimit);
  }, [width]);

  return isMobile;
};

export default useMobileWidth;
