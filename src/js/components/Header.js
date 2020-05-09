export default class Header {
  constructor(domElement) {
    this.domElement = domElement;
    this.render = this.render.bind(this);
    this.savedMessages = this.domElement.querySelector('.header__saved-articles');
    this.logout = this.domElement.querySelector('.header__auth-logged-in');
    this.userName = this.domElement.querySelector('.header__auth-name');
    this.login = this.domElement.querySelector('.header__auth');
  }

  // рендер шапки
  render(isLoggedIn, userName) {
    if (isLoggedIn) {
      this.savedMessages.classList.add('header__saved-articles_is-opened');
      this.logout.classList.add('header__auth-logged-in_is-opened');
      this.userName.textContent = userName;
      this.login.classList.remove('header__auth_is-opened');
    } else {
      this.savedMessages.classList.remove('header__saved-articles_is-opened');
      this.logout.classList.remove('header__auth-logged-in_is-opened');
      this.userName.textContent = '';
      this.login.classList.add('header__auth_is-opened');
    }
  }
}
