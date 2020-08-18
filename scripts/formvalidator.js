const params = {
  formSelector: '.popup',
  inputSelector: '.popup__item',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_inactive',
  inputErrorClass: 'popup__item_type_error',
  errorClass: 'popup__error_visible'
};

const openEditButtonValidate = document.querySelector('.profile__edit-button');
const openAddCardValidate = document.querySelector('.profile__add-button');
const cardFormValidate = document.querySelector('.popup_card');
const editFormValidate = document.querySelector('.popup_profile');

class FormValidator {
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
  _showInputError(formSelector, inputSelector, errorMessage, settings) {
    const formError = formSelector.querySelector(`#${inputSelector.id}-error`);
    inputSelector.classList.add(settings.inputErrorClass);
    formError.textContent = errorMessage;
    formError.classList.add(settings.errorClass);
  }
  _hideInputError(formSelector, inputSelector, settings) {
    const formError = formSelector.querySelector(`#${inputSelector.id}-error`);
    inputSelector.classList.remove(settings.inputErrorClass);
    formError.classList.remove(settings.errorClass);
    formError.textContent = '';
  }
  _isValid(formSelector, inputSelector, settings) {
    if (!inputSelector.validity.valid) {
      // Если поле не проходит валидацию, покажем ошибку
      // проверять valueMissing и tooShort, typeMismatch
      this._showInputError(formSelector, inputSelector, inputSelector.validationMessage, settings);
    } else {
      // Если проходит, скроем
      this._hideInputError(formSelector, inputSelector, settings);
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
  _toggleButtonState(inputList, buttonElement, settings) {
    // Если есть хотя бы один невалидный инпут
    if (this._hasInvalidInput(inputList)) {
      // сделай кнопку неактивной
      buttonElement.classList.add(settings.inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
      // иначе сделай кнопку активной
      buttonElement.classList.remove(settings.inactiveButtonClass);
      buttonElement.disabled = false;
    }
  }
  _setEventListeners(formSelector, settings) {
    // Находим все поля внутри формы,
    // сделаем из них массив методом Array.from
    const inputList = Array.from(formSelector.querySelectorAll(settings.inputSelector));
    const buttonElement = formSelector.querySelector(settings.submitButtonSelector);
    if (buttonElement !== null) {
      this._toggleButtonState(inputList, buttonElement, settings);
    }

    // обходим все элементы внутри формы и навешиваем на них обработчик событий
    inputList.forEach((inputSelector) => {
      inputSelector.addEventListener('input', () => {
        // Внутри колбэка вызовем isValid, что бы показать сообщения об ошибках
        this._isValid(formSelector, inputSelector, settings);
        this._toggleButtonState(inputList, buttonElement, settings);
      });
    });
    this._button.addEventListener('click', () => {
      this._newEmptyForm(this._formElement, this._settings);
    });
  }
  //при открытии формы сбрасываем все ошибки для нее
  _newEmptyForm (formSelector, settings) {
    // Находим все поля внутри формы,
    // сделаем из них массив методом Array.from
    const inputList = Array.from(formSelector.querySelectorAll(settings.inputSelector));
    const buttonElement = formSelector.querySelector(settings.submitButtonSelector);
    if (buttonElement !== null) {
      this._toggleButtonState(inputList, buttonElement, settings);

    }
    // обходим все элементы внутри формы
    inputList.forEach((inputSelector) => {
      // скрываем сообщения об ошибках
      this._hideInputError(formSelector, inputSelector, settings);
    });
  }
  enableValidation(){
    this._formElement.addEventListener('submit', (evt) => {
      evt.preventDefault();
    });
    this._setEventListeners(this._formElement, this._settings);
  }
}

const popupProfile = new FormValidator(params, editFormValidate, openEditButtonValidate);
const popupCard = new FormValidator(params, cardFormValidate, openAddCardValidate);
popupProfile.enableValidation();
popupCard.enableValidation();


