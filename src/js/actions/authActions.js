import Actions from './Actions';

const authActions = dependencies => {
  const {
    mainApi,
    articlesList,
    newsCardList,
    header,
    savedStat,
  } = dependencies;

  return new Actions({
    authenticate: (...args) => {
      const [setUserData, clearUserData, redirectToMainPage, isSavedPage, getAuthInfo] = args;

      mainApi.getUserData()
        .then(json => {
          setUserData(json.data);
        })
        .then(() => mainApi.getArticles())
        .then(articles => articlesList.setLiked(articles.data))
        .catch(() => {
          clearUserData();
          redirectToMainPage();
        })
        .finally(() => {
          header.render({ ...getAuthInfo() });

          newsCardList.updateCardsViews();

          if (isSavedPage()) {
            articlesList.updateArticles(articlesList.getLiked());
            savedStat.render();
          }
        });
    },
    logout: (getAuthInfo, redirectToMainPage) => {
      mainApi.logout().finally(() => {
        redirectToMainPage();
        header.render({ ...getAuthInfo() });
        newsCardList.updateCardsViews();
      });
    },
  });
};

export default authActions;
