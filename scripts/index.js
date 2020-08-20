import { params, initialCards } from "../utils/constants.js";
import Card from "./card.js";
import FormValidator from './formvalidator.js';
const openEditButton = document.querySelector('.profile__edit-button');
const openAddCard = document.querySelector('.profile__add-button');
const profileInfo = document.querySelector('.profile__profile-info');
const editForm = document.querySelector('.popup_profile');
const cardForm = document.querySelector('.popup_card');
const cardZoom = document.querySelector('.popup_card-zoom');
const modals = document.querySelectorAll('.popup');
// элементы профиля
const form = editForm.querySelector('.popup__form');
const name = profileInfo.querySelector('.profile__name');
const memo = profileInfo.querySelector('.profile__memo');
const inputName = form.querySelector('.popup__item_name');
const inputMemo = form.querySelector('.popup__item_memo');
// элементы модалки создания карточки
const cardCreateBt = cardForm.querySelector('.popup__form');
const inputTitle = cardForm.querySelector('.popup__item_title');
const inputLink = cardForm.querySelector('.popup__item_link');
const cardFormErrors = cardForm.querySelectorAll('.popup__error');
const gridCards = document.querySelector('.grid__cards');
const zoomedImage = cardZoom.querySelector('.popup__image-zoom');
const zoomedTitle = cardZoom.querySelector('.popup__heading_zoom');

function toggleForm(modalWindow) {
  modalWindow.classList.toggle('popup_open');
  if (modalWindow.classList.contains('popup_open')) {
    closeEsc();
  } else {
    closeEscRemove();
  }
}
function closeForm(target, modalWindow) {
  if (target.classList.contains('popup')
    || target.classList.contains('popup__close-icon')) {
    modalWindow.classList.remove('popup_open');
    closeEscRemove();
    const errors = Array.from(modalWindow.querySelectorAll('.popup__error'));
    errors.forEach((err) => {
      err.classList.remove('popup__error_visible');
    });
  }
}

// imageZoom - принимаем значения {src: src, alt: alt, title: title}
function zoomImage(data) {
  toggleForm(cardZoom);
  if (cardZoom.classList.contains('popup_open')) {
    zoomedImage.src = data.src;
    zoomedImage.alt = data.alt;
    zoomedTitle.textContent = data.title;
  }
}
function fillEditProfile() {
  if (editForm.classList.contains('popup_open')) {
    inputName.value = name.textContent;
    inputMemo.value = memo.textContent;
  }
}
function initCardForm() {
  if (!cardForm.classList.contains('popup_open')) {
    inputTitle.value = '';
    inputLink.value = '';
  }
}

function saveProfile(event) {
  event.preventDefault();
  name.textContent = inputName.value;
  memo.textContent = inputMemo.value;
  toggleForm(editForm);
  fillEditProfile();
}

function renderCard(data) {
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
//устанавливаем обработчик событий на кнопки.
openEditButton.addEventListener('click', () => {
  toggleForm(editForm);
  fillEditProfile();
});
editForm.addEventListener('click', (evt) => {
  closeForm(evt.target, editForm);
});

openAddCard.addEventListener('click', () => {
  toggleForm(cardForm);
});
cardForm.addEventListener('click', (evt) => {
  closeForm(evt.target, cardForm);
  initCardForm();
});
cardZoom.addEventListener('click', (evt) => {
  closeForm(evt.target, cardZoom);
});
// устанавливаю обработчик для заполнения формы профиля
form.addEventListener('submit', saveProfile);

// устанавливаю обработчик для создания карточек
cardCreateBt.addEventListener('submit', (event) => {
  event.preventDefault();
  renderCard({ name: inputTitle.value, link: inputLink.value });
  toggleForm(cardForm);
  initCardForm();
});
//создание карточек по умолчанию.
initialCards.forEach((initialCard) => {
  renderCard(initialCard);
});

function escEvent(evt) {
  if (evt.key === 'Escape') {
    modals.forEach((modal) => {
      if (modal.classList.contains('popup_open')) {
        toggleForm(modal);
        if (modal.classList.contains('popup_card')) {
          initCardForm();
        }
      }
    });
  }
}
// создает событие закрытия на модалке по нажатию на esc
function closeEsc() {
  document.addEventListener('keydown', escEvent);
}

function closeEscRemove() {
  document.removeEventListener('keydown', escEvent);
}


const validateProfile = new FormValidator(params, editForm, openEditButton);
const validateCard = new FormValidator(params, cardForm, openAddCard);
validateProfile.enableValidation();
validateCard.enableValidation();
