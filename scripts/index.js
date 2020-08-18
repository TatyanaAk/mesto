const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  }
];

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

function formToggle(modalWindow) {
  modalWindow.classList.toggle('popup_open');
  if (modalWindow.classList.contains('popup_open')) {
    closeEsc();
  } else {
    closeEscRemove();
  }
}
function formClose(target, modalWindow) {
  if (target.classList.contains('popup')
    || target.classList.contains('popup__close-icon')) {
    modalWindow.classList.remove('popup_open');
    closeEscRemove();
    const inputs = Array.from(modalWindow.querySelectorAll('.popup__item'));
    inputs.forEach((input) => {
      input.classList.remove('popup__item_type_error');
    });

    const errors = Array.from(modalWindow.querySelectorAll('.popup__error'));
    errors.forEach((err) => {
      err.classList.remove('popup__error_visible');
    });
  }
}

// imageZoom - принимаем значения {src: src, alt: alt, title: title}
function imageZoom(data) {
  formToggle(cardZoom);
  if (cardZoom.classList.contains('popup_open')) {
    zoomedImage.src = data.src;
    zoomedImage.alt = data.alt;
    zoomedTitle.textContent = data.title;
  }
}
function editProfileFill() {
  if (editForm.classList.contains('popup_open')) {
    inputName.value = name.textContent;
    inputMemo.value = memo.textContent;
  }
}
function cardFormInit() {
  if (!cardForm.classList.contains('popup_open')) {
    inputTitle.value = '';
    inputLink.value = '';
  }
}

function saveProfile(event) {
  event.preventDefault();
  name.textContent = inputName.value;
  memo.textContent = inputMemo.value;
  formToggle(editForm);
  editProfileFill();
}
class Card {
  constructor(data, cardSelector) {
    this._link = data.link;
    this._name = data.name;
    this._cardSelector = cardSelector;
  }
  _getTemplate() {
    const gridElement = document.querySelector(this._cardSelector).content.querySelector('.grid__element').cloneNode(true);
    return gridElement;
  }
  createCard() {
    this._gridElement = this._getTemplate();


    this._image = this._gridElement.querySelector('.grid__grid-image');
    this._title = this._gridElement.querySelector('.grid__title');
    this._heart = this._gridElement.querySelector('.grid__heart');
    this._deleteButton = this._gridElement.querySelector('.grid__basket');
    this._image.src = this._link;
    this._image.alt = this._name;
    this._title.textContent = this._name
    this._setEventListeners();

    return this._gridElement;
  }
  _delete() {
    this._gridElement.remove();
  }
  _setEventListeners() {
    this._heart.addEventListener('click', function (evt) {
      evt.target.classList.toggle('grid__heart_active');
    });
    this._deleteButton.addEventListener('click', () => {
      this._delete();
    });
    this._image.addEventListener('click', () => {
      imageZoom({ src: this._image.src, alt: this._image.alt, title: this._title.textContent });
    });
  }

}

function renderCard(data) {
  const card = new Card(data, '#card');
  const cardElement = card.createCard();
  gridCards.prepend(cardElement);
}
//устанавливаем обработчик событий на кнопки.
openEditButton.addEventListener('click', () => {
  formToggle(editForm);
  editProfileFill();
});
editForm.addEventListener('click', (evt) => {
  formClose(evt.target, editForm);
});

openAddCard.addEventListener('click', () => {
  formToggle(cardForm);
});
cardForm.addEventListener('click', (evt) => {
  formClose(evt.target, cardForm);
  cardFormInit();
});
cardZoom.addEventListener('click', (evt) => {
  formClose(evt.target, cardZoom);
});
// устанавливаю обработчик для заполнения формы профиля
form.addEventListener('submit', saveProfile);

// устанавливаю обработчик для создания карточек
cardCreateBt.addEventListener('submit', (event) => {
  event.preventDefault();
  renderCard({ name: inputTitle.value, link: inputLink.value });
  formToggle(cardForm);
  cardFormInit();
});
//создание карточек по умолчанию.
initialCards.forEach((initialCard) => {
  const card = new Card(initialCard, '#card');
  const cardElement = card.createCard();
  gridCards.prepend(cardElement);
});

function escEvent(evt) {
  if (evt.key === 'Escape') {
    modals.forEach((modal) => {
      if (modal.classList.contains('popup_open')) {
        formToggle(modal);
        if (modal.classList.contains('popup_card')) {
          cardFormInit();
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
