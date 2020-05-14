import Actions from './Actions';

const headerSavedActions = dependencies => {
  const {
    articlesList,
    auth,
    newsCardList,
  } = dependencies;

  return new Actions({
    getArticlesCount: () => articlesList.getLikedCount(),
    getTags: () => articlesList.getKeywordsRating().map(([key]) => key),
    getUserName: () => auth.getUserName(),
    renderResults: () => newsCardList.renderResults(),
  });
};

export default headerSavedActions;
