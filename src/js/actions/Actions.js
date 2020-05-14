export default class Actions {
  constructor(actions) {
    this._actions = actions || {};
  }

  hasAction(action) {
    return !!this._actions[action];
  }

  callAction(action, args) {
    if (!this.hasAction(action)) {
      return new Error('Такого действия не обнаружено');
    }
    return (this._actions[action])(...args);
  }
}
