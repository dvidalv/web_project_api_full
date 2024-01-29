import CloseIcon from '../images/Close-Icon.svg';
import checked_Icon from '../images/checked.svg';
import fail_Icon from '../images/failButton.svg';
import React from 'react';

function InfoTooltip({ onSuccess, onFail, onClose, message }) {
  return (
    <div className={`popup ${onSuccess || onFail ? 'popup_opened' : ''}`}>
      <div className="popup_content">
        <img
          className="register__icon"
          src={onSuccess ? checked_Icon : fail_Icon}
          alt="checked"
        />
        <button className="popup__close-button" type="button" onClick={onClose}>
          <img src={CloseIcon} alt="Cerrar" />
        </button>
        <h2 className="popup__title">{message}</h2>
      </div>
    </div>
  );
}

export default InfoTooltip;
