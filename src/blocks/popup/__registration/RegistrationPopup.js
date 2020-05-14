import './popup__registration.css';
import Popup from '../Popup';

export default class RegistrationPopup extends Popup {
  _popupLinkClick() {
    this._loadLoginPopup();
  }

  _loadLoginPopup() {
    this._clearContent();
    this._actions.callAction(
      'showLoginPopup',
      [],
    );
  }

  loadSuccessPopup() {
    this._clearContent();
    this._actions.callAction(
      'showSuccessRegistrationPopup',
      [],
    );
  }
}
