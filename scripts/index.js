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

