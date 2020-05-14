const HEADER = {
  container: document.querySelector('.header-nav-container'),
  lightNotAuthTemplate: document.querySelector('#header-nav-light-not-logged-in'),
  lightAuthTemplate: document.querySelector('#header-nav-light-logged-in'),
  darkNotAuthTemplate: document.querySelector('#header-nav-dark-not-logged-in'),
  darkAuthTemplate: document.querySelector('#header-nav-dark-logged-in'),
  authButtonSelector: '.header__nav-item-button',
  selectors: {
    actionButton: '.header__nav-item-name',
  },
};

const SEARCH = {
  form: {
    formSelector: '.header-search__form',
    requiredInputSelectors: ['.header-search__input'],
    actionButtonSelector: '.header-search__button',
  },
};

const SEARCH_RESULTS = {
  container: document.querySelector('.search-results'),
  templates: {
    results: document.querySelector('#search-results'),
    searchInProcess: document.querySelector('#search-in-process'),
    searchNoResults: document.querySelector('#search-no-results'),
    searchError: document.querySelector('#search-error'),
  },
  selectors: {
    items: '.search-results__items',
    showMeMore: '.show-me-more',
  },
};

const SAVED_RESULTS = {
  container: document.querySelector('.saved-results'),
  templates: {
    results: document.querySelector('#saved-results'),
  },
  selectors: {
    items: '.saved-results__items',
    showMeMore: '.show-me-more',
  },
};

const POPUP = {
  container: document.querySelector('.popup'),
  contentContainer: document.querySelector('.popup__content'),
  closeControl: document.querySelector('.popup__close'),
  selectors: {
    popupLink: '.popup__link',
  },
};

const LOGIN_POPUP = {
  template: document.querySelector('#popup-login'),
  form: {
    formSelector: '.popup__form',
    actionButtonSelector: '.popup__form-button',
    requiredInputSelectors: [
      '.popup__form-input_email',
      '.popup__form-input_password',
    ],
  },
};

const REGISTRATION_POPUP = {
  template: document.querySelector('#popup-registration'),
  form: {
    formSelector: '.popup__form',
    actionButtonSelector: '.popup__form-button',
    requiredInputSelectors: [
      '.popup__form-input_email',
      '.popup__form-input_password',
      '.popup__form-input_name',
    ],
  },
};

const SUCCESS_REGISTRATION_POPUP = {
  template: document.querySelector('#popup-success-registration'),
};


const mainApiUrl = 'http://LOCALHOST:3000';

const MAIN_API_ROUTES = {
  signup: `${mainApiUrl}/signup`,
  signin: `${mainApiUrl}/signin`,
  logout: `${mainApiUrl}/logout`,
  getCurrentUser: `${mainApiUrl}/users/me`,
  getArticles: `${mainApiUrl}/articles`,
  createArticle: `${mainApiUrl}/articles`,
  deleteArticle: `${mainApiUrl}/articles`,
};

const NEWS_API = {
  url: 'https://newsapi.org/v2/everything',
  sortBy: 'publishedAt',
  pageSize: 100,
  apiKey: '10c50f50235e437a9392890e2b59acd9',
};

const ARTICLES = {
  articlesPortion: 3,
};

const NEWS_CARD = {
  template: document.querySelector('#news-card'),
  actionTemplates: {
    baseAction: document.querySelector('#news-card-base-action'),
    likeAction: document.querySelector('#news-card-like-action'),
    unlikeAction: document.querySelector('#news-card-unlike-action'),
    savedAction: document.querySelector('#news-card-saved-action'),
  },
  dummyImageUrl: 'https://dummyimage.com/600x400/ffffff/000000.png&text=%D0%91%D0%B5%D0%B7+%D0%B8%D0%B7%D0%BE%D0%B1%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%B8%D1%8F',
  selectors: {
    cardAction: '.news-card__action',
    cardImg: '.news-card__img',
    cardDate: '.news-card__date',
    cardTitle: '.news-card__title',
    cardText: '.news-card__text',
    cardSource: '.news-card__source',
    cardActionContainer: '.news-card__action-container',
    cardLink: '.news-card__link',
    cardKeyword: '.news-card__tag',
  },
};

const SAVED_STAT = {
  name: document.querySelector('.header-saved__name'),
  articlesCount: document.querySelector('.header-saved__articles-count'),
  details: document.querySelector('.header-saved__details'),
  tagTemplate: document.querySelector('#header-saved-detail-tag'),
  selectors: {
    tag: '.header-saved__detail-tag',
  },
};

export {
  POPUP,
  LOGIN_POPUP,
  REGISTRATION_POPUP,
  SUCCESS_REGISTRATION_POPUP,
  MAIN_API_ROUTES,
  NEWS_API,
  HEADER,
  SEARCH,
  SEARCH_RESULTS,
  SAVED_RESULTS,
  ARTICLES,
  NEWS_CARD,
  SAVED_STAT,
};
