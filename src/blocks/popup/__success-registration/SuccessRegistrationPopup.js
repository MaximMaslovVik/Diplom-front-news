import './popup__success-registration.css';
import Popup from '../Popup';

export default class SuccessRegistrationPopup extends Popup {
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
}
