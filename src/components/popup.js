export default class Popap {
  constructor(popupSelector) {
    this._popupSelector = document.querySelector(popupSelector);
  }
  open() {
    this._popupSelector.add('popup_open');
  }
  close() {
    this._popupSelector.remove('popup_open');
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
        if (this._popupSelector.classList.contains('popup_open')) {
          this.close();
        }
    }
  }
  setEventListeners(){

  }

}
