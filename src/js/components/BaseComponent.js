export default class BaseComponent {
  constructor() {
    this._actions = {};
    this._handlers = [];
  }

  _setHandlers(handlers) {
    handlers.forEach(({ element, event, method }) => {
      this._addEventListener(element, event, method);
    });
  }

  _addEventListener(element, event, method) {
    element.addEventListener(event, method);
    this._handlers.push({
      element, event, method,
    });
  }

  _reset() {
    this._handlers.forEach(listener => {
      listener.element.removeEventListener(listener.event, listener.method);
    });
  }

  setActions(actions) {
    this._actions = actions;
  }
}
