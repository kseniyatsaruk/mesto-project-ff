import './pages/index.css';
import { handleLike, createCard } from './components/card.js';
import { openPopup, closePopup } from './components/modal.js';
import { enableValidation, clearValidation } from './validation.js';
import { getInitialCards, getUserInfo, updateUserInfo, addNewCard, updateUserAvatar, removeCard } from './api.js';

const placesList = document.querySelector('.places__list');
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
};

enableValidation(validationConfig);

const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const editAvatarButton = document.querySelector('.profile__edit-avatar');

const popupWindows = document.querySelectorAll('.popup');

const editPopup = document.querySelector('#popup-edit');
const formElement = editPopup.querySelector('.popup__form'); 
const nameInput = formElement.querySelector('.popup__input_type_name');
const jobInput = formElement.querySelector('.popup__input_type_description');
const profileName = document.querySelector('.profile__title');
const profileDescription = document.querySelector('.profile__description');
const profileImage = document.querySelector('.profile__image');

const editAvatar = document.querySelector('#popup-edit-avatar');
const editAvatarForm = editAvatar.querySelector('.popup__form');
const urlAvatarInput = editAvatarForm.querySelector('.popup__input_type_avatar-url');

const addModal = document.querySelector('#popup-new-card');
const addForm = addModal.querySelector('.popup__form'); 
const titleInput = addForm.querySelector('.popup__input_type_card-name');
const urlInput = addForm.querySelector('.popup__input_type_url');

const submitDeleteButton = document.querySelector('.popup__button_delete');

Promise.all([getUserInfo(), getInitialCards()])
  .then(([user, cards]) => {
    const userId = user._id;

    profileName.textContent = user.name;
    profileDescription.textContent = user.about;
    profileImage.style.backgroundImage = `url(${user.avatar})`;

    renderCards(cards, userId);
  })
  .catch(err => {
    console.error(err);
  });

function renderCards(cards, userId) {
  placesList.innerHTML = '';

  cards.forEach((item) => {
    const card = createCard(item, deleteCard, handleLike, handleImageClick, userId);
    placesList.appendChild(card);
  });
}

function handleEditProfileOpen() {
  clearValidation(formElement, validationConfig);
}

function handleAddPlaceOpen() {
  clearValidation(addForm, validationConfig);
}

function handleEditAvatarOpen() {
  clearValidation(editAvatarForm, validationConfig);
}

editButton.addEventListener('click', handleEditProfileOpen);
addButton.addEventListener('click', handleAddPlaceOpen);
editAvatarButton.addEventListener('click', handleEditAvatarOpen);

function handleImageClick(event) {
  const popup = document.querySelector('#popup-image'); 
  const image = popup.querySelector('.popup__image');
  const caption = popup.querySelector('.popup__caption');
  
  image.src = event.target.src;
  image.alt = event.target.alt;
  caption.textContent = event.target.alt;

  openPopup(popup);
}

function handleEditFormSubmit(event) {
  event.preventDefault();
  const submitButton = event.target.querySelector('.popup__button');

  submitButton.textContent = 'Сохранение...';
  submitButton.disabled = true;

  updateUserInfo(nameInput.value, jobInput.value)
    .then(user => {
      profileName.textContent = user.name;
      profileDescription.textContent = user.about;

      closePopup(editPopup);
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      submitButton.textContent = 'Сохранить';
      submitButton.disabled = false;
    });
}

function addCard(cardElement) {
  placesList.prepend(cardElement);
}

function handleAddFormSubmit(event) {
  event.preventDefault();
  const submitButton = event.target.querySelector('.popup__button');

  submitButton.textContent = 'Сохранение...';
  submitButton.disabled = true;

  addNewCard(titleInput.value, urlInput.value)
  .then(card => {
    const newCard = createCard(card, deleteCard, handleLike, handleImageClick, card.owner._id);
    addCard(newCard);
     
    closePopup(addModal);
    addForm.reset();
  })
  .catch(err => {
    console.log(err);
  })
  .finally(() => {
    submitButton.textContent = 'Сохранить';
    submitButton.disabled = false;
  });
}

function handleEditAvatarSubmit(event) {
  console.log('Форма отправлена!');
  event.preventDefault();
  const submitButton = event.target.querySelector('.popup__button');

  submitButton.textContent = 'Сохранение...';
  submitButton.disabled = true;

  updateUserAvatar(urlAvatarInput.value)
    .then(user => {
      profileImage.style.backgroundImage = `url(${user.avatar})`;

      closePopup(editAvatar);
    })
    .catch(err => {
      console.log(err);
    })
    .finally(() => {
      submitButton.textContent = 'Сохранить';
      submitButton.disabled = false;
    });
}

formElement.addEventListener('submit', handleEditFormSubmit);
addForm.addEventListener('submit', handleAddFormSubmit);
editAvatarForm.addEventListener('submit', handleEditAvatarSubmit);

function setupPopaps(triggers, selector) { 
  [triggers].forEach(trigger => {
    trigger.addEventListener('click', () => {
      const popup = document.querySelector(selector);
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

let cardIdToDelete = null;
let cardToDelete = null;
const cardDelete = document.querySelector('.popup_type_card-delete');

function deleteCard(cardId, card) {
  cardIdToDelete = cardId;
  cardToDelete = card;

  openPopup(cardDelete);
}

function handleDeleteCardSubmit(event) {
  event.preventDefault();

  removeCard(cardIdToDelete)
  .then(() => {
    cardToDelete.remove();
    closePopup(cardDelete);
  })
  .catch(err => {
    console.log(err);
  })
  .finally(() => {
    cardIdToDelete = null;
    cardToDelete = null;
  });
}

submitDeleteButton.addEventListener('click', handleDeleteCardSubmit);


setupPopaps(editButton, '#popup-edit');
setupPopaps(addButton, '#popup-new-card');
setupPopaps(editAvatarButton, '#popup-edit-avatar');