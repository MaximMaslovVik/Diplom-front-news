import './index.css';
import {
  ARTICLES,
  HEADER,
  LOGIN_POPUP,
  MAIN_API_ROUTES,
  NEWS_API, NEWS_CARD,
  POPUP,
  REGISTRATION_POPUP,
  SEARCH,
  SEARCH_RESULTS,
  SUCCESS_REGISTRATION_POPUP,
} from '../../js/constants';
import { getFromDate, getToDate } from '../../js/utils';
import {
  searchFormActions,
  authActions,
  loginPopupActions,
  registrationPopupActions,
  successRegistrationPopupActions,
  loginPopupFormActions,
  registrationPopupFormActions,
  newsCardListActions,
  headerActions,
  newsCardActions,
} from '../../js/actions';
import LoginPopup from '../../blocks/popup/__login/LoginPopup';
import RegistrationPopup from '../../blocks/popup/__registration/RegistrationPopup';
import SuccessRegistrationPopup from '../../blocks/popup/__success-registration/SuccessRegistrationPopup';
import MainApi from '../../js/api/MainApi';
import Auth from '../../js/Auth';
import Header from '../../blocks/header/Header';
import NewsApi from '../../js/api/NewsApi';
import ArticlesList from '../../js/ArticlesList';
import HeaderSearch from '../../blocks/header-search/HeaderSearch';
import LoginPopupForm from '../../blocks/popup/__login/LoginPopupForm';
import RegistrationPopupForm from '../../blocks/popup/__registration/RegistrationPopupForm';
import NewsCardList from '../../blocks/news-card-list/NewsCardList';

const loginPopup = new LoginPopup({ ...POPUP, template: LOGIN_POPUP.template });
const registrationPopup = new RegistrationPopup({
  ...POPUP, template: REGISTRATION_POPUP.template,
});
const successRegistrationPopup = new SuccessRegistrationPopup({
  ...POPUP, ...SUCCESS_REGISTRATION_POPUP,
});

const searchForm = new HeaderSearch({ ...SEARCH.form });
const loginPopupForm = new LoginPopupForm({ ...LOGIN_POPUP.form });
const registrationPopupForm = new RegistrationPopupForm({ ...REGISTRATION_POPUP.form });

const articlesList = new ArticlesList({ ...ARTICLES });
const newsCardList = new NewsCardList({
  container: SEARCH_RESULTS.container,
  ...SEARCH_RESULTS.templates,
  selectors: SEARCH_RESULTS.selectors,
});
const header = new Header({ ...HEADER, theme: 'light' });
const mainApi = new MainApi(MAIN_API_ROUTES);
const newsApi = new NewsApi(NEWS_API, { getFromDate, getToDate, articlesList });
const auth = new Auth();

header.setActions(headerActions({ loginPopup, auth }));

loginPopup.setActions(loginPopupActions({ registrationPopup, form: loginPopupForm }));
registrationPopup.setActions(registrationPopupActions({
  loginPopup, successRegistrationPopup, form: registrationPopupForm,
}));
successRegistrationPopup.setActions(successRegistrationPopupActions({ loginPopup }));

loginPopupForm.setActions(loginPopupFormActions({ mainApi, auth, popup: loginPopup }));
registrationPopupForm.setActions(registrationPopupFormActions(
  { mainApi, popup: registrationPopup },
));

searchForm.setActions(searchFormActions({ newsApi, articlesList, newsCardList }));

auth.setActions(authActions({
  mainApi, header, newsCardList, articlesList,
}));

newsCardList.setActions(newsCardListActions({
  mainApi, articlesList, cardOptions: NEWS_CARD, auth, newsCardActions,
}));

searchForm.initForm();
auth.authenticate();
