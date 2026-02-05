import { useState, useRef, useEffect, useCallback } from "react";

export function useInfiniteScroll({
  hasMore,
  isLoading,
  rootMargin = "100px",
  initialPage = 1,
}) {
  const [pageNumber, setPageNumber] = useState(initialPage);

  const scrollRef = useRef(null);
  const sentinelRef = useRef(null);
  const observerRef = useRef(null);

  const resetPagination = useCallback(() => {
    setPageNumber(initialPage);

    // reconnect observer after reset
    if (observerRef.current) {
      observerRef.current.disconnect();
    }
  }, [initialPage]);

  useEffect(() => {
    if (!sentinelRef.current) return;

    observerRef.current = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && hasMore && !isLoading) {
          setPageNumber((prev) => prev + 1);
        }
      },
      {
        root: scrollRef.current, // ⭐ MOST IMPORTANT FIX
        rootMargin,
        threshold: 0.1,
      }
    );

    observerRef.current.observe(sentinelRef.current);

    return () => {
      observerRef.current?.disconnect();
    };
  }, [hasMore, isLoading, rootMargin]);

  return {
    pageNumber,
    scrollRef,
    sentinelRef,
    resetPagination,
  };
}
