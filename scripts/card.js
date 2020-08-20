export default class Card {
  constructor(data, cardSelector) {
    this._link = data.link;
    this._name = data.name;
    this._cardSelector = cardSelector;
  }
  _getTemplate() {
    const gridElement = document.querySelector(this._cardSelector).content.querySelector('.grid__element').cloneNode(true);
    return gridElement;
  }

  createCard() {
    this._gridElement = this._getTemplate();


    this._image = this._gridElement.querySelector('.grid__grid-image');
    this._title = this._gridElement.querySelector('.grid__title');
    this._heart = this._gridElement.querySelector('.grid__heart');
    this._deleteButton = this._gridElement.querySelector('.grid__basket');
    this._image.src = this._link;
    this._image.alt = this._name;
    this._title.textContent = this._name
    this._setEventListeners();

    return this._gridElement;
  }
  _deleteCard() {
    this._gridElement.remove();
    this._gridElement = null;
  }
  _setEventListeners() {
    this._heart.addEventListener('click', () => {
      this._handleLike();
    });

    this._deleteButton.addEventListener('click', () => {
      this._deleteCard();
    });
  }
  _handleLike() {
    this._heart.classList.toggle('grid__heart_active');
  }

}
