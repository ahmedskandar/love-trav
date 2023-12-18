import { useEffect, useRef } from "react";

export const useScrollToBottom = <T>(trigger: T) => {
  const containerRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    // Scroll to the bottom when new messages arrive
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [trigger]);

  return { containerRef };
};