import './popup.css';
import './_opened/popup_opened.css';
import BaseComponent from '../../js/components/BaseComponent';

export default class Popup extends BaseComponent {
  constructor(args) {
    super(args);

    const {
      closeControl,
      container,
      contentContainer,
      template,
      selectors,
    } = args;

    this._closeControl = closeControl;
    this._container = container;
    this._contentContainer = contentContainer;
    this._selectors = selectors;
    this._template = template;

    this._handleKeydown = this._handleKeydown.bind(this);
    this._clearContent = this._clearContent.bind(this);
    this._popupLinkClick = this._popupLinkClick.bind(this);

    this.setContent = this.setContent.bind(this);
    this.open = this.open.bind(this);
    this.close = this.close.bind(this);
  }

  _setTemplate() {
    this._contentContainer.appendChild(this._template.cloneNode(true).content);
  }

  _setEventListeners() {
    this._setHandlers([
      { element: this._closeControl, event: 'click', method: event => this.close(event) },
      { element: document, event: 'keydown', method: event => this._handleKeydown(event) },
      { element: document, event: 'mousedown', method: event => this._handleKeydown(event) },
      { element: this._container.querySelector(this._selectors.popupLink), event: 'click', method: this._popupLinkClick },
    ]);
  }

  _clearContent() {
    if (this._actions.hasAction('closeForm')) {
      this._actions.callAction(
        'closeForm',
        [],
      );
    }

    this._reset();
    this._contentContainer.innerHTML = '';
  }

  _handleKeydown(event) {
    if (event.key === 'Escape' || event.target.classList.contains('popup_opened')) {
      this.close();
    }
  }

  _popupLinkClick() {
    return true;
  }

  setContent() {
    this._setTemplate();
    this._setEventListeners();

    if (this._actions.hasAction('openForm')) {
      this._actions.callAction(
        'openForm',
        [],
      );
    }
  }

  open() {
    this.setContent();
    this._container.classList.add('popup_opened');
  }

  close() {
    this._clearContent();
    this._container.classList.remove('popup_opened');
  }
}
