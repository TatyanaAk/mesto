export default class Card {
  constructor({ link ,name }, cardSelector, handleCardClick) {
    this._link = link;
    this._name = name;
    this._cardSelector = cardSelector;
    this._handleCardClick = handleCardClick;
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
    this._gridElement.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('grid__grid-image')) {
        this._handleCardClick({ src: this._image.src, alt: this._image.alt, title: this._title.textContent });
      }
    });
  }
  _handleLike() {
    this._heart.classList.toggle('grid__heart_active');
  }
}
