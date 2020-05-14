export default class Popup {
  constructor(popup) {
    this.popup = popup;
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  // открывает попап
  open() {
    this.popup.classList.add('popup_is-opened');
  }

  // закрывает попап
  close() {
    this.popup.classList.remove('popup_is-opened');
  }
}
