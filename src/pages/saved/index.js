import './index.css';
import {
  ARTICLES,
  HEADER,
  MAIN_API_ROUTES, NEWS_CARD,
  SAVED_RESULTS, SAVED_STAT,
} from '../../js/constants';
import {
  authActions,
  headerActions,
  newsCardListActions,
  headerSavedActions,
  newsCardActions,
} from '../../js/actions';
import Auth from '../../js/Auth';
import MainApi from '../../js/api/MainApi';
import Header from '../../blocks/header/Header';
import ArticlesList from '../../js/ArticlesList';
import NewsCardList from '../../blocks/news-card-list/NewsCardList';
import HeaderSaved from '../../blocks/header-saved/HeaderSaved';

const mainApi = new MainApi(MAIN_API_ROUTES);

const header = new Header({ ...HEADER, theme: 'dark' });
const savedStat = new HeaderSaved({ ...SAVED_STAT });
const articlesList = new ArticlesList({ ...ARTICLES });
const newsCardList = new NewsCardList({
  container: SAVED_RESULTS.container,
  ...SAVED_RESULTS.templates,
  selectors: SAVED_RESULTS.selectors,
});

const auth = new Auth();

header.setActions(headerActions({ auth }));
savedStat.setActions(headerSavedActions({ articlesList, newsCardList, auth }));
newsCardList.setActions(newsCardListActions({
  mainApi, articlesList, cardOptions: NEWS_CARD, auth, savedStat, newsCardActions,
}));
auth.setActions(authActions({
  mainApi, header, newsCardList, articlesList, savedStat,
}));

auth.authenticate();
