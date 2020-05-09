import SigninForm from './SigninForm';
import {
  REQUIRED_INPUT,
  NAME_LENGTH,
} from '../constants/constants';

// Класс формы регистрации, расширяющий класс формы входа
export default class SignupForm extends SigninForm {
  constructor(domElement) {
    super(domElement);
    this.signupError = this.domElement.querySelector('.popup__error_duplicate');
    this.nameError = this.domElement.querySelector('.popup__error_name');
  }

  // добавляет форме ошибку, пришедшую с сервера
  setServerError(errorText) {
    this.signupError.textContent = errorText;
  }

  // валидирует name
  _validateLenghtName(str) {
    if (str.value.length === 0) {
      this.nameError.textContent = REQUIRED_INPUT;
    } else if (str.value.length < 2 || str.value.length > 30) {
      this.nameError
        .textContent = NAME_LENGTH;
    } else {
      this.nameError.textContent = '';
      return true;
    }
    return false;
  }

  // валидирует всю форму
  _validateForm() {
    const inputEmail = this._validateInputElement(this.domElement.email);
    const inputPassword = this._validatePassword(this.domElement.password);
    const inputName = this._validateLenghtName(this.domElement.name);

    this._buttonDisabled();
    if (inputEmail && inputPassword && inputName) {
      this._buttonActive();
    } else {
      this._buttonDisabled();
    }
  }

  // очищает сообщения об ошибках
  clearErrors() {
    this.nameError.textContent = '';
    this.emailError.textContent = '';
    this.passwordError.textContent = '';
    if (this.signupError) {
      this.signupError.textContent = '';
    }
    this._buttonDisabled();
  }

  // очищает поля формы
  clear() {
    this.domElement.email.value = '';
    this.domElement.password.value = '';
    this.domElement.name.value = '';
    this._buttonDisabled();
  }
}
