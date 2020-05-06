import './pages/style.css';

const buttonMobileMenu = document.querySelector('.header__menu-mobile');
const crossMobileMenu = document.querySelector('.header__popup-mobile-close');

const buttonAuth = document.querySelector('.header__auth');
const popupClose = document.querySelector('.popup__close');

const buttonSignUp = document.querySelector('.popup__url-signup');
const buttonSignIn = document.querySelector('.popup__url-signin');

function openMobileMenu() {
  document.querySelector('.header__popup-mobile').classList.toggle('header_is-opened');
}

function closeMobileMenu() {
  document.querySelector('.header__popup-mobile').classList.toggle('header_is-opened');
}

function openSignInPopup() {
  document.querySelector('.popup-signin').classList.add('popup_is-opened');
  document.querySelector('.popup-signup').classList.remove('popup_is-opened');
  document.querySelector('.header__popup-mobile').classList.remove('header_is-opened');
}

function closeSignInPopup() {
  document.querySelector('.popup-signin').classList.remove('popup_is-opened');
}

function openSignUpPopup() {
  document.querySelector('.popup-signup').classList.add('popup_is-opened');
  document.querySelector('.popup-signin').classList.remove('popup_is-opened');
}

function closeSignUpPopup() {
  document.querySelector('.popup-signup').classList.remove('popup_is-opened');
}

buttonMobileMenu.addEventListener('click', openMobileMenu);
crossMobileMenu.addEventListener('click', closeMobileMenu);

buttonAuth.addEventListener('click', openSignInPopup);
popupClose.addEventListener('click', closeSignInPopup);

buttonSignUp.addEventListener('click', openSignUpPopup);
popupClose.addEventListener('click', closeSignUpPopup);

buttonSignIn.addEventListener('click', openSignInPopup);
