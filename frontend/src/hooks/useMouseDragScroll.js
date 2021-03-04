import { useEffect } from "react";

/**
 * React hook for handling drag scrolling
 * @param {Ref} ref - react ref to element to be scrolled
 */
const useMouseDragScroll = (ref) => {
    let pos = { top: 0, left: 0, x: 0, y: 0 };

    useEffect(() => {
        if (ref.current) {
            ref.current.style.cursor = "grab";

            // Add Mouse Events
            ref.current.addEventListener("pointerdown", handlePointerDown);
            document.addEventListener("pointerup", handlePointerUp);

            return () => {
                // Remove Mouse Events on rerender
                ref.current.removeEventListener(
                    "touchstart",
                    handlePointerDown
                );
                document.removeEventListener("mouseup", handlePointerUp);
            };
        }
    }, []);

    /**
     * Set the Initial position data on starting dragging
     * @param {float} xStartPos - drag start x coordinate
     * @param {float} yStartPos - drag start Y coordinate
     */
    const initiateDrag = (xStartPos, yStartPos) => {
        ref.current.style.cursor = "grabbing";
        ref.current.style.userSelect = "none";
        pos = {
            // The current scroll
            left: ref.current.scrollLeft,
            top: ref.current.scrollTop,
            // Get the current mouse position
            x: xStartPos,
            y: yStartPos,
        };
    };

    /**
     * Update the elements scroll position from new drag coordinates
     * @param {float} xDrag - drag x coordinate
     * @param {float} yDrag - drag y coordinate
     */
    const updateDragPosition = (xDrag, yDrag) => {
        const dx = xDrag - pos.x;
        const dy = yDrag - pos.y;

        // Scroll the element
        ref.current.scrollTop = pos.top - dy;
        ref.current.scrollLeft = pos.left - dx;
    };

    /**
     * End Drag
     */
    const endDrag = () => {
        ref.current.style.cursor = "grab";
        ref.current.style.removeProperty("user-select");
    };

    //
    // Event handlers
    //

    /**
     * Pointer down event handler
     * @param {PointerEvent} e - pointer event object
     * @listens PointerEvent
     */
    const handlePointerDown = (e) => {
        initiateDrag(e.clientX, e.clientY);
        document.addEventListener("pointermove", handlePointerMoved);
    };

    /**
     * Pointer move event handler
     * @param {PointerEvent} e - pointer event object
     * @listens PointerEvent
     */
    const handlePointerMoved = (e) => {
        updateDragPosition(e.clientX, e.clientY);
    };

    /**
     * Pointer up event handler
     * @listens PointerEvent
     */
    const handlePointerUp = () => {
        endDrag();
        document.removeEventListener("pointermove", handlePointerMoved);
    };
};

export default useMouseDragScroll;
