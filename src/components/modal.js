  
import { placesList, deleteCard, createCard, handleLike } from './card.js';

  const popupWindows = document.querySelectorAll('.popup');
  const imagePopup = document.querySelector('#popup-image');
  const image = imagePopup.querySelector('.popup__image');
  const caption = imagePopup.querySelector('.popup__caption');

  const editPopup = document.querySelector('#popup-edit');
  const formElement = editPopup.querySelector('.popup__form');
  const nameInput = formElement.querySelector('.popup__input_type_name');
  const jobInput = formElement.querySelector('.popup__input_type_description');
  const profileName = document.querySelector('.profile__title');
  const profileDescription = document.querySelector('.profile__description');

  const addModal = document.querySelector('#popup-new-card');
  const addForm = addModal.querySelector('.popup__form');
  const titleInput = addForm.querySelector('.popup__input_type_card-name');
  const urlInput = addForm.querySelector('.popup__input_type_url');

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

  function handleFormSubmit(event) {
    event.preventDefault(); 

    const newName = nameInput.value;
    const newDescription = jobInput.value;

    profileName.textContent = newName;
    profileDescription.textContent = newDescription;

    closePopup(editPopup);
  }

  function addCard(cardElement) {
    placesList.prepend(cardElement);
  }

  function handleAddFormSubmit(event) {
    event.preventDefault();

    const newCard = createCard({ name: titleInput.value, link: urlInput.value }, deleteCard, handleLike);
    addCard(newCard);

    closePopup(addModal);
    addForm.reset();
  }

  formElement.addEventListener('submit', handleFormSubmit);
  addForm.addEventListener('submit', handleAddFormSubmit);

  function setupPopaps(triggers, selector ) {
     triggers.forEach(trigger => {
      trigger.addEventListener('click', (event) => {
        const popup = document.querySelector(selector);
        if (selector === '#popup-image') {
          image.src = event.target.src;
          image.alt = event.target.alt;
          caption.textContent = event.target.alt;
        }
        if (selector === '#popup-edit') {
          nameInput.value = profileName.textContent;
          jobInput.value = profileDescription.textContent;
        }

        openPopup(popup);
      });
    });
  }

  popupWindows.forEach(popup => {
    const closeButton = popup.querySelector('.popup__close');
    closeButton.addEventListener('click', () => closePopup(popup));
  });

  export { setupPopaps }