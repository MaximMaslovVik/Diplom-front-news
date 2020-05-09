import './pages/style.css';
import SaveCard from './js/components/SaveCard';
import NewsCardList from './js/components/NewsCardList';

import {
  getProfile,
  deleteUser,
} from './js/utils/utils';

import {
  header,
  popupMobileOpenButton,
  popupMobileCloseButton,
  logoutButton,
  resultsList,
  mainApi,
  favoritesUserName,
  favoritesKeyWords,
  favoritesGlobalCount,
  favoritesDifferent,
  favoritesWords,
  favoritesOthers,
  favoritesOthersCount,
  NO,
  SAVE_ONE,
  SAVE_TWO,
  SAVE_THREE,
} from './js/constants/constants';

function start() {
  // получаем имя юзера из localstorage
  function getCurrentUser() {
    let currentUser = '';
    if (getProfile) {
      currentUser = getProfile.name;
    }
    return currentUser;
  }

  // рендерим header
  header.render(getProfile, getCurrentUser());

  // открытие мобильного меню
  function openPopupMobile() {
    const popupMobile = document.querySelector('.header__popup-mobile');
    popupMobile.classList.add('header_is-opened');
  }

  // закрытие мобильного меню
  function closePopupMobile() {
    const popupMobile = document.querySelector('.header__popup-mobile');
    popupMobile.classList.remove('header_is-opened');
  }

  // выход из профиля
  function logout() {
    deleteUser('user');
    window.location.href = 'index.html';
  }

  // функция рендера карточек
  function cardRender(initialCards) {
    const results = document.querySelector('.results');
    if (initialCards.length === 0) {
      results.classList.remove('results_is-opened');
    } else {
      results.classList.add('results_is-opened');
      const cardElementArray = [];
      initialCards.forEach((item) => {
        const { cardElement } = new SaveCard(item);
        cardElementArray.push(cardElement);
      });
      const cardList = new NewsCardList(resultsList, cardElementArray);
      cardList.renderResults();
    }
  }

  // пустые объекты для рендера
  const objKeys = {};
  const sortKeys = {};

  // получения объекта вида {'ключевое слово': 'count'},
  // где count - число повторений
  function putKeys(data) {
    data.forEach((item) => {
      if (!objKeys.hasOwnProperty(item.keyword)) {
        objKeys[item.keyword] = 1;
      } else {
        objKeys[item.keyword] += 1;
      }
      return objKeys;
    });
  }

  // сортировка объекта по значению ключа
  // по убыванию
  function sort(obj) {
    Object.keys(obj)
      .sort((a, b) => {
        return obj[b] - obj[a];
      })
      .forEach((v) => {
        sortKeys[v] = obj[v];
      });
  }

  // выбор падежа для 'сохраненных статей'
  function renerCase(array) {
    if (array.length === 1) {
      favoritesDifferent.textContent = SAVE_ONE;
    } else if (array.length === 2 || array.length === 3
      || array.length === 4) {
      favoritesDifferent.textContent = SAVE_TWO;
    } else if (array.length > 5 || array.length === 0) {
      favoritesDifferent.textContent = SAVE_THREE;
    }
  }

  // функция рендера текстового блока
  function renderTextBlock(array, obj) {
    favoritesUserName.textContent = getCurrentUser();
    if (Object.keys(obj).length === 0) {
      favoritesGlobalCount.textContent = NO;
      favoritesKeyWords.textContent = '';
    } else if (Object.keys(obj).length === 1) {
      favoritesGlobalCount.textContent = array.length;
      favoritesWords.textContent = Object.keys(obj);
      favoritesOthers.textContent = '';
      favoritesOthersCount.textContent = '';
    } else if (Object.keys(obj).length === 2) {
      favoritesGlobalCount.textContent = array.length;
      favoritesWords.textContent = `${Object.keys(obj)[0]}, ${Object.keys(obj)[1]}`;
      favoritesOthers.textContent = '';
      favoritesOthersCount.textContent = '';
    } else if (Object.keys(obj).length === 3) {
      favoritesGlobalCount.textContent = array.length;
      favoritesWords.textContent = `${Object.keys(obj)[0]}, ${Object.keys(obj)[1]}, ${Object.keys(obj)[2]}`;
      favoritesOthers.textContent = '';
      favoritesOthersCount.textContent = '';
    } else if (Object.keys(obj).length >= 4) {
      favoritesGlobalCount.textContent = array.length;
      favoritesWords.textContent = `${Object.keys(obj)[0]}, ${Object.keys(obj)[1]}`;
      favoritesOthersCount.textContent = ` и ${(Object.keys(obj).length - 2)} другим`;
    }
  }

  // рендер текстового блока и карточек
  mainApi.getArticles()
    .then((data) => {
      const cardsArray = data.articles;
      cardRender(cardsArray);
      putKeys(cardsArray);
      sort(objKeys);
      renerCase(cardsArray);
      renderTextBlock(cardsArray, sortKeys);
    })
    .catch((err) => {
      console.log(err);
    });

  // слушатели
  popupMobileOpenButton.addEventListener('click', openPopupMobile);
  popupMobileCloseButton.addEventListener('click', closePopupMobile);
  logoutButton.addEventListener('click', logout);
}

// перекинет на главную, если неавторизованный пользователь прошел по ссылке
if (getProfile) {
  start();
} else {
  window.location.href = 'index.html';
}
