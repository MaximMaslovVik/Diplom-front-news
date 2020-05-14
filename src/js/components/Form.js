import BaseComponent from './BaseComponent';

export default class Form extends BaseComponent {
  constructor(args) {
    super();

    const {
      formSelector,
      actionButtonSelector,
      requiredInputSelectors = [],
    } = args;

    this._formSelector = formSelector;
    this._actionButtonSelector = actionButtonSelector;
    this._requiredInputSelectors = requiredInputSelectors;

    this._submitForm = this._submitForm.bind(this);
  }

  _setEventListeners() {
    const inputEvent = event => {
      this[event.target.name] = event.target.value;
      if (!this._validateForm()) {
        this._actionButton.setAttribute('disabled', 'true');
      } else {
        this._actionButton.removeAttribute('disabled');
      }
      this._setServerError('');
    };

    const submitEvent = event => {
      this._setServerError('');
      this._submitForm(event);
    };

    this._setHandlers([
      { element: this._form, event: 'input', method: inputEvent },
      { element: this._form, event: 'submit', method: submitEvent },
    ]);
  }

  _selectRequiredInputs() {
    this._requiredInputs = this._requiredInputSelectors
      .map(selector => this._form.querySelector(selector));
  }

  _setForm() {
    this._form = document.querySelector(this._formSelector);
    this._formError = this._form.querySelector('.form-error');
  }

  _setActionButton() {
    this._actionButton = document.querySelector(this._actionButtonSelector);
  }

  _setActiveStatus(active) {
    this._form.elements.forEach(element => {
      if (active) {
        element.removeAttribute('disabled');
      } else {
        element.setAttribute('disabled', '');
      }
    });
  }

  _setServerError(message) {
    if (this._formError) {
      this._formError.textContent = message;
    }
  }

  _submitForm(event) {
    event.preventDefault();
  }

  _validateForm() {
    let isValid = true;

    if (this._requiredInputs.length) {
      this._requiredInputs.forEach(input => {
        if (input) {
          isValid = isValid && this._validateInputElement(input);
        }
      });
    }

    return isValid;
  }

  _validateInputElement(input) {
    return input.validity.valid;
  }

  initForm() {
    this._setForm();
    this._setActionButton();
    this._setEventListeners();
    this._selectRequiredInputs();
    this._setServerError('');
  }

  close() {
    this._reset();
  }
}
