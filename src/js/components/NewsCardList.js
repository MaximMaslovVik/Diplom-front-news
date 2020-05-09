export default class NewsCardList {
  constructor(container, initialCards) {
    this.container = container;
    this.initialCards = initialCards;
  }

  renderResults() {
    this.initialCards.forEach((item) => {
      this.addCard(item);
    });
  }

  addCard(cardElement) {
    this.container.appendChild(cardElement);
  }
}
