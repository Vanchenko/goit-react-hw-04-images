import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import PropTypes from 'prop-types';
import css from './Modal.module.css';

const modalRoot = document.querySelector('#modal-root');

export const Modal =({onClose , bigImage}) => {

  useEffect(() => {
    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const handleKeyDown = e => {
    if (e.code === 'Escape') {
      onClose();
    }
  };

  const handleBackdropClick = e => {
    if (e.currentTarget === e.target) {
      onClose();
    }
  };

return createPortal(
      <div className={css.Overlay} onClick={handleBackdropClick} >
        <div className={css.Modal}>
          <img src={bigImage} alt="" />
        </div>
      </div>,
      modalRoot
    );
}

Modal.propTypes = {
  bigImages: PropTypes.string,
  onClose: PropTypes.func.isRequired,
};

