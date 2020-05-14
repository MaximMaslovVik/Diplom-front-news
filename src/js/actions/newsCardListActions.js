import Actions from './Actions';
import { createNewsCard } from '../utils';

const newsCardListActions = dependencies => {
  const {
    auth,
    mainApi,
    articlesList,
    savedStat,
    cardOptions,
    newsCardActions,
  } = dependencies;

  return new Actions({
    showMore: (addCard, hideShowMeMoreButton) => {
      const allArticles = auth.isSavedPage();
      const articlesPortion = articlesList.getArticlesPortion(allArticles);

      articlesPortion.forEach(article => {
        addCard({
          ...article, keyword: article.keyword || articlesList.getPhrase(),
        });
      });

      if (!articlesList.someMore()) {
        hideShowMeMoreButton();
      }
    },
    addCard: (article, afterAddCard) => {
      const newsCard = createNewsCard({ ...cardOptions, article });

      newsCard.setActions(newsCardActions({
        auth,
        mainApi,
        articlesList,
        savedStat,
      }));
      newsCard.init();

      afterAddCard(newsCard);
    },
  });
};

export default newsCardListActions;
