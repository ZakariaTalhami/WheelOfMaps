import { useEffect } from "react";

const useMouseDragScroll = (ref) => {
  let pos = { top: 0, left: 0, x: 0, y: 0 };

  useEffect(() => {
    if (ref.current) {
      ref.current.style.cursor = "grab";
      ref.current.addEventListener("mousedown", handleMouseDown);
      document.addEventListener("mouseup", handleMouseUp);

      return () => {
        ref.current.removeEventListener("mousedown", handleMouseDown);
        document.removeEventListener("mouseup", handleMouseUp);
      };
    }
  }, []);

  const handleMouseDown = (e) => {
    ref.current.style.cursor = "grabbing";
    ref.current.style.userSelect = "none";
    pos = {
      // The current scroll
      left: ref.current.scrollLeft,
      top: ref.current.scrollTop,
      // Get the current mouse position
      x: e.clientX,
      y: e.clientY,
    };
    document.addEventListener("mousemove", handleMouseMoved);
  };

  const handleMouseMoved = (e) => {
    // How far the mouse has been moved
    const dx = e.clientX - pos.x;
    const dy = e.clientY - pos.y;

    // Scroll the element
    ref.current.scrollTop = pos.top - dy;
    ref.current.scrollLeft = pos.left - dx;
  };

  const handleMouseUp = () => {
    ref.current.style.cursor = "grab";
    ref.current.style.removeProperty("user-select");
    document.removeEventListener("mousemove", handleMouseMoved);
  };
};

export default useMouseDragScroll;
