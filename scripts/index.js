const openEditBatton = document.querySelector('.profile-info__edit-button');
const closeEditBatton = document.querySelector('.form__close-icon');
let profileInfo = document.querySelector('.profile-info');
let editForm = document.querySelector('.edit-form');
let name = profileInfo.querySelector('.profile-info__name');
let memo = profileInfo.querySelector('.profile-info__memo');
let inputName = editForm.querySelector('.form__item_name');
let inputMemo = editForm.querySelector('.form__item_memo');
const battonSave = editForm.querySelector('.form__batton');

function editFormToggle() {
    editForm.classList.toggle('edit-form_open');
    inputName.value = name.textContent;
    inputMemo.value = memo.textContent;
}
function saveProfile(event) {
    event.preventDefault();
    name.textContent = inputName.value;
    memo.textContent = inputMemo.value;
    editFormToggle();
}
openEditBatton.addEventListener('click', editFormToggle);
closeEditBatton.addEventListener('click', editFormToggle);

battonSave.addEventListener('click',saveProfile );

