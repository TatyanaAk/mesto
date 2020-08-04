const params = {
    formSelector: '.popup',
    inputSelector: '.popup__item',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_inactive',
    inputErrorClass: 'popup__item_type_error',
    errorClass: 'popup__error_visible'
  };
//пишем сообщение об ошибке под полем ввода
const showInputError = (formSelector, inputSelector, errorMessage,settings) => {
    const formError = formSelector.querySelector(`#${inputSelector.id}-error`);
    inputSelector.classList.add(settings.inputErrorClass);
    formError.textContent = errorMessage;
    formError.classList.add(settings.errorClass);
  };

const hideInputError = (formSelector, inputSelector,settings) => {
    const formError = formSelector.querySelector(`#${inputSelector.id}-error`);
    inputSelector.classList.remove(settings.inputErrorClass);
    formError.classList.remove(settings.errorClass);
    formError.textContent = '';
  };
const isValid = (formSelector,inputSelector,settings) => {
    if (!inputSelector.validity.valid) {
        // Если поле не проходит валидацию, покажем ошибку
        // проверять valueMissing и tooShort, typeMismatch 
      showInputError(formSelector,inputSelector, inputSelector.validationMessage,settings);
    } else {
      // Если проходит, скроем
      hideInputError(formSelector,inputSelector,settings);
    }
  };

const hasInvalidInput = (inputList) => {
    // проходим по этому массиву методом some
    return inputList.some((inputSelector) => {
        // Если поле не валидно, колбэк вернёт true
        // Обход массива прекратится и вся фунцкция
        // hasInvalidInput вернёт true
  
      return !inputSelector.validity.valid;
    })
  };
const toggleButtonState = (inputList, buttonElement,settings) => {
    // Если есть хотя бы один невалидный инпут
    if (hasInvalidInput(inputList)) {
      // сделай кнопку неактивной
      buttonElement.classList.add(settings.inactiveButtonClass);
      buttonElement.disabled = true;
    } else {
          // иначе сделай кнопку активной
      buttonElement.classList.remove(settings.inactiveButtonClass);
      buttonElement.disabled = false;
    }
  };
const setEventListeners = (formSelector,settings) => {
    // Находим все поля внутри формы,
    // сделаем из них массив методом Array.from
    const inputList = Array.from(formSelector.querySelectorAll(settings.inputSelector));
    const buttonElement = formSelector.querySelector(settings.submitButtonSelector);
    if (buttonElement !== null ) {
        toggleButtonState(inputList, buttonElement,settings);
    }

    // обходим все элементы внутри формы и навешиваем на них обработчик событий
    inputList.forEach((inputSelector) => {
      inputSelector.addEventListener('input', () => {
        // Внутри колбэка вызовем isValid, что бы показать сообщения об ошибках
        isValid(formSelector, inputSelector,settings);
        toggleButtonState(inputList, buttonElement,settings);
      });
    });
};
//при открытии формы сбрасываем все ошибки для нее
const newEmptyForm = (formSelector,settings) => {
    // Находим все поля внутри формы,
    // сделаем из них массив методом Array.from
    const inputList = Array.from(formSelector.querySelectorAll(settings.inputSelector));
    const buttonElement = formSelector.querySelector(settings.submitButtonSelector);
    if (buttonElement !== null ) {
        toggleButtonState(inputList, buttonElement,settings);
        
    }
    // обходим все элементы внутри формы
    inputList.forEach((inputSelector) => {
        // скрываем сообщения об ошибках
        hideInputError(formSelector,inputSelector,settings);  
    });
};
const enableValidation = (settings) => {
    // делаем массив для форм с классом .popup
    const formList = Array.from(document.querySelectorAll(settings.formSelector));
  
    // Переберём полученную коллекцию
    formList.forEach((form) => {
        form.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
          setEventListeners(form,settings);
    });
};

enableValidation(params);
const openEditButtonValidate = document.querySelector('.profile__edit-button');
const openAddCardValidate = document.querySelector('.profile__add-button');
const cardFormValidate = document.querySelector('.popup_card');
const editFormValidate = document.querySelector('.popup_profile');
openAddCardValidate.addEventListener('click', () => {
    newEmptyForm(cardFormValidate,params);
});
openEditButtonValidate.addEventListener('click', () => {
    newEmptyForm(editFormValidate,params);
});

