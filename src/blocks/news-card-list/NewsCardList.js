import './news-card-list.css';
import BaseComponent from '../../js/components/BaseComponent';

export default class NewsCardList extends BaseComponent {
  constructor(args) {
    super();

    const {
      container,
      results,
      searchInProcess,
      searchNoResults,
      searchError,
      selectors,
    } = args;

    this._container = container;
    this._results = results;
    this._searchInProcess = searchInProcess;
    this._searchNoResults = searchNoResults;
    this._searchError = searchError;
    this._selectors = selectors;

    this._cards = [];

    this._showMore = this._showMore.bind(this);
  }

  _renderTemplate(template) {
    this._reset();
    this._container.innerHTML = '';
    this._container.appendChild(template.cloneNode(true).content);
  }

  _showNewsCardList() {
    this._container.classList.remove('news-card-list_hidden');
  }

  renderLoader() {
    this._showNewsCardList();
    this._renderTemplate(this._searchInProcess);
  }

  renderError() {
    this._renderTemplate(this._searchError);
  }

  renderResults() {
    this._showNewsCardList();
    this._renderTemplate(this._results);
    this._resultsContainer = this._container.querySelector(this._selectors.items);
    this._showMeMoreButton = this._container.querySelector(this._selectors.showMeMore);
    this._setHandlers([{ element: this._showMeMoreButton, event: 'click', method: this._showMore }]);
    this._showMore();
  }

  _showMore() {
    this._actions.callAction(
      'showMore',
      [
        article => this._addCard(article),
        () => this._showMeMoreButton.classList.add('show-me-more_hidden'),
      ],
    );
  }

  _addCard(article) {
    this._actions.callAction(
      'addCard',
      [
        article,
        newsCard => this._afterAddCard(newsCard),
      ],
    );
  }

  _afterAddCard(newsCard) {
    this._resultsContainer.appendChild(newsCard.getDomElement());
    this._cards.push(newsCard);
  }

  renderNoResults() {
    this._renderTemplate(this._searchNoResults);
  }

  updateCardsViews() {
    this._cards.forEach(card => card.updateView());
  }
}
