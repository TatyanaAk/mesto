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
const closeEditButton = document.querySelector('.edit-form__close-icon');
let profileInfo = document.querySelector('.profile__profile-info');
let editForm = document.querySelector('.edit-form');
let form = editForm.querySelector('.edit-form__form');
let name = profileInfo.querySelector('.profile__name');
let memo = profileInfo.querySelector('.profile__memo');
let inputName = form.querySelector('.edit-form__item_name');
let inputMemo = form.querySelector('.edit-form__item_memo');


function editFormToggle() {
    editForm.classList.toggle('edit-form_open');
    if (editForm.classList.contains('edit-form_open')) {
        inputName.value = name.textContent;
        inputMemo.value = memo.textContent;
    }
    
}
function saveProfile(event) {
    event.preventDefault();
    name.textContent = inputName.value;
    memo.textContent = inputMemo.value;
    editFormToggle();
}
openEditButton.addEventListener('click', editFormToggle);
closeEditButton.addEventListener('click', editFormToggle);

form.addEventListener('submit',saveProfile);

const gridTemplate = document.querySelector('#card').content;
const gridMenu = document.querySelector('.grid__menu');
for (let i = 0; i < initialCards.length; i += 1) {
    // каждый раз создавать новый клон элемента
    const gridElement = gridTemplate.cloneNode(true);
    gridElement.querySelector('.grid__grid-image').src=initialCards[i].link;
    gridElement.querySelector('.grid__grid-image').alt = initialCards[i].name;
    gridElement.querySelector('.grid__title').textContent = initialCards[i].name;
    gridMenu.append(gridElement);
}
