export default class TableRow {
    //данные конструктора
    constructor({ data }, rowSelector) {
        this._userId = data.userId;
        this._title = data.title;
        this._body = data.body;
        this.rowId = data.id;
        this._rowSelector = rowSelector;
    }

    //забираем разметку из html и клонируем элемент, возвращаем DOM-элемент
    _getTemplate() {
        return document
            .querySelector(this._rowSelector)
            .content
            .querySelector('.table__row')
            .cloneNode(true);  
    }

    //добавляем данные в разметку
    generateRow() {
        //запишем разметку в поле _element
        this._element = this._getTemplate();

        this._userCell = this._element.querySelector('.table__item_type_user');
        this._titleCell = this._element.querySelector('.table__item_type_title');
        this._bodyCell = this._element.querySelector('.table__item_type_body');

     //добавляем данные
        this._userCell.textContent = this._userId;
        this._titleCell.textContent = this._title;
        this._bodyCell.textContent = this._body;
        
        //вернём элемент
        return this._element;
    }
}