import validator from 'validator';
import {
  WRONG_EMAIL,
  REQUIRED_INPUT,
  PASSWORD_LENGTH,
} from '../constants/constants';

export default class SigninForm {
  constructor(domElement) {
    this.domElement = domElement;
    this._validateForm = this._validateForm.bind(this);
    this.signinButton = this.domElement.querySelector('.popup__button');
    this.signinError = this.domElement.querySelector('.popup__error');
    this.emailError = this.domElement.querySelector('.popup__error_email');
    this.passwordError = this.domElement.querySelector('.popup__error_password');
    this.domElement.addEventListener('input', this._validateForm);
  }

  // добавляет форме ошибку, пришедшую с сервера
  setServerError(errorText) {
    this.signinError.textContent = errorText;
  }

  // валидирует email
  _validateInputElement(str) {
    if (!(validator.isEmail(str.value))) {
      this.emailError
        .textContent = WRONG_EMAIL;
    } else {
      this.emailError
        .textContent = '';
      return true;
    }
    return false;
  }

  // валидирует пароль
  _validatePassword(str) {
    if (str.value.length === 0) {
      this.passwordError
        .textContent = REQUIRED_INPUT;
    } else if (str.value.length < 6) {
      this.passwordError
        .textContent = PASSWORD_LENGTH;
    } else {
      this.passwordError
        .textContent = '';
      return true;
    }
    return false;
  }

  // валидирует всю форму
  _validateForm() {
    const inputEmail = this._validateInputElement(this.domElement.email);
    const inputPassword = this._validatePassword(this.domElement.password);
    this._buttonDisabled();

    if (inputEmail && inputPassword) {
      this._buttonActive();
    } else {
      this._buttonDisabled();
    }
  }

  // очищает сообщения об ошибках
  clearErrors() {
    this.emailError.textContent = '';
    this.passwordError.textContent = '';
    if (this.signinError) {
      this.signinError.textContent = '';
    }
    this._buttonDisabled();
  }

  // очищает поля формы
  clear() {
    this.domElement.email.value = '';
    this.domElement.password.value = '';
    this._buttonDisabled();
  }

  // деактивирует кнопку входа
  _buttonDisabled() {
    this.signinButton.classList.add('popup__button_disabled');
    this.signinButton.setAttribute('disabled', true);
  }

  // активирует кнопку входа
  _buttonActive() {
    this.signinButton.classList.remove('popup__button_disabled');
    this.signinButton.removeAttribute('disabled');
  }
}
