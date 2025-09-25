import { useEffect, useCallback } from "react";
import { useLocation } from "react-router-dom";

const ScrollToTop = () => {
  const { pathname } = useLocation();

  const resetWindowScrollPosition = useCallback(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "instant"
    });
  }, []);

  useEffect(() => {
    // Scroll to top when pathname changes
    resetWindowScrollPosition();
  }, [pathname, resetWindowScrollPosition]);

  useEffect(() => {
    window.onbeforeunload = resetWindowScrollPosition;
  }, [resetWindowScrollPosition]);

  return null; // This component doesn't render anything
};

export default ScrollToTop;
