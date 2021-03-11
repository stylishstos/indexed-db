const { BrowserWindow } = require('electron').remote;
const DB = require('../../common/lib/db');
const Categories = require('../../common/repository/categories');

DB.connect().then(async (db) => {
    const categoriesSelectNode = document.querySelector('#categories-list');
    const categoriesRepository = new Categories(db);
    const categories = await categoriesRepository.getAll();

    if (categories.length) {
        categories.forEach((category) => {
            categoriesSelectNode.append(new Option(category, category));
        });
    } else {
        categoriesSelectNode.remove();
    }
});

const addCategoryBtn = document.querySelector('#add-category');
addCategoryBtn.addEventListener('click', function () {
    const win = new BrowserWindow({
        modal: true,
        show: false,
        width: 400,
        height: 600,
        webPreferences: {
            nodeIntegration: true,
            enableRemoteModule: true
        }
    });

    win.loadFile('./src/pages/category/category.html');

    win.once('ready-to-show', () => {
        win.show();
    })
});