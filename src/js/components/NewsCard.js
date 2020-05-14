import { getProfile } from '../utils/utils';
import { mainApi } from '../constants/constants';

export default class NewsCard {
  constructor(data, keyWord) {
    this._hoverIconOn = this._hoverIconOn.bind(this);
    this._hoverIconOff = this._hoverIconOff.bind(this);
    this.activeIcon = this.activeIcon.bind(this);
    this._save = this._save.bind(this);
    this.renderIcon = this.renderIcon.bind(this);
    this.keyWord = keyWord;
    this.title = data.title;
    this.publishedAt = data.publishedAt;
    this.description = data.description;
    this.urlToImage = data.urlToImage;
    this.source = data.source.name;
    this.url = data.url;
    this.data = this._trueData(this.publishedAt);
    this.cardElement = this.createCard(keyWord);
    this.icon = this.cardElement.querySelector('.result-card__button-icon');
    this.iconButton = this.cardElement.querySelector('.result-card__button');
    this.hoverButton = this.cardElement.querySelector('.result-card__button-warning');
    this.iconButton.addEventListener('click', this._save);
  }

  // дата - правильный формат
  _trueData(str) {
    const oneData = str.substr(0, 10);
    const twoData = oneData.split('-');
    const year = twoData[0];
    const month = twoData[1];
    const day = twoData[2];
    const allMonth = [
      'января', 'февраля', 'марта','апреля',
      'мая', 'июня', 'июля', 'августа', 'сентября',
      'октября', 'ноября', 'декабря',
    ];
    const data = `${day} ${allMonth[Number(month) - 1]}, ${year}`;
    return data;
  }

  // рендер иконки сохранения
  renderIcon(flag) {
    if (flag) {
      this.icon.classList.add('result-card__button-icon_marced');
    } else {
      this.icon.classList.remove('result-card__button-icon_marced');
    }
  }

  // вкл-выкл иконку сохранения
  activeIcon(button) {
    if (getProfile) {
      button.removeAttribute('disabled');
    } else {
      button.setAttribute('disabled', true);
    }
  }

  // создание карточки
  createCard(userKeyWord) {
    const placeCardElement = document.createElement('div');
    const cardImageElement = document.createElement('div');
    const buttonContent = document.createElement('div');
    const buttonWarning = document.createElement('div');
    const button = document.createElement('button');
    const buttonIcon = document.createElement('div');
    const cardDescriptionElement = document.createElement('div');
    const descriptionData = document.createElement('p');
    const descriptionTitle = document.createElement('h3');
    const descriptionAbout = document.createElement('p');
    const descriptionSource = document.createElement('a');

    placeCardElement.classList.add('result-card');
    placeCardElement.setAttribute('keyWord', userKeyWord);

    cardImageElement.classList.add('result-card__image');
    cardImageElement.style.backgroundImage = `url(${this.urlToImage})`;
    buttonContent.classList.add('result-card__button-content');
    buttonWarning.classList.add('result-card__button-warning');
    button.classList.add('result-card__button');
    button.setAttribute('disabled', true);
    buttonIcon.classList.add('result-card__button-icon');
    buttonIcon.classList.add('result-card__button-icon_normal');

    cardDescriptionElement.classList.add('result-card__description');
    descriptionData.classList.add('result-card__description-data');
    descriptionData.textContent = this.data;
    descriptionTitle.classList.add('result-card__description-title');
    descriptionTitle.textContent = this.title;
    descriptionAbout.classList.add('result-card__description-about');
    descriptionAbout.textContent = this.description;
    descriptionSource.classList.add('result-card__description-source');
    descriptionSource.textContent = this.source;
    descriptionSource.setAttribute('href', this.url);
    descriptionSource.setAttribute('target', '_blank');

    placeCardElement.appendChild(cardImageElement);
    placeCardElement.appendChild(cardDescriptionElement);

    cardImageElement.appendChild(buttonContent);
    buttonContent.appendChild(buttonWarning);
    buttonContent.appendChild(button);
    button.appendChild(buttonIcon);

    cardDescriptionElement.appendChild(descriptionData);
    cardDescriptionElement.appendChild(descriptionTitle);
    cardDescriptionElement.appendChild(descriptionAbout);
    cardDescriptionElement.appendChild(descriptionSource);
    buttonContent.addEventListener('mouseover', this._hoverIconOn);
    buttonContent.addEventListener('mouseout', this._hoverIconOff);
    this.activeIcon(button);

    return placeCardElement;
  }

  // сообщение сбоку иконки сохранения
  _hoverIconOn() {
    if (!getProfile) {
      this.hoverButton.classList.add('result-card__button-warning_is-opened');
      this.hoverButton.textContent = 'Войдите, что бы сохранять статьи';
      this.icon.classList.add('result-card__button-icon_hover');
    } else if (getProfile && this.icon.classList
      .contains('result-card__button-icon_marced')) {
      this.icon.classList.remove('result-card__button-icon_hover');
    } else if (getProfile) {
      this.icon.classList.add('result-card__button-icon_hover');
    }
  }

  _hoverIconOff() {
    if (!getProfile) {
      this.hoverButton.classList.remove('result-card__button-warning_is-opened');
    }
    this.icon.classList.remove('result-card__button-icon_hover');
  }

  // сохранение-удаление карточки
  _save() {
    if (!this.icon.classList.contains('result-card__button-icon_marced')) {
      mainApi.createArticle(this.keyWord, this.title, this.description,
        this.data, this.source, this.url, this.urlToImage)
        .then((data) => {
          this.renderIcon(true);
          this.cardElement.setAttribute('id', data.data._id);
        })
        .catch((err) => {
          alert('Не удалось сохранить статью. Ошибка: ' + err);
        });
    } else {
      mainApi.removeArticle(this.cardElement.getAttribute('id'))
        .then(() => {
          this.renderIcon(false);
        })
        .catch((err) => {
          alert('Ошибка: ' + err);
        });
    }
  }
}
