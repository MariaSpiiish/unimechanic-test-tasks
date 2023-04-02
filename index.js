import Popup from './components/Popup.js';
import FormValidator from './components/FormValidator.js';

const popup = document.querySelector('.popup');
const button = document.querySelector('.button');
const formElement = document.querySelector('.form');
const selectorList = {
    formSelector: '.form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__submit-button',
    inactiveButtonClass: 'popup__submit-button_inactive',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__input-error_active',
  }

const form = new Popup({
    handleFormSubmit: (data) => {
        form.close();
        console.log(data);
    }},
    popup
);

form.setEventListeners();

const formValidator = new FormValidator(selectorList, formElement);
formValidator.enableValidation();

button.addEventListener('click', () => {
    formValidator.resetValidation();
    form.open();
})