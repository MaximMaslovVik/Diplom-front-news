import {
  noResultsTitle,
  noResults,
  noResultsText,
  emptyResultText,
  errorResultText,
} from '../constants/constants';

// возвращает юзера
function getUser(item) {
  return JSON.parse(localStorage.getItem(item));
}

// возвращает профиль юзера
const getProfile = getUser('user');

// удаляет юзера
function deleteUser(item) {
  localStorage.removeItem(item);
}

// прелоудер
function preloader(flag) {
  const newsSearch = document.querySelector('.preloader');
  if (flag) {
    newsSearch.classList.add('preloader_is-opened');
  } else {
    newsSearch.classList.remove('preloader_is-opened');
  }
}

// ничего не найдено
function emptyResults(flag) {
  if (flag) {
    noResultsTitle.classList.add('not-found__title_is-opened');
    noResults.classList.add('not-found_is-opened');
    noResultsText.textContent = '';
    noResultsText.textContent = emptyResultText;
  } else {
    noResultsTitle.classList.remove('not-found__title_is-opened');
    noResults.classList.remove('not-found_is-opened');
    noResultsText.textContent = '';
  }
}

// ошибка сервера
function errorResults(flag) {
  if (flag) {
    noResultsTitle.classList.remove('not-found__title_is-opened');
    noResults.classList.add('not-found_is-opened');
    noResultsText.textContent = '';
    noResultsText.textContent = errorResultText;
  } else {
    noResultsTitle.classList.add('not-found__title_is-opened');
    noResults.classList.remove('not-found_is-opened');
    noResultsText.textContent = '';
  }
}

// удаление карточек
function removeAllChild(container) {
  while (container.firstChild) {
    container.removeChild(container.firstChild);
  }
}

export {
  getProfile,
  getUser,
  deleteUser,
  removeAllChild,
  emptyResults,
  errorResults,
  preloader,
};
