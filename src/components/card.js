const cardTemplate = document.querySelector('#card-template').content;
const cardElement = cardTemplate.querySelector('.card');

function handleLike(event) {
  event.target.classList.toggle('card__like-button_is-active');
}

function createCard(cardData, onClickDelete, onClickLike, onImageClick) {
  const card = cardElement.cloneNode(true);
  const image = card.querySelector('.card__image');
  const title = card.querySelector('.card__title');

  image.src = cardData.link;
  image.alt = cardData.name;
  title.textContent = cardData.name;

  const deleteButton = card.querySelector('.card__delete-button');
  deleteButton.addEventListener('click', () => onClickDelete(card));

  const likeButton = card.querySelector('.card__like-button');
  likeButton.addEventListener('click', onClickLike);

  const imageElements = card.querySelector('.card__image');
  imageElements.addEventListener('click', onImageClick);

  return card;
}

function deleteCard(card) {
  card.remove();
}

export { deleteCard, handleLike, createCard }