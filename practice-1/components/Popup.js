export default class Popup {
    constructor({ handleFormSubmit }, popupSelector)  {
        this._popup = popupSelector;
        this._handleFormSubmit = handleFormSubmit;
        
        this._element = this._popup.querySelector('.form');
        this._inputList = this._element.querySelectorAll('.popup__input');
        this._submitButton = this._element.querySelector('.popup__submit-button');
        this._handleEscClose = this._handleEscClose.bind(this);
    }

    open() {
        this._popup.classList.add('popup_opened');
        document.addEventListener('keyup', this._handleEscClose);
    }

    close() {
        this._popup.classList.remove('popup_opened');
        document.removeEventListener('keyup', this._handleEscClose);
        this._element.reset();
    }

    _handleEscClose(event) {
        if(event.key === 'Escape') {
            this.close();
        }
    }

    _getInputValues() {
        this._formValues = {};
        
        this._inputList.forEach(input => {
            this._formValues[input.name] = input.value;
        });

        return this._formValues;
    }

    setEventListeners() {
        const closeButton = this._popup.querySelector('.popup__close-button');
        closeButton.addEventListener('click', () => this.close());

        this._popup.addEventListener('mousedown', (event) => {
            if (event.target === event.currentTarget) {
              this.close();
            }
        });

        this._element.addEventListener('submit', (evt) => {
            evt.preventDefault();
            this._handleFormSubmit(this._getInputValues());
        });
    }

    setInputValues(data) {
        this._inputList.forEach((input) => {
          input.value = data[input.name];
        });
      }
}
