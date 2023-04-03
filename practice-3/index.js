import Api from "./Api.js";
import TableRow from "./TableRow.js";
import Section from "./Section.js";

const api = new Api({
    url: 'https://jsonplaceholder.typicode.com/posts',
})

const rowTemplate = '.row-template';
const rowsContainer = '.table__body';

const userIdButton = document.querySelector('.table__sort-button_type_userId');
const titleButton = document.querySelector('.table__sort-button_type_title');
const bodyButton = document.querySelector('.table__sort-button_type_body');

const searchInput = document.getElementById('search');

let order = "asc";

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

function sortTable(columnIndex, isNumeric, sortOrder) {
    const tBody = document.querySelector('.table__body');
    const rows = Array.from(tBody.querySelectorAll('.table__row'));

    const sortedRows = rows.sort((a, b) => {
        const aContent = a.querySelectorAll('.table__item')[columnIndex].textContent;
        const bContent = b.querySelectorAll('.table__item')[columnIndex].textContent;
        let result;
        if (isNumeric) {
            result = Number(aContent) - Number(bContent);
        } else {
            result = aContent.localeCompare(bContent);
        }
        return sortOrder === 'desc' ? -result : result;
    });
  
    tBody.innerHTML = '';
    sortedRows.forEach(row => {
      tBody.appendChild(row);
    });

    if (order === 'asc') {
        order = 'desc'
    } else if (order === 'desc') {
        order = 'asc'
    }
}

function toggleSortBtn(className) {
    if (order === 'asc') {
        className.classList.add('table__sort-button_type_reverse');
    } else {
        className.classList.remove('table__sort-button_type_reverse');
    }
}

userIdButton.addEventListener('click', () => {
    sortTable(0, true, order);
    toggleSortBtn(userIdButton);
});

titleButton.addEventListener('click', () => {
    sortTable(1, false, order);
    toggleSortBtn(titleButton);
});

bodyButton.addEventListener('click', () => {
    sortTable(2, false, order);
    toggleSortBtn(bodyButton);
});

searchInput.addEventListener('input', (e) => {
    const value = e.target.value.toLowerCase();

    const tBody = document.querySelector('.table__body');
    const rows = Array.from(tBody.querySelectorAll('.table__row'));

    rows.forEach(item => {
        const isVisible = item.innerText.toLowerCase().includes(value);

        if (value.length > 3 && !isVisible) {
            item.classList.add("hide");
        } else {
            item.classList.remove("hide");
        }
        
      })
})