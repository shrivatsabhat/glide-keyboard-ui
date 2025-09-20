import { useEffect, useRef } from 'react';

interface UseKeyboardNavigationOptions {
  enabled?: boolean;
  wrap?: boolean;
  selector?: string;
}

export const useKeyboardNavigation = (options: UseKeyboardNavigationOptions = {}) => {
  const {
    enabled = true,
    wrap = true,
    selector = 'input, select, button, textarea, [tabindex]:not([tabindex="-1"])'
  } = options;

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!enabled || !containerRef.current) return;

    const container = containerRef.current;

    const handleKeyDown = (event: KeyboardEvent) => {
      const focusableElements = container.querySelectorAll(selector);
      const focusableArray = Array.from(focusableElements) as HTMLElement[];
      const currentIndex = focusableArray.indexOf(document.activeElement as HTMLElement);

      switch (event.key) {
        case 'Tab':
          // Let default tab behavior work
          break;
          
        case 'ArrowDown':
        case 'Enter':
          event.preventDefault();
          if (currentIndex < focusableArray.length - 1) {
            focusableArray[currentIndex + 1]?.focus();
          } else if (wrap && focusableArray.length > 0) {
            focusableArray[0]?.focus();
          }
          break;
          
        case 'ArrowUp':
          event.preventDefault();
          if (currentIndex > 0) {
            focusableArray[currentIndex - 1]?.focus();
          } else if (wrap && focusableArray.length > 0) {
            focusableArray[focusableArray.length - 1]?.focus();
          }
          break;
          
        case 'Home':
          event.preventDefault();
          focusableArray[0]?.focus();
          break;
          
        case 'End':
          event.preventDefault();
          focusableArray[focusableArray.length - 1]?.focus();
          break;
      }
    };

    container.addEventListener('keydown', handleKeyDown);

    return () => {
      container.removeEventListener('keydown', handleKeyDown);
    };
  }, [enabled, wrap, selector]);

  return containerRef;
};