import Actions from './Actions';

const newsCardActions = dependencies => {
  const {
    auth,
    articlesList,
    mainApi,
    savedStat,
  } = dependencies;

  return new Actions({
    getCardType: newsUrl => {
      let type = 'base';

      if (auth.isSavedPage()) {
        type = 'saved';
      } else if (auth.isAuth()) {
        if (articlesList.newsIsLiked(newsUrl)) {
          type = 'unlike';
        } else {
          type = 'like';
        }
      }

      return type;
    },
    getCardId: newsUrl => {
      if (articlesList.newsIsLiked(newsUrl)) {
        return articlesList.getLikedByLink(newsUrl)._id;
      }
      return '';
    },
    like: (article, afterLike) => {
      const {
        source,
        title,
        date,
        text,
        link,
        image,
        keyword,
      } = article;

      mainApi.createArticle({
        source,
        title,
        date,
        text,
        link,
        image,
        keyword,
      })
        .then(json => {
          articlesList.addLiked(json.data);
          afterLike(json.data._id);
        })
        .catch(err => console.log(err));
    },
    unlike: (id, afterUnlike) => {
      mainApi.removeArticle(id)
        .then(() => {
          articlesList.removeLiked(id);
          afterUnlike();
        })
        .catch(err => console.log(err));
    },
    remove: (id, afterRemove) => {
      mainApi.removeArticle(id)
        .then(() => {
          articlesList.removeLiked(id);
          articlesList.updateArticles(articlesList.getLiked());
          afterRemove();
          if (savedStat) {
            savedStat.render();
          }
        })
        .catch(err => console.log(err));
    },
  });
};

export default newsCardActions;
