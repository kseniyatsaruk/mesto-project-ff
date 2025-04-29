import { removeLike, addLike } from '../api.js'

const cardTemplate = document.querySelector('#card-template').content;
const cardElement = cardTemplate.querySelector('.card');

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

function handleLike(cardId, likeButton, likeCount, userId) {
  const isLiked = likeButton.classList.contains('card__like-button_is-active');
  likeButton.disabled = true;

  const action = isLiked ?  removeLike : addLike;
  action(cardId)
  .then(card => {
    likeCount.textContent = card.likes.length;

    likeButton.classList.toggle('card__like-button_is-active', 
      card.likes.some(like => like._id === userId));
  })
  .catch(err => {
    console.log(err);
  })
  .finally(() => {
    likeButton.disabled = false;
  });
}

export { handleLike, createCard }