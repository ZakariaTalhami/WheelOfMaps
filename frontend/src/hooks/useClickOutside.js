import { useEffect } from "react";

const useClickOutsideAlert = (ref, callback) => {
  useEffect(() => {
    const handleClickEvent = (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        callback();
      }
    };
    document.addEventListener("mousedown", handleClickEvent);
    return () => {
      document.removeEventListener("mousedown", handleClickEvent);
    };
  }, [ref, callback]);
};

export default useClickOutsideAlert;
