import './news-card.css';
import BaseComponent from '../../js/components/BaseComponent';

export default class NewsCard extends BaseComponent {
  constructor(args) {
    super();

    const {
      template,
      actionTemplates,
      article,
      selectors,
    } = args;

    this._template = template;
    this._article = article;
    this._actionTemplates = actionTemplates;
    this._selectors = selectors;

    this.like = this.like.bind(this);
    this.unlike = this.unlike.bind(this);
    this.remove = this.remove.bind(this);
  }

  _getCardDate(articleDate) {
    const months = ['Января', 'Февраля', 'Марта', 'Апреля', 'Мая', 'Июня', 'Июля', 'Августа', 'Сентября', 'Октября', 'Ноября', 'Декабря'];

    const date = new Date(articleDate);
    const year = date.getFullYear();
    const month = date.getMonth();
    const day = date.getDate();

    return `${day} ${months[month]}, ${year}`;
  }

  _setCardAction(template, method) {
    this._reset();
    this._actionsContainer.innerHTML = '';
    this._actionsContainer.appendChild(template.cloneNode(true).content);

    if (method) {
      this._setHandlers([
        {
          element: this._actionsContainer.querySelector(this._selectors.cardAction),
          event: 'click',
          method,
        },
      ]);
    }
  }

  _setCardActionsBlock() {
    const type = this._actions.callAction(
      'getCardType',
      [this._newsUrl],
    );

    switch (type) {
      case 'saved':
        this._setCardAction(this._actionTemplates.savedAction, this.remove);
        break;
      case 'unlike':
        this._setCardAction(this._actionTemplates.unlikeAction, this.unlike);
        break;
      case 'like':
        this._setCardAction(this._actionTemplates.likeAction, this.like);
        break;
      default:
        this._setCardAction(this._actionTemplates.baseAction, null);
    }
  }

  init() {
    const {
      _id,
      source,
      title,
      date,
      text,
      link,
      image,
      keyword,
    } = this._article;

    this._id = _id;
    this._newsUrl = link;
    this._keyword = keyword;

    this._container = this._template.cloneNode(true).content;
    const cardImageElement = this._container.querySelector(this._selectors.cardImg);
    cardImageElement.src = image;
    cardImageElement.alt = title;
    this._container.querySelector(this._selectors.cardDate).textContent = this._getCardDate(date);
    this._container.querySelector(this._selectors.cardTitle).textContent = title;
    this._container.querySelector(this._selectors.cardText).textContent = text;
    this._container.querySelector(this._selectors.cardSource).textContent = source;

    this._actionsContainer = this._container.querySelector(this._selectors.cardActionContainer);

    this._setCardActionsBlock();

    this._container.querySelector(this._selectors.cardLink).href = link;

    const tagContainer = this._actionsContainer.querySelector(this._selectors.cardKeyword);
    if (tagContainer) {
      tagContainer.textContent = this._keyword;
    }

    this._id = this._actions.callAction(
      'getCardId',
      [this._newsUrl],
    );
  }

  like() {
    this._id = this._actions.callAction(
      'like',
      [
        this._article,
        id => {
          this._id = id;
          this._setCardActionsBlock();
        },
      ],
    );
  }

  unlike() {
    this._actions.callAction(
      'unlike',
      [
        this._id,
        () => this._setCardActionsBlock(),
      ],
    );
  }

  remove() {
    this._actions.callAction(
      'remove',
      [
        this._id,
        () => this._reset(),
      ],
    );
  }

  updateView() {
    this._setCardActionsBlock();
  }

  getDomElement() {
    return this._container;
  }
}
