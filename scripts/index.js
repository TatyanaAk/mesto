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
const editForm = document.querySelector('.edit-form_profile');
const cardForm = document.querySelector('.edit-form_card');
const cardZoom = document.querySelector('.edit-form_card-zoom');
// кнопки закрытия модалок
const closeEditForm = editForm.querySelector('.edit-form__close-icon');
const closeAddCard = cardForm.querySelector('.edit-form__close-icon');
const closeImage = cardZoom.querySelector('.edit-form__close-icon');
// элементы профиля
const form = editForm.querySelector('.edit-form__form');
const name = profileInfo.querySelector('.profile__name');
const memo = profileInfo.querySelector('.profile__memo');
const inputName = form.querySelector('.edit-form__item_name');
const inputMemo = form.querySelector('.edit-form__item_memo');
// элементы модалки создания карточки
const cardCreateBt = cardForm.querySelector('.edit-form__form');
const inputTitle = cardForm.querySelector('.edit-form__item_title');
const inputLink = cardForm.querySelector('.edit-form__item_link');
const gridTemplate = document.querySelector('#card').content;
const gridCards = document.querySelector('.grid__cards');


function formToggle(modalWindow) {
    modalWindow.classList.toggle('edit-form_open');
}
// editFormZoom - принимает значения {src: src, alt: alt, title: title}
function editFormZoom(data) {
    const image = cardZoom.querySelector('.edit-form__image-zoom');
    const title = cardZoom.querySelector('.edit-form__heading_zoom');
    formToggle(cardZoom);
    if (cardZoom.classList.contains('edit-form_open')) {
        image.src = data.src;
        image.alt = data.alt;
        title.textContent = data.title;
    }   
}
function editProfileFill() {
    if (editForm.classList.contains('edit-form_open')) {
        inputName.value = name.textContent;
        inputMemo.value = memo.textContent;
    }
}
function cardFormInit() {
    if (!cardForm.classList.contains('edit-form_open')) {
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
function showCard(card) {
    gridCards.prepend(card);
}
// renderCard - рисует карточку.
function renderCard(data) {
    const gridElement = gridTemplate.cloneNode(true);
    const image = gridElement.querySelector('.grid__grid-image');
    const title = gridElement.querySelector('.grid__title');
    const heart = gridElement.querySelector('.grid__heart');
    image.src = data.link;
    image.alt = data.name;
    title.textContent = data.name;
    heart.addEventListener('click', function (evt) {
        evt.target.classList.toggle('grid__heart_active');
    });
    const deleteButton = gridElement.querySelector('.grid__basket');
    deleteButton.addEventListener('click', function () {
        const listItem = deleteButton.closest('.grid__element');
        listItem.remove();
    });
    
    image.addEventListener('click', (event) => {
        editFormZoom({src: image.src, alt: image.alt, title: title.textContent});
    });
    return gridElement;
}

function addCard(data) {  
    const card = renderCard(data);
    showCard(card);
}
//устновка обработчика событий на кнопки.
openEditButton.addEventListener('click', () => {
    formToggle(editForm);
    editProfileFill();
});
closeEditForm.addEventListener('click', () => {
    formToggle(editForm);
});
openAddCard.addEventListener('click', () => {
    formToggle(cardForm);
});
closeAddCard.addEventListener('click', () => {
    formToggle(cardForm);
    cardFormInit();
});
closeImage.addEventListener('click', () => {
    formToggle(cardZoom);
});
// устанавливаю обработчик для заполнения формы профиля
form.addEventListener('submit',saveProfile);

// устанавливаю обработчик для создания карточек
cardCreateBt.addEventListener('submit', (event) => {
    event.preventDefault();
    addCard({name: inputTitle.value, link: inputLink.value });
    formToggle(cardForm);
    cardFormInit();
});
//создание карточек по умолчанию.
// значение переменной i меняется напрямую ,применение const означает что i всегда будет равна 0
// щётчик в циклах всегда переменная
for (let i = 0; i < initialCards.length; i += 1) {
    const card = renderCard(initialCards[i]);
    showCard(card);
}

