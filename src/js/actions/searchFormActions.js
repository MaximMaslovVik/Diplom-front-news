import Actions from './Actions';

const searchFormActions = dependencies => {
  const { newsApi, articlesList, newsCardList } = dependencies;
  return new Actions({
    submit: (search, finallyMethod) => {
      newsCardList.renderLoader();
      newsApi.getNews(search)
        .then(articles => {
          articlesList.updateArticles(articles, search);
          if (articlesList.hasArticles()) {
            newsCardList.renderResults();
          } else {
            newsCardList.renderNoResults();
          }
        })
        .catch(() => {
          articlesList.updateArticles([]);
          newsCardList.renderError();
        })
        .finally(() => finallyMethod());
    },
  });
};

export default searchFormActions;
