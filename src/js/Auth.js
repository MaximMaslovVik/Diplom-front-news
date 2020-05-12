export default class Auth {
  constructor() {
    this.logout = this.logout.bind(this);
  }

  _setUserData({ name }) {
    this._name = name;
    this._loggedIn = true;
  }

  _clearUserData() {
    this._name = '';
    this._loggedIn = false;
  }

  _redirectToMainPage() {
    if (this.isSavedPage()) {
      window.location.href = '/';
    }
  }

  getAuthInfo() {
    return { userName: this._name, isLoggedIn: this._loggedIn };
  }

  setActions(actions) {
    this._actions = actions;
  }

  isAuth() {
    return this._loggedIn;
  }

  isSavedPage() {
    return window.location.pathname === '/saved' || window.location.pathname === '/saved/';
  }

  getUserName() {
    return this._name;
  }

  authenticate() {
    this._actions.callAction(
      'authenticate',
      [
        name => this._setUserData(name),
        () => this._clearUserData(),
        () => this._redirectToMainPage(),
        () => this.isSavedPage(),
        () => this.getAuthInfo(),
      ],
    );
  }

  logout() {
    this._clearUserData();

    this._actions.callAction(
      'logout',
      [
        () => this.getAuthInfo(),
        () => this._redirectToMainPage(),
      ],
    );
  }
}
