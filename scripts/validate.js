// enableValidation({
//     formSelector: '.edit-form__form',
//     inputSelector: '.edit-form__item',
//     submitButtonSelector: '.edit-form__button',
//     inactiveButtonClass: 'edit-form__button_disabled',
//     inputErrorClass: 'edit-form__item_type_error',
//     errorClass: 'edit-form__error_visible'
//   });


//пишем сообщение об ошибке под полем ввода
const showInputError = (formSelector, inputSelector, errorMessage) => {
    const formError = formSelector.querySelector(`#${inputSelector.id}-error`);
    inputSelector.classList.add('edit-form__item_type_error');
    formError.textContent = errorMessage;
    // formError.classList.add('form__input-error_active');
  };

const hideInputError = (formSelector, inputSelector) => {
    const formError = formSelector.querySelector(`#${inputSelector.id}-error`);
    inputSelector.classList.remove('edit-form__item_type_error');
    // formError.classList.remove('form__input-error_active');
    formError.textContent = '';
  };
const isValid = (formSelector,inputSelector) => {
    if (!inputSelector.validity.valid) {
      // Если поле не проходит валидацию, покажем ошибку
      showInputError(formSelector,inputSelector, inputSelector.validationMessage);
    } else {
      // Если проходит, скроем
      hideInputError(formSelector,inputSelector);
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
const toggleButtonState = (inputList, buttonElement) => {
    // Если есть хотя бы один невалидный инпут
    if (hasInvalidInput(inputList)) {
      // сделай кнопку неактивной
      buttonElement.classList.add('edit-form__button_inactive');
      buttonElement.disabled = true;
    } else {
          // иначе сделай кнопку активной
      buttonElement.classList.remove('edit-form__button_inactive');
      buttonElement.disabled = false;
    }
  };
const setEventListeners = (formSelector) => {
    // Находим все поля внутри формы,
    // сделаем из них массив методом Array.from
    const inputList = Array.from(formSelector.querySelectorAll('.edit-form__item'));
    const buttonElement = formSelector.querySelector('.edit-form__button');
    if (buttonElement !== null ) {
        toggleButtonState(inputList, buttonElement);
    }

    // обходим все элементы внутри формы и навешиваем на них обработчик событий
    inputList.forEach((inputSelector) => {
      inputSelector.addEventListener('input', () => {
        // Внутри колбэка вызовем isValid, что бы показать сообщения об ошибках
        isValid(formSelector, inputSelector);
        toggleButtonState(inputList, buttonElement);
      });
    });
  };
const enableValidation = () => {
    // делаем массив для форм с классом .edit-form
    const formList = Array.from(document.querySelectorAll('.edit-form'));
  
    // Переберём полученную коллекцию
    formList.forEach((formSelector) => {
        formSelector.addEventListener('submit', (evt) => {
        evt.preventDefault();
      });
          setEventListeners(formSelector);
    });
  };
  
enableValidation();

  
  