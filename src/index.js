import './pages/index.css';
import initialCards from './scripts/cards.js';

const cardTemplate = document.querySelector('#card-template').content;
const cardElement = cardTemplate.querySelector('.card');
const placesList = document.querySelector('.places__list');

function createCard(cardData, onClickDelete) {
  const card = cardElement.cloneNode(true);
  const image = card.querySelector('.card__image');
  const title = card.querySelector('.card__title');

  image.src = cardData.link;
  image.alt = cardData.name;
  title.textContent = cardData.name;

  const deleteButton = card.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', () => onClickDelete(card));

  return card;
}

function deleteCard(card) {
  card.remove();
}

initialCards.forEach((item) => {
  const card = createCard(item, deleteCard);
  placesList.appendChild(card);
});
