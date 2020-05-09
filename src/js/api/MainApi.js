export default class MainApi {
  constructor(baseUrl) {
    this.baseUrl = baseUrl;
  }

  // регистрация
  signup(userEmail, userPassword, userName) {
    return fetch(`${this.baseUrl}/signup`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        email: userEmail,
        password: userPassword,
        name: userName,
      }),
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      });
  }

  // вход
  signin(userEmail, userPassword) {
    return fetch(`${this.baseUrl}/signin`, {
      method: 'POST',
      body: JSON.stringify({
        email: userEmail,
        password: userPassword,
      }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      })
      .then((data) => {
        localStorage.setItem('token', data.userToken);
        localStorage.setItem('user', JSON.stringify({
          email: data.email,
          name: data.name,
        }));
        return data;
      });
  }

  // возвращает данные юзера
  getUserData() {
    return fetch(`${this.baseUrl}/users/me`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      });
  }

  // возвращает статьи
  getArticles() {
    return fetch(`${this.baseUrl}/articles`, {
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      });
  }

  // создаёт статьи
  createArticle(userKeyword, userTitle, userText, userDate,
    userSource, userLink, userImage) {
    return fetch(`${this.baseUrl}/articles`, {
      method: 'POST',
      body: JSON.stringify({
        keyword: userKeyword,
        title: userTitle,
        text: userText,
        date: userDate,
        source: userSource,
        link: userLink,
        image: userImage,
      }),
      headers: {
        'Content-Type': 'application/json',
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      });
  }

  // удаляет статьи
  removeArticle(articleId) {
    return fetch(`${this.baseUrl}/articles/${articleId}`, {
      method: 'DELETE',
      headers: {
        authorization: `Bearer ${localStorage.getItem('token')}`,
      },
    })
      .then((res) => {
        if (res.ok) {
          return res.json();
        }
        return Promise.reject(res.status);
      });
  }
}
