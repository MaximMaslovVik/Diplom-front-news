export default class ArticlesList {
  constructor(args) {
    const {
      articlesPortion,
    } = args;

    this._lastPhrase = '';
    this._currentArticleIndex = 0;
    this._articles = [];
    this._liked = [];
    this._articlesPortion = articlesPortion;
  }

  hasArticles() {
    return this._articles.length > 0;
  }

  newsIsLiked(newsUrl) {
    return this._liked.some(article => article.link === newsUrl);
  }

  getLikedByLink(newsUrl) {
    return this._liked.find(article => article.link === newsUrl);
  }

  getPhrase() {
    return this._lastPhrase;
  }

  getLikedCount() {
    return this._liked.length;
  }

  someMore() {
    return this._articles.length > this._currentArticleIndex;
  }

  setLiked(likedArticles) {
    this._liked = likedArticles || [];
  }

  getLiked() {
    return this._liked;
  }

  addLiked(article) {
    this._liked.push(article);
  }

  removeLiked(articleId) {
    this._liked = this._liked.filter(article => article._id !== articleId);
  }

  getKeywordsRating() {
    const allWords = this._liked.reduce((words, { keyword }) => {
      if (words[keyword]) {
        words[keyword] += 1;
      } else {
        words[keyword] = 1;
      }
      return words;
    }, {});

    return Object.entries(allWords).sort((a, b) => b[1] - a[1]);
  }

  updateArticles(articles, phrase = '') {
    this._articles = articles;
    this._lastPhrase = phrase;
    this._currentArticleIndex = 0;
  }

  getArticlesPortion(allArticles = false) {
    if (allArticles) {
      return this._articles;
    }

    const from = this._currentArticleIndex;
    const to = Math.min(this._currentArticleIndex + this._articlesPortion, this._articles.length);
    if (from >= to) {
      return [];
    }

    this._currentArticleIndex = to;

    return this._articles.slice(from, to);
  }
}
