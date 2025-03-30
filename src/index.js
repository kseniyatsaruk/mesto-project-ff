import './pages/index.css';
import { initialCards } from './components/cards.js';
import { handleLike, deleteCard, createCard } from './components/card.js';
import { openPopup, closePopup } from './components/modal.js';

const placesList = document.querySelector('.places__list');

initialCards.forEach((item) => {
  const card = createCard(item, deleteCard, handleLike, handleImageClick);
  placesList.appendChild(card);
});

const editButtons = document.querySelector('.profile__edit-button');
const addButtons = document.querySelector('.profile__add-button');
const imageElements = document.querySelector('.card__image');

const popupWindows = document.querySelectorAll('.popup');

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

  const newCard = createCard({ name: titleInput.value, link: urlInput.value }, deleteCard, handleLike, handleImageClick);
  addCard(newCard);

  closePopup(addModal);
  addForm.reset();
}

formElement.addEventListener('submit', handleEditFormSubmit);
addForm.addEventListener('submit', handleAddFormSubmit);

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


setupPopaps(editButtons, '#popup-edit');
setupPopaps(addButtons, '#popup-new-card');
setupPopaps(imageElements, '#popup-image');