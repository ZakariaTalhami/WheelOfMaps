import { useEffect } from "react";

const useHorizontalScroll = (ref) => {
  useEffect(() => {
    if (ref.current) {
      ref.current.addEventListener(
        "mousewheel",
        (e) => handleScroll(e, ref.current),
        false
      );
      return () => {
        ref.current.removeEventListener("mousewheel", (e) =>
          handleScroll(e, ref.current)
        );
      };
    }
  }, []);
};

const handleScroll = (e, container) => {
  e = window.event || e;
  const delta = Math.max(-1, Math.min(1, e.wheelDelta || -e.detail));
  container.scrollLeft -= delta * 40; // Multiplied by 40
  e.preventDefault();
};

export default useHorizontalScroll;
