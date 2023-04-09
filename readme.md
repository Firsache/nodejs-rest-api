## GoIT Node.js Course Template Homework

- hw02 # https://github.com/Firsache/nodejs-rest-api/tree/hw02-express

REST API для роботи з колекцією контактів.
Для валідації прийнятих даних використовується пакет joi

- hw03 # https://github.com/Firsache/nodejs-rest-api/tree/03-mongodb

Робота з базою даних для MongoDB, графічним редактором MongoDB Compass.
Заміна кодів CRUD-операцій над контактами з файлу, на Mongoose-методи для роботи з колекцією контактів в базі даних.

- hw04 # https://github.com/Firsache/nodejs-rest-api/tree/04-auth

Прописана логіка аутентифікації / авторизації користувача через JWT, провалідовані поля (email і password), використований bcryptjsдля засолювання паролів, доданий мідлвар перевірки токена, пагінація для колекції контактів, фільтрація контактів по полю обраного, оновлення підписки (subscription) користувача.

- hw05 # https://github.com/Firsache/nodejs-rest-api/tree/05-avatars

Додана можливість завантаження аватарки користувача через [Multer], при реєстрації нового користувача відразу згенерувується аватар по його email через пакет gravatar, додана обробка аватарку пакетом jimp.

- hw06

### Команди:

- `npm start` &mdash; старт сервера в режимі production
- `npm run start:dev` &mdash; старт сервера в режимі розробки (development)
- `npm run lint` &mdash; запустити виконання перевірки коду з eslint, необхідно виконувати перед кожним PR та виправляти всі помилки лінтера
- `npm lint:fix` &mdash; та ж перевірка лінтера, але з автоматичними виправленнями простих помилок
