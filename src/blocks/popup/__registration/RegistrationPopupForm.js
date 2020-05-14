import Form from '../../../js/components/Form';

export default class RegistrationPopupForm extends Form {
  async _submitForm(event) {
    event.preventDefault();
    this._setServerError('');
    this._setActiveStatus(false);

    this._actions.callAction(
      'submit',
      [
        { email: this.email, password: this.password, name: this.name },
        errorText => this._setServerError(errorText),
        () => this._setActiveStatus(true),
      ],
    );
  }
}
