const config = {
  baseUrl: 'https://nomoreparties.co/v1/wff-cohort-37',
  headers: {
    authorization: 'cc3ea751-60b3-4c26-91b2-a84f4d4525cc',
    'Content-Type': 'application/json'
  }
}

function checkResponse(res) {
  if (res.ok) {
    return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`);
}

export const getUserInfo = () => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers
  })
    .then(checkResponse);
}

export const getInitialCards = () => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers
  })
    .then(checkResponse);
}

export const updateUserInfo = (name, about) => {
  return fetch(`${config.baseUrl}/users/me`, {
    headers: config.headers,
    method: 'PATCH',
    body: JSON.stringify({
      name: name,
      about: about
    })
  })
    .then(checkResponse);
}

export const addNewCard = (name, link) => {
  return fetch(`${config.baseUrl}/cards`, {
    headers: config.headers,
    method: 'POST',
    body: JSON.stringify({
      name: name,
      link: link
    })
  })
    .then(checkResponse);
}

export const removeCard = (cardId) => {
  return fetch(`${config.baseUrl}/cards/${cardId}`, {
    headers: config.headers,
    method: 'DELETE'
  })
    .then(checkResponse);
}

export const addLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    headers: config.headers,
    method: 'PUT'
  })
    .then(checkResponse);
}

export const removeLike = (cardId) => {
  return fetch(`${config.baseUrl}/cards/likes/${cardId}`, {
    headers: config.headers,
    method: 'DELETE'
  })
    .then(checkResponse);
}

export const updateUserAvatar = (url) => {
  return fetch(`${config.baseUrl}/users/me/avatar`, {
    headers: config.headers,
    method: 'PATCH',
    body: JSON.stringify({
      avatar: url
    })
  })
    .then(checkResponse);
}