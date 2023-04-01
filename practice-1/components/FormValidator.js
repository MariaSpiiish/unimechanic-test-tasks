export default class FormValidator {
    constructor(obj, formElement) {
        this._formElement = formElement;
        this._input = obj.inputSelector;
        this._submitButton = obj.submitButtonSelector;
        this._inactiveButtonClass = obj.inactiveButtonClass;
        this._inputErrorClass = obj.inputErrorClass;
        this._errorClass = obj.errorClass
        
        
        this._buttonElement = this._formElement.querySelector(this._submitButton);
        this._inputList = Array.from(this._formElement.querySelectorAll(this._input));
    }

        // функция показывает ошибку ввода
    _showInputError = (inputElement, errorMessage) => {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.add(this._inputErrorClass);

        // Заменим содержимое span с ошибкой на переданный параметр
        errorElement.textContent = errorMessage;
        errorElement.classList.add(this._errorClass);
    };

    //функция  прячет сообщение об ошибке, если ошибки нет
    _hideInputError = (inputElement) => {
        const errorElement = this._formElement.querySelector(`.${inputElement.id}-error`);
        inputElement.classList.remove(this._inputErrorClass);
        errorElement.classList.remove(this._errorClass);

        // Очистим ошибку
        errorElement.textContent = '';
    };

    //проверить валидно ли поле
    _isValid = (inputElement) => {
        if (!inputElement.validity.valid) {
            this._showInputError(inputElement, inputElement.validationMessage);
        } else {
            this._hideInputError(inputElement);
        }
    };

    _hasInvalidInput = () => {
        return this._inputList.some((inputElement) => {
            return !inputElement.validity.valid;
        });
    };

    _enableButton = () => {
        this._buttonElement.disabled = false;
        this._buttonElement.classList.remove(this._inactiveButtonClass); 
    };

    _disableButton = () => {
        this._buttonElement.disabled = true;
        this._buttonElement.classList.add(this._inactiveButtonClass); 
    }

    resetValidation = () => {
        this._toggleButtonState();

        this._inputList.forEach((inputElement) => {
            this._hideInputError(inputElement);
        });
    }

    _toggleButtonState = () => { 
        if (this._hasInvalidInput(this._inputList)) { 
            this._disableButton();
        } else { 
            this._enableButton();
        } 
    };

    //установить обработчик события инпут на все поля ввода
    _setEventListeners = () => {
        this._toggleButtonState();

        this._inputList.forEach((inputElement) => {
            inputElement.addEventListener('input', () => {
            this._isValid(inputElement);
            this._toggleButtonState();
            });
        });
    }; 
    
    enableValidation = () => {
        this._setEventListeners();
    };
}