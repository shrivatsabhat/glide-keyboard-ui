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
          event.preventDefault();
          if (currentIndex < focusableArray.length - 1) {
            focusableArray[currentIndex + 1]?.focus();
          } else if (wrap && focusableArray.length > 0) {
            focusableArray[0]?.focus();
          }
          break;
          
        case 'Enter':
          event.preventDefault();
          const activeElement = document.activeElement as HTMLElement;
          
          // If it's a select element, open it
          if (activeElement.tagName === 'SELECT') {
            activeElement.click();
            return;
          }
          
          // If it's a button, click it
          if (activeElement.tagName === 'BUTTON') {
            activeElement.click();
            return;
          }
          
          // For other elements, move to next focusable element
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

        case 'ArrowLeft':
          event.preventDefault();
          // Navigate to previous sibling element or group
          const currentElement = document.activeElement as HTMLElement;
          const parentRow = currentElement.closest('[data-row]');
          if (parentRow) {
            const rowElements = parentRow.querySelectorAll(selector);
            const rowArray = Array.from(rowElements) as HTMLElement[];
            const rowIndex = rowArray.indexOf(currentElement);
            if (rowIndex > 0) {
              rowArray[rowIndex - 1]?.focus();
            }
          }
          break;

        case 'ArrowRight':
          event.preventDefault();
          // Navigate to next sibling element or group
          const currentEl = document.activeElement as HTMLElement;
          const parentRowRight = currentEl.closest('[data-row]');
          if (parentRowRight) {
            const rowElementsRight = parentRowRight.querySelectorAll(selector);
            const rowArrayRight = Array.from(rowElementsRight) as HTMLElement[];
            const rowIndexRight = rowArrayRight.indexOf(currentEl);
            if (rowIndexRight < rowArrayRight.length - 1) {
              rowArrayRight[rowIndexRight + 1]?.focus();
            }
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