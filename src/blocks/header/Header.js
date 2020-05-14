import './header.css';
import BaseComponent from '../../js/components/BaseComponent';

export default class Header extends BaseComponent {
  constructor(args) {
    super();

    const {
      lightNotAuthTemplate,
      lightAuthTemplate,
      darkNotAuthTemplate,
      darkAuthTemplate,
      authButtonSelector,
      theme,
      container,
      selectors,
    } = args;

    this._notAuthTemplate = theme === 'light' ? lightNotAuthTemplate : darkNotAuthTemplate;
    this._authTemplate = theme === 'light' ? lightAuthTemplate : darkAuthTemplate;
    this._authButtonSelector = authButtonSelector;
    this._container = container;
    this._selectors = selectors;
  }

  render({ isLoggedIn, userName }) {
    this._reset();
    this._container.innerHTML = '';

    const template = isLoggedIn ? this._authTemplate : this._notAuthTemplate;
    this._container.appendChild(template.cloneNode(true).content);

    this._actions.callAction(
      'configActionButton',
      [
        isLoggedIn,
        userName,
        clickEvent => {
          this._setHandlers([
            { element: this._container.querySelector(this._authButtonSelector), event: 'click', method: clickEvent },
          ]);
        },
        this._selectors.actionButton,
      ],
    );
  }
}
