"use client";

import {
  useCallback,
  useLayoutEffect,
  useRef,
  useState,
  type RefCallback,
  type RefObject,
} from "react";

const DESKTOP_MEDIA_QUERY = "(min-width: 1024px)";

function getMinContentHeight(headerElement: HTMLElement | null): number {
  const headerHeight = headerElement?.getBoundingClientRect().height ?? 0;
  const layoutGap = 24;
  const gridVerticalPadding = 48;

  return window.innerHeight - headerHeight - layoutGap - gridVerticalPadding;
}

export function useProfitsSyncedColumnHeight(
  headerRef: RefObject<HTMLElement | null>,
) {
  const [layoutElement, setLayoutElement] = useState<HTMLDivElement | null>(
    null,
  );
  const [sideColumnHeight, setSideColumnHeight] = useState<number | null>(null);
  const layoutElementRef = useRef<HTMLDivElement | null>(null);

  const measureHeights = useCallback(() => {
    if (!window.matchMedia(DESKTOP_MEDIA_QUERY).matches) {
      setSideColumnHeight(null);
      return;
    }

    const measuredElement = layoutElementRef.current;

    if (!measuredElement) {
      return;
    }

    const layoutHeight = Math.ceil(
      measuredElement.getBoundingClientRect().height,
    );
    const screenHeight = Math.ceil(getMinContentHeight(headerRef.current));

    setSideColumnHeight(Math.max(layoutHeight, screenHeight));
  }, [headerRef]);

  const scheduleMeasure = useCallback(() => {
    requestAnimationFrame(() => {
      requestAnimationFrame(measureHeights);
    });
  }, [measureHeights]);

  const layoutRef: RefCallback<HTMLDivElement> = useCallback(
    (node) => {
      layoutElementRef.current = node;
      setLayoutElement(node);
      if (node) {
        scheduleMeasure();
      }
    },
    [scheduleMeasure],
  );

  useLayoutEffect(() => {
    if (!layoutElement) {
      return;
    }

    scheduleMeasure();

    const resizeObserver = new ResizeObserver(scheduleMeasure);
    resizeObserver.observe(layoutElement);

    const headerElement = headerRef.current;
    if (headerElement) {
      resizeObserver.observe(headerElement);
    }

    window.addEventListener("resize", scheduleMeasure);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", scheduleMeasure);
    };
  }, [layoutElement, headerRef, scheduleMeasure]);

  return {
    layoutRef,
    sideColumnHeight,
    scheduleMeasure,
  };
}
