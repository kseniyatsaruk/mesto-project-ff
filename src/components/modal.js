  function openPopup(popup) {
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', handleEscKey);
    popup.addEventListener('mousedown', handleOverlayClick);
  }

  function closePopup(popup) {
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', handleEscKey);
    popup.removeEventListener('mousedown', handleOverlayClick);
  }

  function handleOverlayClick(event) {
    if (event.target === event.currentTarget) {
      closePopup(event.currentTarget);
    }
  }

  function handleEscKey(event) {
    if (event.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_is-opened');
      if (openedPopup) {
        closePopup(openedPopup);
      }
    }
  }


  export { openPopup, closePopup }