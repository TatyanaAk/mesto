const openEditbutton = document.querySelector('.profile-info__edit-button');
let closeEditbutton = document.querySelector('.form__close-icon');
let profileInfo = document.querySelector('.profile-info');
let editForm = document.querySelector('.edit-form');
let Form = document.querySelector('.form');
let name = profileInfo.querySelector('.profile-info__name');
let memo = profileInfo.querySelector('.profile-info__memo');
let inputName = editForm.querySelector('.form__item_name');
let inputMemo = editForm.querySelector('.form__item_memo');


function editFormToggle(event) {
    event.preventDefault();
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
    editFormToggle(event);
}
openEditbutton.addEventListener('click', editFormToggle);
closeEditbutton.addEventListener('click', editFormToggle);

Form.addEventListener('submit',saveProfile );

