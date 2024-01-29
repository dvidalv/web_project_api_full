import { useCallback } from 'react';
import useEvent from './useEvent';

function usePopup(onClose) {
  const handleEsc = useCallback(
    (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    },
    [onClose]
  );

  const handleOverlayClick = useCallback(
    (e) => {
      if (e.target.classList.contains('popup')) {
        onClose();
      }
    },
    [onClose]
  );

  useEvent('keydown', handleEsc);
  useEvent('click', handleOverlayClick);

  return { handleEsc, handleOverlayClick };
}

export default usePopup;
