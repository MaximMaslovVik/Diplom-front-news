import './header-saved.css';
import BaseComponent from '../../js/components/BaseComponent';

export default class HeaderSaved extends BaseComponent {
  constructor(args) {
    super();

    const {
      name,
      articlesCount,
      details,
      tagTemplate,
      selectors,
    } = args;

    this._name = name;
    this._articlesCount = articlesCount;
    this._details = details;
    this._tagTemplate = tagTemplate;
    this._selectors = selectors;
  }

  _renderArticlesCount() {
    this._articlesCount.textContent = this._actions.callAction(
      'getArticlesCount',
      [],
    );
  }

  _renderSeparator(text) {
    const separator = document.createElement('span');
    separator.textContent = text;
    this._details.appendChild(separator);
  }

  _renderTag(tag) {
    const tagContainer = this._tagTemplate.cloneNode(true).content
      .querySelector(this._selectors.tag);
    tagContainer.textContent = tag;
    this._details.appendChild(tagContainer);
  }

  _renderKeywords() {
    const tags = this._actions.callAction(
      'getTags',
      [],
    );

    if (tags.length > 0) {
      this._renderSeparator('По ключевым словам: ');
    }

    const [firstTag, secondTag, thirdTag] = tags;

    if (tags.length === 1) {
      this._renderTag(firstTag);
    } else if (tags.length === 2) {
      this._renderTag(firstTag);
      this._renderSeparator(' и ');
      this._renderTag(secondTag);
    } else if (tags.length === 3) {
      this._renderTag(firstTag);
      this._renderSeparator(', ');
      this._renderTag(secondTag);
      this._renderSeparator(' и ');
      this._renderTag(thirdTag);
    } else if (tags.length > 3) {
      this._renderTag(firstTag);
      this._renderSeparator(', ');
      this._renderTag(secondTag);
      this._renderSeparator(' и ');
      this._renderTag(`${tags.length - 2} другим`);
    }
  }

  _clearContent() {
    this._articlesCount.textContent = 0;
    this._details.innerHTML = '';
  }

  render() {
    this._clearContent();
    this._renderArticlesCount();
    this._renderKeywords();

    this._name.textContent = this._actions.callAction(
      'getUserName',
      [],
    );

    this._actions.callAction(
      'renderResults',
      [],
    );
  }
}
