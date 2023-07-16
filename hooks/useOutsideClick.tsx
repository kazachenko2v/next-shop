import React from "react";
import { useEvent } from "./useEvent";

export const useOutsideClick = (
  elementRef: React.RefObject<HTMLElement>,
  butRef: React.RefObject<HTMLElement>,
  enabled: boolean,
  onOutsideClick: VoidFunction
) => {
  const handleOutsideClick = useEvent(onOutsideClick);

  React.useEffect(() => {
    const handleClick = (e: MouseEvent | TouchEvent) => {
      if (!enabled) {
        return;
      }
      if (!(e.target instanceof Node)) {
        return;
      }
      if (!elementRef.current || !butRef.current) {
        return;
      }

      if (
        !elementRef.current.contains(e.target) &&
        !butRef.current.contains(e.target)
      ) {
        handleOutsideClick();
      }
    };

    document.addEventListener("mousedown", handleClick);
    document.addEventListener("touchstart", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("touchstart", handleClick);
    };
  }, [elementRef, butRef, handleOutsideClick, enabled]);
};
