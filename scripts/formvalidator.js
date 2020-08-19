export default class FormValidator {
  // передаем в конструктор
  // settings - массив параметров params
  // formElement - форма для валидации
  // button - кнопка открытия формы
  constructor(settings, formElement, button) {
    this._settings = settings;
    this._formElement = formElement;
    this._button = button;
  }
  //пишем сообщение об ошибке под полем ввода
  _showInputError(inputSelector, errorMessage) {
    const formError = this._formElement.querySelector(`#${inputSelector.id}-error`);
    inputSelector.classList.add(this._settings.inputErrorClass);
    formError.textContent = errorMessage;
    formError.classList.add(this._settings.errorClass);
  }
  _hideInputError(inputSelector) {
    const formError = this._formElement.querySelector(`#${inputSelector.id}-error`);
    inputSelector.classList.remove(this._settings.inputErrorClass);
    formError.classList.remove(this._settings.errorClass);
    formError.textContent = '';
  }
  _isValid(inputSelector) {
    if (!inputSelector.validity.valid) {
      // Если поле не проходит валидацию, покажем ошибку
      // проверять valueMissing и tooShort, typeMismatch
      this._showInputError(inputSelector, inputSelector.validationMessage);
    } else {
      // Если проходит, скроем
      this._hideInputError(inputSelector);
    }
  }
  _hasInvalidInput(inputList) {
    // проходим по этому массиву методом some
    return inputList.some((inputSelector) => {
      // Если поле не валидно, колбэк вернёт true
      // Обход массива прекратится и вся фунцкция
      // hasInvalidInput вернёт true
    return !inputSelector.validity.valid;
    })
  }
  _toggleButtonState(inputList, buttonElement) {
    // Если есть хотя бы один невалидный инпут
    if (this._hasInvalidInput(inputList)) {
      // сделай кнопку неактивной
      buttonElement.classList.add(this._settings.inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      // иначе сделай кнопку активной
      buttonElement.classList.remove(this._settings.inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }
  _setEventListeners() {
    // Находим все поля внутри формы,
    // сделаем из них массив методом Array.from
    const inputList = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));
    const buttonElement = this._formElement.querySelector(this._settings.submitButtonSelector);
    if (buttonElement !== null) {
      this._toggleButtonState(inputList, buttonElement);
    }

    // обходим все элементы внутри формы и навешиваем на них обработчик событий
    inputList.forEach((inputSelector) => {
      inputSelector.addEventListener('input', () => {
        // Внутри колбэка вызовем isValid, что бы показать сообщения об ошибках
        this._isValid(inputSelector);
        this._toggleButtonState(inputList, buttonElement);
      });
    });
    this._button.addEventListener('click', () => {
      this._newEmptyForm();
    });
  }
  //при открытии формы сбрасываем все ошибки для нее
  _newEmptyForm () {
    // Находим все поля внутри формы,
    // сделаем из них массив методом Array.from
    const inputList = Array.from(this._formElement.querySelectorAll(this._settings.inputSelector));
    const buttonElement = this._formElement.querySelector(this._settings.submitButtonSelector);
    if (buttonElement !== null) {
      this._toggleButtonState(inputList, buttonElement);

    }
    // обходим все элементы внутри формы
    inputList.forEach((inputSelector) => {
      // скрываем сообщения об ошибках
      this._hideInputError(inputSelector);
    });
  }
  enableValidation(){
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners();
  }
}




