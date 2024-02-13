import CloseIcon from '../images/Close-Icon.svg';
import { motion, AnimatePresence } from 'framer-motion';
import usePopup from '../hooks/usePopups';
function ImagePopup({ card, onClose }) {
  const { handleOverlayClick } = usePopup(onClose);

  return (
    <AnimatePresence>
      <motion.div
        className={`popup ${card.link && 'popup_opened'}`}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.7 }}
        exit={{ opacity: 0 }}
        onClick={handleOverlayClick}
      >
        <div className="popup__image-container">
          <img src={card?.link} alt={card?.name} className="popup__image" />
          <img
            src={CloseIcon}
            alt="close"
            className="popup__close"
            onClick={onClose}
          />
        </div>
      </motion.div>
    </AnimatePresence>
  );
}

export default ImagePopup;
