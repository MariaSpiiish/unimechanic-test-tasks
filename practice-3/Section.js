export default class Section {
    constructor({renderer}, containerSelector) {
        this._renderer = renderer;
        this._container = document.querySelector(containerSelector);
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