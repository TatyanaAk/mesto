export default class Popap {
  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector);
    this._closeIcon = this._popupSelector.querySelector('.popup__close-icon');
  }
  open() {
    this._popupSelector.classList.add('popup_open');
  }
  close() {
    this._popupSelector.classList.remove('popup_open');
  }
  //  _toggleForm(modalWindow) {
  //   modalWindow.classList.toggle('popup_open');
  //   if (modalWindow.classList.contains('popup_open')) {
  //     closeEsc();
  //   } else {
  //     closeEscRemove();
  //   }
  // }
  _handleEscClose(evt) {
    if (evt.key === 'Escape') {
        // if (this._popupSelector.classList.contains('popup_open')) {
          this.close();
          document.removeEventListener('keydown', this._handleEscClose);
        // }
    }
  }
  setEventListeners(){
    this._closeIcon.addEventListener('click', () => {
      this.close();
    });
    document.addEventListener('keydown', this._handleEscClose);
  }

}
