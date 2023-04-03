export default class Section {
    constructor({renderer}, containerSelector) {
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);

        this._container.addEventListener('sort', (event) => {
            this.renderItems(this._sortData(event.detail.column));
        });
    }

    _sortData(column) {
        console.log(column)
        // return this._data.sort((a, b) => {
        //     if (a[column] < b[column]) {
        //         return -1;
        //     }
        //     if (a[column] > b[column]) {
        //         return 1;
        //     }
        //     return 0;
        // });
    }

    //отрисовка каждого элемента
    renderItems(data) {
        this._data = data;
        this._container.innerHTML = '';

        data.forEach(item => {
            this._renderer(item);
        })
    }

    //принимает DOM-элемент и добавляет его в контейнер
    addItem(element) {
        this._container.append(element);
    }
}