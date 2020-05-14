import './header-search.css';
import Form from '../../js/components/Form';

export default class HeaderSearch extends Form {
  _submitForm(event) {
    event.preventDefault();

    if (!this._validateForm()) {
      this._setServerError('Нужно ввести ключевое слово');

      return;
    }

    this._setActiveStatus(false);
    this._actions.callAction('submit', [this.search, () => this._setActiveStatus(true)]);
  }
}
