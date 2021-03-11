module.exports = class DB {
    static connect() {
        return new Promise((resolve, reject) => {
            const openRequest = indexedDB.open('expenses', 1);

            openRequest.onblocked = function () { }

            openRequest.onupgradeneeded = function () {
                const db = openRequest.result;

                db.createObjectStore('categories', { autoIncrement: true });
            }

            openRequest.onsuccess = function () {
                let db = openRequest.result;

                // кажется здесь это излишне, будет полезно только в браузере
                db.onversionchange = function () {
                    db.close();

                    new Notification('IndexedDB', {
                        body: 'База данных устарела, необходимо перезапустить приложение'
                    });
                }

                resolve(db);
            }

            openRequest.onerror = function (e) {
                new Notification('IndexedDB Error', {
                    body: e
                });

                reject(e);
            }
        });
    }
}