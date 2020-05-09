import './pages/style.css';
import Popup from './js/components/Popup';
import SigninForm from './js/components/SigninForm';
import SignupForm from './js/components/SignupForm';
import NewsCard from './js/components/NewsCard';
import NewsCardList from './js/components/NewsCardList';

import {
  popupMobileOpenButton,
  popupMobileCloseButton,
  loginButton,
  signupButton,
  signinButton,
  afterSignupButton,
  closePopupButtonIn,
  closePopupButtonUp,
  closePopupButtonSuccess,
  header,
  popupButtonSignup,
  popupButtonSignin,
  mainApi,
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
  newsApi,
} from './js/constants/constants';

import {
  getProfile,
  deleteUser,
  removeAllChild,
  emptyResults,
  errorResults,
  preloader,
} from './js/utils/utils';

// получаем имя юзера из localstorage
function getCurrentUser() {
  let currentUser = '';
  if (getProfile) {
    currentUser = getProfile.name;
  }
  return currentUser;
}

// рендерим header
header.render(getProfile, getCurrentUser());

// попапы
const popupSignin = new Popup(document.querySelector('.popup-signin'));
const popupSignup = new Popup(document.querySelector('.popup-signup'));
const popupSuccess = new Popup(document.querySelector('.popup-success'));

// форма регистрации
const formSignin = new SigninForm(document.forms.signin);
const formSignup = new SignupForm(document.forms.signup);

// удаляем ошибки в формах при загрузке страницы
formSignin.clear();
formSignin.clearErrors();
formSignup.clear();
formSignup.clearErrors();

// пустой массив и счетчик, нужные для работы moreResults()
let cardElementArray = [];
let from = 0;

// рендер карточек, в т.ч. по кнопке Показать ещe
function moreResults() {
  let until = from + maxCount;
  if (until > cardElementArray.length) {
    until = cardElementArray.length;
    showMoreButton.classList.remove('results__more-button_is-opened');
  }
  const sliceRenderArray = cardElementArray.slice(from, until);
  const cardList = new NewsCardList(resultsList, sliceRenderArray);
  cardList.renderResults();
  from = until;
  return from;
}

// рендер карточек и ошибок
function cardRender(event) {
  event.preventDefault();
  cardElementArray = [];
  from = 0;
  removeAllChild(resultsList);
  emptyResults(false);
  errorResults(false);
  const searchInput = document.forms.search.elements.keyword;
  preloader(true);
  newsApi.getNews(searchInput.value)
    .then((data) => {
      const dataArticles = data.articles;
      if (dataArticles.length === 0) {
        showMoreButton.classList.remove('results__more-button_is-opened');
        emptyResults(true);
      } else {
        if (dataArticles.length <= 3) {
          showMoreButton.classList.remove('results__more-button_is-opened');
        } else {
          showMoreButton.classList.add('results__more-button_is-opened');
        }
        dataArticles.forEach((item) => {
          const { cardElement } = new NewsCard(item, searchInput.value);
          cardElementArray.push(cardElement);
          results.classList.add('results_is-opened');
        });
      }
      preloader(false);
      moreResults();
      return cardElementArray;
    })
    .catch(() => {
      errorResults(true);
    })
    .finally(() => {
      preloader(false);
    });
}

// открытие мобильного меню
function openPopupMobile() {
  const popupMobile = document.querySelector('.header__popup-mobile');
  popupMobile.classList.add('header_is-opened');
}

// закрытие мобильного меню
function closePopupMobile() {
  const popupMobile = document.querySelector('.header__popup-mobile');
  popupMobile.classList.remove('header_is-opened');
}

// открытие попапа входа
function openFormSignin() {
  popupSignin.open();
  formSignin.clear();
  formSignin.clearErrors();
  popupSignup.close();
  popupSuccess.close();
  closePopupMobile();
}

// открытие попапа регистрации
function openFormSignup() {
  popupSignup.open();
  formSignin.clear();
  formSignin.clearErrors();
  formSignup.clear();
  formSignup.clearErrors();
  popupSignin.close();
}

// открытие попапа успешной регистрации
function openFormSuccessSignup() {
  popupSuccess.open();
  formSignin.clear();
  formSignin.clearErrors();
  popupSignup.close();
}

// закрытие попапа
function closeForm() {
  popupSignin.close();
  popupSignup.close();
  popupSuccess.close();
  formSignin.clear();
  formSignin.clearErrors();
  formSignup.clear();
  formSignup.clearErrors();
}

// регистрация пользователя
function signup(event) {
  event.preventDefault();
  const email = document.forms.signup.elements.email.value;
  const password = document.forms.signup.elements.password.value;
  const name = document.forms.signup.elements.name.value;
  mainApi.signup(email, password, name)
    .then(() => {
      openFormSuccessSignup();
    })
    .catch((err) => {
      if (err == '500') {
        formSignup.setServerError(NOT_UNIQUE_USER);
      } else if (err == 'TypeError: Failed to fetch') {
        formSignup.setServerError(NO_INTERNET);
      }
    });
}

// вход пользователя
function signin(event) {
  event.preventDefault();
  const email = document.forms.signin.elements.email.value;
  const password = document.forms.signin.elements.password.value;
  mainApi.signin(email, password)
    .then((data) => {
      header.render(true, data.name);
      closeForm();
      document.location.reload();
    })
    .catch((err) => {
      if (err === '401') {
        formSignin.setServerError(WRONG);
      } else if (err === 'TypeError: Failed to fetch') {
        formSignin.setServerError(NO_INTERNET);
      } else {
        formSignin.setServerError(NOT_REGISTERED);
      }
    });
}

// выход из профиля
function logout() {
  deleteUser('user');
  header.render(false, '');
}

// слушатели
popupMobileOpenButton.addEventListener('click', openPopupMobile);
popupMobileCloseButton.addEventListener('click', closePopupMobile);
loginButton.addEventListener('click', openFormSignin);
closePopupButtonIn.addEventListener('click', closeForm);
signupButton.addEventListener('click', openFormSignup);
closePopupButtonUp.addEventListener('click', closeForm);
afterSignupButton.addEventListener('click', openFormSignin);
closePopupButtonSuccess.addEventListener('click', closeForm);
signinButton.addEventListener('click', openFormSignin);
popupButtonSignup.addEventListener('click', signup);
popupButtonSignin.addEventListener('click', signin);
logoutButton.addEventListener('click', logout);
showMoreButton.addEventListener('click', moreResults);
searchForm.addEventListener('submit', cardRender);
