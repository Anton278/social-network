import { useState, useEffect } from "react";

export const useWindowDimensions = () => {
  const [width, setWidth] = useState<number | null>(null);
  const [height, setHeight] = useState<number | null>(null);
  const [isMobile, setIsMobile] = useState<null | boolean>(null);

  useEffect(() => {
    const resizeHandler = () => {
      setWidth(window.innerWidth);
      setHeight(window.innerHeight);
      setIsMobile(window.innerWidth < 600);
    };
    resizeHandler();
    window.addEventListener("resize", resizeHandler);
    return () => {
      window.removeEventListener("resize", resizeHandler);
    };
  }, []);

  return {
    width,
    height,
    isMobile,
  };
};
