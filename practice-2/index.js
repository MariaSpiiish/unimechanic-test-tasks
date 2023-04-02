import Api from "./Api.js";
import TableRow from "./TableRow.js";
import Section from "./Section.js";

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
