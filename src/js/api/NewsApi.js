export default class NewsApi {
  constructor(apiSettings, dependencies) {
    this._apiSettings = apiSettings;
    this._dependencies = dependencies;

    this.getNews = this.getNews.bind(this);
  }

  getNews(query) {
    const {
      url,
      sortBy,
      pageSize,
      apiKey,
    } = this._apiSettings;
    const { getFromDate, getToDate } = this._dependencies;
    const from = getFromDate();
    const to = getToDate();

    const dummyImageUrl = 'https://dummyimage.com/600x400/ffffff/000000.png&text=%D0%91%D0%B5%D0%B7+%D0%B8%D0%B7%D0%BE%D0%B1%D1%80%D0%B0%D0%B6%D0%B5%D0%BD%D0%B8%D1%8F';
    return fetch(
      `${url}?q=${query}&from=${from}&to=${to}&sortBy=${sortBy}&pageSize=${pageSize}&apiKey=${apiKey}`,
    )
      .then(res => res.json())
      .then(res => {
        const articles = res.articles.map(article => {
          const preparedArticle = {};
          preparedArticle.source = article.source.name;
          preparedArticle._id = article._id;
          preparedArticle.title = article.title;
          preparedArticle.date = article.publishedAt;
          preparedArticle.link = article.url;
          preparedArticle.keyword = article.keyword;
          preparedArticle.image = article.urlToImage || dummyImageUrl;
          preparedArticle.text = article.description || 'Без описания';

          return preparedArticle;
        });

        return articles;
      })
      .catch(err => new Error(err.message));
  }
}
