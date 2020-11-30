import { useEffect, useRef } from "react";

const useScrollToElement = (watcher) => {
  const ref = useRef(null);

  useEffect(() => {
    if (ref.current) {
      ref.current.scrollIntoView({
        behavior: "smooth",
        block: "center",
        inline: "center",
      });
    }
  }, watcher);

  return ref;
};

export default useScrollToElement;
