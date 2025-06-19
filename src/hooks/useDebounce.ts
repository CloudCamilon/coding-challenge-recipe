/**
 * Code by Cloud Camilon.
 * Reuse as a whole or in part is prohibited without permission.
 * Coding Challenge for Security Bank Philippines
 * authors: @vcamilon
 */

import React, { useEffect, useState } from "react";

/**
 *
 * useDebounce function for preventing realtime
 * search per keystroke as it might affect performance.
 *
 * @param {T} value - Current input value.
 * @param {number} delay - Timeout or delay period for debounce.
 * @returns {T} Generic type for useDebounce
 */
export function useDebounce<T>(value: T, delay: number): T {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
