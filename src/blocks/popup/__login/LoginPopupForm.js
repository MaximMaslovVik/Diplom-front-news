import Form from '../../../js/components/Form';

export default class LoginPopupForm extends Form {
  async _submitForm(event) {
    event.preventDefault();
    this._setServerError('');
    this._setActiveStatus(false);

    this._actions.callAction(
      'submit',
      [
        { email: this.email, password: this.password },
        () => this.close(),
        errorText => this._setServerError(errorText),
        () => this._setActiveStatus(true),
      ],
    );
  }
}
