const DB = require('../../common/lib/db');
const Categories = require('../../common/repository/categories');

buttonAdd.addEventListener('click', () => {
    if (category.value) {
        DB.connect().then((db) => {
            const categoriesRepository = new Categories(db);
            categoriesRepository.add(category.value);
        });
    } else {
        alert('необходимо ввести название категории');
    }
})