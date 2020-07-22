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
let profileInfo = document.querySelector('.profile__profile-info');
let editForm = document.querySelector('.edit-form_profile');
let cardForm = document.querySelector('.edit-form_card');
let cardZoom = document.querySelector('.edit-form_card-zoom');
// кнопки закрытия модалок
const closeEditForm = editForm.querySelector('.edit-form__close-icon');
const closeAddCard = cardForm.querySelector('.edit-form__close-icon');
const closeImage = cardZoom.querySelector('.edit-form__close-icon');
// элементы профиля
const form = editForm.querySelector('.edit-form__form');
let name = profileInfo.querySelector('.profile__name');
let memo = profileInfo.querySelector('.profile__memo');
let inputName = form.querySelector('.edit-form__item_name');
let inputMemo = form.querySelector('.edit-form__item_memo');
// элементы модалки создания карточки
let inputTitle = cardForm.querySelector('.edit-form__item_title');
let inputLink = cardForm.querySelector('.edit-form__item_link');
const gridTemplate = document.querySelector('#card').content;
const gridCards = document.querySelector('.grid__cards');


function formToggle(modalWindow) {
    modalWindow.classList.toggle('edit-form_open');
    if (editForm.classList.contains('edit-form_open')) {
        inputName.value = name.textContent;
        inputMemo.value = memo.textContent;
    }
    if (!cardForm.classList.contains('edit-form_open')) {
        inputTitle.value = '';
        inputLink.value = '';
    }
}

function editFormZoom(event) {
    cardZoom.classList.toggle('edit-form_open');
    if (cardZoom.classList.contains('edit-form_open')) {
        cardZoom.querySelector('.edit-form__image-zoom').src = event.currentTarget.src;
        cardZoom.querySelector('.edit-form__image-zoom').alt = event.currentTarget.alt;
        cardZoom.querySelector('.edit-form__heading_zoom').textContent = event.currentTarget.alt;
    }
    
}
function saveProfile(event) {
    event.preventDefault();
    name.textContent = inputName.value;
    memo.textContent = inputMemo.value;
    formToggle(editForm);
}
// renderCard - рисует карточку.
function renderCard(data) {
    const gridElement = gridTemplate.cloneNode(true);
    gridElement.querySelector('.grid__grid-image').src = data.link;
    gridElement.querySelector('.grid__grid-image').alt = data.name;
    gridElement.querySelector('.grid__title').textContent = data.name;
    gridElement.querySelector('.grid__heart').addEventListener('click', function (evt) {
        evt.target.classList.toggle('grid__heart_active');
    });
    const deleteButton = gridElement.querySelector('.grid__basket');
    deleteButton.addEventListener('click', function () {
        const listItem = deleteButton.closest('.grid__element');
        listItem.remove();
    });
    gridElement.querySelector('.grid__grid-image').addEventListener('click', editFormZoom);
    gridCards.prepend(gridElement);
}
// addCard - добавляет карточку в grid__cards
function addCard(data) {  
    renderCard(data);
    formToggle(cardForm);
}
//устновка обработчика событий на кнопки.
openEditButton.addEventListener('click', () => {
    formToggle(editForm);
});
closeEditForm.addEventListener('click', () => {
    formToggle(editForm);
});
openAddCard.addEventListener('click', () => {
    formToggle(cardForm);
});
closeAddCard.addEventListener('click', () => {
    formToggle(cardForm);
});
closeImage.addEventListener('click', () => {
    formToggle(cardZoom);
});
form.addEventListener('submit',saveProfile);
cardForm.querySelector('.edit-form__form').addEventListener('submit', (event) => {
    event.preventDefault();
    addCard({name: inputTitle.value, link: inputLink.value })
});
//создание карточек по умолчанию.
for (let i = 0; i < initialCards.length; i += 1) {
    renderCard(initialCards[i]);
}

