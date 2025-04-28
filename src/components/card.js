import { openPopup, closePopup } from './modal.js';
import { removeCard, removeLike, addLike } from '../api.js'

const cardTemplate = document.querySelector('#card-template').content;
const cardElement = cardTemplate.querySelector('.card');
const submitButton = document.querySelector('.popup__button_delete');

function createCard(cardData, onClickDelete, onClickLike, onImageClick, userId) {
  const card = cardElement.cloneNode(true);
  const image = card.querySelector('.card__image');
  const title = card.querySelector('.card__title');
  const likeCount = card.querySelector('.card__like-count');

  image.src = cardData.link;
  image.alt = cardData.name;
  title.textContent = cardData.name;

  likeCount.textContent = cardData.likes.length;

  const deleteButton = card.querySelector('.card__delete-button');
  if (cardData.owner._id !== userId) {
    deleteButton.remove();
  } else {
    deleteButton.addEventListener('click', () => {
      onClickDelete(cardData._id, card);
    });
  }

  const likeButton = card.querySelector('.card__like-button');
  const isLiked = cardData.likes.some(like => like._id === userId);
  if (isLiked) {
    likeButton.classList.add('card__like-button_is-active');
  }
  likeButton.addEventListener('click',  () => {
    onClickLike(cardData._id, likeButton, likeCount, userId);
  });

  const imageElements = card.querySelector('.card__image');
  imageElements.addEventListener('click', onImageClick);

  return card;
}

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

submitButton.addEventListener('click', handleDeleteCardSubmit);

function handleLike(cardId, likeButton, likeCount, userId) {
  const isLiked = likeButton.classList.contains('card__like-button_is-active');
  likeButton.classList.toggle('card__like-button_is-active');

  likeButton.disabled = true;
  const currentLikes = parseInt(likeCount.textContent);
  likeCount.textContent = isLiked ? currentLikes - 1 : currentLikes + 1;

  const action = isLiked ?  removeLike : addLike;
  action(cardId)
  .then(card => {
    likeCount.textContent = card.likes.length;
    if (card.likes.some(like => like._id === userId)) {
      likeButton.classList.add('card__like-button_is-active');
    } else {
      likeButton.classList.remove('card__like-button_is-active');
    }
  })
  .catch(err => {
    console.log(err);
    likeCount.textContent = currentLikes;
    likeButton.classList.toggle('card__like-button_is-active');
  })
  .finally(() => {
    likeButton.disabled = false;
  });
}

export { deleteCard, handleLike, createCard }