class TableRow {
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

class Section {
    constructor({renderer}, containerSelector) {
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
    }

    //отрисовка каждого элемента
    renderItems(data) {
        data.forEach(item => {
            this._renderer(item);
        })
    }

    //принимает DOM-элемент и добавляет его в контейнер
    addItem(element) {
        this._container.append(element);
    }
}

class Api {
    constructor(options) {
        this.url = options.url;
    }
  
    _handleResponse(res) {
      if(res.ok) {
        return res.json();
      }
      return Promise.reject(res.status);
    }
  
    getInfo() {
        return fetch(this.url)
            .then(this._handleResponse)
    }
  }

const api = new Api({
    url: 'https://jsonplaceholder.typicode.com/posts',
})

const rowTemplate = '.row-template';
const rowsContainer = '.table__body';

const addNewRow = (data) => {
    const row = new TableRow ({
        data: data,
      },
      rowTemplate,
    );
    return row.generateRow();
  }

const section = new Section ({
    renderer: (item) => {
        const rows = addNewRow(item);
        section.addItem(rows);
    } 
    }, rowsContainer
);

api.getInfo()
    .then((data) => {
        section.renderItems(data);
        
    })
    .catch((err) => {
        console.log(`Ошибка загрузки данных: ${err}`);
    });