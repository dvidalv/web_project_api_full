import CloseIcon from '../images/Close-Icon.svg';
import { motion } from 'framer-motion';
import usePopup from '../hooks/usePopups';

function PopupWithForm({ name, title, children, isOpen, onClose, onSubmit }) {
  const { handleOverlayClick } = usePopup(onClose);

  return (
    <motion.section
      className={`popup popup_type_${name} ${isOpen ? 'popup_opened' : ''}`}
      initial={{ opacity: 0 }}
      animate={{ opacity: isOpen ? 1 : 0 }}
      transition={{ duration: 0.7 }}
      exit={{ opacity: 0 }}
      onClick={handleOverlayClick}
    >
      <form
        className={`popup__form popup__form-update-${name}`}
        noValidate
        onSubmit={onSubmit}
      >
        <h2 className="popup__title">{title}</h2>
        <img
          className="btnCerrar popup__button-cerrar-update-perfil"
          src={CloseIcon}
          alt="icon cerrar"
          onClick={onClose}
        />
        {children}
      </form>
    </motion.section>
  );
}

export default PopupWithForm;
