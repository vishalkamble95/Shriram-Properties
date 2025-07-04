import { useEffect, useRef } from 'react';
import { useLocation, useNavigationType } from 'react-router-dom';

const ScrollManager = () => {
  const location = useLocation();
  const navigationType = useNavigationType(); // PUSH, POP, REPLACE
  const scrollPositions = useRef(new Map());

  useEffect(() => {
    const key = location.hash || location.pathname;

    if (navigationType === 'POP') {
      const savedY = scrollPositions.current.get(key);
      if (typeof savedY === 'number') {
        window.scrollTo(0, savedY);
      }
    } else {
      window.scrollTo(0, 0); // Scroll to top for link clicks
    }

    return () => {
      scrollPositions.current.set(key, window.scrollY);
    };
  }, [location, navigationType]);

  return null;
};

export default ScrollManager;
