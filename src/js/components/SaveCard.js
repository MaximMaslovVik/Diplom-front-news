import { mainApi } from '../constants/constants';

export default class SaveCard {
  constructor(data) {
    this._delete = this._delete.bind(this);
    this._hoverOn = this._hoverOn.bind(this);
    this._hoverOff = this._hoverOff.bind(this);
    this.keyword = data.keyword;
    this.title = data.title;
    this.text = data.text;
    this.date = data.date;
    this.source = data.source;
    this.link = data.link;
    this.image = data.image;
    this.id = data._id;
    this.cardElement = this.createCard();
    this.hoverButton = this.cardElement.querySelector('.result-card__button-warning');
    this.removeButton = this.cardElement.querySelector('.result-card__button');
    this.removeButton.addEventListener('click', this._delete);
  }

  createCard() {
    const placeCardElement = document.createElement('div');
    const cardImageElement = document.createElement('div');
    const keyWordElement = document.createElement('div');
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
    placeCardElement.setAttribute('id', this.id);

    cardImageElement.classList.add('result-card__image');
    cardImageElement.classList.add('result-card__image_favorites');
    cardImageElement.style.backgroundImage = `url(${this.image})`;
    keyWordElement.classList.add('result-card__key-word');
    keyWordElement.textContent = this.keyword;
    buttonContent.classList.add('result-card__button-content');
    buttonWarning.classList.add('result-card__button-warning');
    button.classList.add('result-card__button');
    buttonIcon.classList.add('result-card__button-icon');
    buttonIcon.classList.add('result-card__button-icon_favorites');

    cardDescriptionElement.classList.add('result-card__description');
    descriptionData.classList.add('result-card__description-data');
    descriptionData.textContent = this.date;
    descriptionTitle.classList.add('result-card__description-title');
    descriptionTitle.textContent = this.title;
    descriptionAbout.classList.add('result-card__description-about');
    descriptionAbout.textContent = this.text;
    descriptionSource.classList.add('result-card__description-source');
    descriptionSource.textContent = this.source;
    descriptionSource.setAttribute('href', this.link);
    descriptionSource.setAttribute('target', '_blank');

    placeCardElement.appendChild(cardImageElement);
    placeCardElement.appendChild(cardDescriptionElement);

    cardImageElement.appendChild(keyWordElement);
    cardImageElement.appendChild(buttonContent);
    buttonContent.appendChild(buttonWarning);
    buttonContent.appendChild(button);
    button.appendChild(buttonIcon);

    cardDescriptionElement.appendChild(descriptionData);
    cardDescriptionElement.appendChild(descriptionTitle);
    cardDescriptionElement.appendChild(descriptionAbout);
    cardDescriptionElement.appendChild(descriptionSource);
    buttonContent.addEventListener('mouseover', this._hoverOn);
    buttonContent.addEventListener('mouseout', this._hoverOff);

    return placeCardElement;
  }

  // удаление карточки
  _delete(event) {
    mainApi.removeArticle(this.cardElement.getAttribute('id'))
      .then(() => {
        event.target.closest('.result-card').remove();
      })
      .catch((err) => {
        alert('Ошибка: ' + err);
      });
  }

  // отображение сообщения рядом с корзиной
  _hoverOn() {
    this.hoverButton.classList.add('result-card__button-warning_is-opened');
    this.hoverButton.textContent = 'Убрать из сохраненных';
  }

  _hoverOff() {
    this.hoverButton.classList.remove('result-card__button-warning_is-opened');
  }
}
