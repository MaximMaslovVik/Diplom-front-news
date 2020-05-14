import './popup__login.css';
import Popup from '../Popup';

export default class LoginPopup extends Popup {
  _popupLinkClick() {
    this._loadRegisterPopup();
  }

  _loadRegisterPopup() {
    this._clearContent();
    this._actions.callAction(
      'showRegistrationPopup',
      [],
    );
  }
}
