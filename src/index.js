import './pages/index.css';
import { initialCards } from './components/cards.js';
import { placesList, handleLike, deleteCard, createCard } from './components/card.js';
import { setupPopaps } from './components/modal.js';

initialCards.forEach((item) => {
  const card = createCard(item, deleteCard, handleLike);
  placesList.appendChild(card);
});

const editButtons = document.querySelectorAll('.profile__edit-button');
const addButtons = document.querySelectorAll('.profile__add-button');
const imageElements = document.querySelectorAll('.card__image');

setupPopaps(editButtons, '#popup-edit');
setupPopaps(addButtons, '#popup-new-card');
setupPopaps(imageElements, '#popup-image');