import Popup from './popup.js';

export default class PopupWithForm extends Popup {
  constructor(popupSelector, handleFormSubmit) {
    super(popupSelector);
    this._handleFormSubmit = handleFormSubmit;

  }
  _getInputValues() {

    const inputList = Array.from(this._popupSelector.querySelectorAll('.popup__item').value);
    return inputList;
  }
  setEventListeners(){
    super.setEventListeners();
    this._popupSelector.addEventListener('submit', (event) => {
      event.preventDefault();
      this._handleFormSubmit(this._getInputValues);
    });
  }
  close() {
    super.close();
    this._popupSelector.reset();
  }
}
