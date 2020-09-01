import Popup from './popup.js';

export default class PopupWithImage extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
    this._zoomImage = this._popupSelector.querySelector('.popup__image-zoom');
    this._zoomedTitle = this._popupSelector.querySelector('.popup__heading_zoom');
  }
  open({src,alt,title}) {
    this._zoomImage.src = src;
    this._zoomImage.alt = alt;
    this._zoomedTitle.textContent = title;
    super.open();
  }
}
