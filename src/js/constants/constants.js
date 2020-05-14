import Button from '../components/Button';
import Header from '../components/Header';
import MainApi from '../api/MainApi';
import NewsApi from '../api/NewsApi';

// кнопка открытия-закрытия моб меню
const popupMobileOpenButton = new Button(document.querySelector('.header__menu-mobile'));
const popupMobileCloseButton = new Button(document.querySelector('.header__popup-mobile-close'));

// кнопки login, logout
const loginButton = new Button(document.querySelector('.header__auth'));
const logoutButton = new Button(document.querySelector('.header__auth-logged-in'));

// кнопки переключения между попапами
const signupButton = new Button(document.querySelector('.popup__url-signup'));
const signinButton = new Button(document.querySelector('.popup__url-signin'));
const afterSignupButton = new Button(document.querySelector('.popup__url-signin-success'));

// кнопки закрытия попапов
const closePopupButtonIn = new Button(document.querySelector('.popup__close_signin'));
const closePopupButtonUp = new Button(document.querySelector('.popup__close_signup'));
const closePopupButtonSuccess = new Button(document.querySelector('.popup__close_successful-signup'));

// шапка
const header = new Header(document.querySelector('.header'));

// кнопки Зарегистрироваться и Войти
const popupButtonSignup = new Button(document.querySelector('.popup__button_signup'));
const popupButtonSignin = new Button(document.querySelector('.popup__button_signin'));

// MainAPI
const mainURL = 'https://api.diplom-max.ml';
const mainApi = new MainApi(mainURL);

// NewsAPI
const newsURL = 'https://newsapi.org/v2/everything?';
const apiKey = 'b9fc7a01880741b29710b92e9f8f91bd';
const newsApi = new NewsApi(newsURL, apiKey);

// Кнопка Показать еще
const showMoreButton = document.querySelector('.results__more-button');

// счетчик статей
const maxCount = 3;

// results
const results = document.querySelector('.results');
const resultsList = document.querySelector('.results__list');

// no-results
const noResults = document.querySelector('.not-found');
const noResultsText = document.querySelector('.not-found__text');
const noResultsTitle = document.querySelector('.not-found__title');

// страница saved-articles
const favoritesUserName = document.querySelector('.favorites__user-name');
const favoritesGlobalCount = document.querySelector('.favorites__global-count');
const favoritesDifferent = document.querySelector('.favorites__different');
const favoritesKeyWords = document.querySelector('.favorites__key-words');
const favoritesWords = document.querySelector('.favorites__words');
const favoritesOthers = document.querySelector('.favorites__others');
const favoritesOthersCount = document.querySelector('.favorites__others-count');

// страница saved-articles
const NO = 'нет';
const SAVE_ONE = ' сохраненная статья';
const SAVE_TWO = ' сохраненные статьи';
const SAVE_THREE = ' сохраненных статей';

// форма Искать
const searchForm = document.forms.search;

// ошибки при рендере карточек
const emptyResultText = 'К сожалению по вашему запросу ничего не найдено';
const errorResultText = 'Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз';

// ошибки попапов
const WRONG_EMAIL = 'Неверный формат email';
const REQUIRED_INPUT = 'Это обязательное поле';
const PASSWORD_LENGTH = 'Длина пароля должна быть не меньше 6 символов';
const NAME_LENGTH = 'Длина имени должна быть от 2 до 30 символов';
const NOT_UNIQUE_USER = 'Такой пользователь уже существует';
const NO_INTERNET = 'No internet connection';
const WRONG = 'Неверный логин или пароль';
const NOT_REGISTERED = 'Пользователь не зарегистрирован';

export {
  popupMobileOpenButton,
  popupMobileCloseButton,
  loginButton,
  signupButton,
  signinButton,
  afterSignupButton,
  closePopupButtonIn,
  closePopupButtonUp,
  closePopupButtonSuccess,
  WRONG_EMAIL,
  REQUIRED_INPUT,
  PASSWORD_LENGTH,
  NAME_LENGTH,
  header,
  popupButtonSignup,
  popupButtonSignin,
  mainApi,
  newsApi,
  NOT_UNIQUE_USER,
  NO_INTERNET,
  WRONG,
  NOT_REGISTERED,
  logoutButton,
  maxCount,
  showMoreButton,
  results,
  resultsList,
  searchForm,
  noResultsTitle,
  noResults,
  noResultsText,
  emptyResultText,
  errorResultText,
  favoritesUserName,
  favoritesKeyWords,
  favoritesGlobalCount,
  favoritesDifferent,
  favoritesWords,
  favoritesOthers,
  favoritesOthersCount,
  NO,
  SAVE_ONE,
  SAVE_TWO,
  SAVE_THREE,
};
