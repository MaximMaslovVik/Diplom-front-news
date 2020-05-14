export default class MainApi {
  constructor(routes) {
    this._routes = routes;
  }

  signup({ email, password, name }) {
    return fetch(this._routes.signup, {
      method: 'POST',
<<<<<<< HEAD
     credentials: 'include',
=======
      credentials: 'include',
>>>>>>> 043c8a1a48ed0323ac97eb9a1a92c72d539fb3bc
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
        name,
      }),
    })
      .catch(err => new Error(err.message));
  }

  signin({ email, password }) {
    return fetch(this._routes.signin, {
      method: 'POST',
<<<<<<< HEAD
   credentials: 'include',
=======
      credentials: 'include',
>>>>>>> 043c8a1a48ed0323ac97eb9a1a92c72d539fb3bc
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email,
        password,
      }),
    })
      .catch(err => new Error(err.message));
  }

  logout() {
    return fetch(this._routes.logout, {
      method: 'POST',
      credentials: 'include',
    })
      .catch(err => new Error(err.message));
  }

  getUserData() {
    return fetch(this._routes.getCurrentUser, {
      method: 'GET',
      credentials: 'include',
    })
      .then(res => {
        if (res.status !== 200) {
          throw new Error('Unauthorized');
        }
        return res.json();
      })
      .catch(err => err);
  }

  getArticles() {
    return fetch(this._routes.getArticles, {
      method: 'GET',
<<<<<<< HEAD
     credentials: 'include',
=======
      credentials: 'include',
>>>>>>> 043c8a1a48ed0323ac97eb9a1a92c72d539fb3bc
    })
      .then(res => res.json())
      .catch(err => console.log(err));
  }

  createArticle(newsData) {
    const {
      keyword,
      title,
      text,
      source,
      image,
      link,
      date,
    } = newsData;

    return fetch(this._routes.createArticle, {
      method: 'POST',
<<<<<<< HEAD
    credentials: 'include',
=======
      credentials: 'include',
>>>>>>> 043c8a1a48ed0323ac97eb9a1a92c72d539fb3bc
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        keyword,
        title,
        text,
        source,
        image,
        link,
        date,
      }),
    })
      .then(res => res.json())
      .catch(err => console.log(err));
  }

  removeArticle(articleId) {
    return fetch(`${this._routes.deleteArticle}/${articleId}`, {
      method: 'DELETE',
<<<<<<< HEAD
    credentials: 'include',
=======
      credentials: 'include',
>>>>>>> 043c8a1a48ed0323ac97eb9a1a92c72d539fb3bc
    })
      .then(res => res.json())
      .catch(err => console.log(err));
  }
}
