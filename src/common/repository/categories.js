module.exports = class Categories {
    constructor(db) {
        this.db = db;
    }

    add(category) {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction('categories', 'readwrite');
            const categories = transaction.objectStore('categories');

            const request = categories.add(category);

            request.onsuccess = () => {
                resolve(request.result);
                new Notification('Success', { body: 'категория успешно добавлена' })
            };

            request.onerror = (e) => {
                reject(e);
                new Notification('Error', { body: e.message })
            };
        });
    }

    getAll() {
        return new Promise((resolve, reject) => {
            const transaction = this.db.transaction('categories', 'readonly');
            const categories = transaction.objectStore('categories');

            const request = categories.getAll();

            request.onsuccess = function () {
                resolve(request.result);
            }
        });
    }
}