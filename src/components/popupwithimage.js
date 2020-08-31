export default class PopupWithImage {
  constructor(popupSelector) {
    super(popupSelector);
    this._renderCard = renderCard;
  }
  _renderCard(data) {
    const card = new Card(data, '#card');
    const cardElement = card.createCard();
    const image = cardElement.querySelector('.grid__grid-image');
    const title = cardElement.querySelector('.grid__title');
    cardElement.addEventListener('click', (evt) => {
      if (evt.target.classList.contains('grid__grid-image')) {
        zoomImage({ src: image.src, alt: image.alt, title: title.textContent });
      }
    });
    gridCards.prepend(cardElement);
  }
  _zoomImage(data) {
    toggleForm(cardZoom);
    if (cardZoom.classList.contains('popup_open')) {
      zoomedImage.src = data.src;
      zoomedImage.alt = data.alt;
      zoomedTitle.textContent = data.title;
    }
  }
}
