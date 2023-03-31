import Popup from './components/Popup.js';

const popup = document.querySelector('.popup');
const button = document.querySelector('.button');

const form = new Popup({
    handleFormSubmit: (data) => {
        form.close();
        console.log(data);
    }},
    popup
);

form.setEventListeners();

button.addEventListener('click', () => {
    // formValidatorProfile.resetValidation();
    form.open();
})