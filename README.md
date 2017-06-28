#calendar
###Запуск та використання:

Всі команди виконуються з кореневої папки проекту.

Зібраний проект розміщено в папці public.

Для запуску потрібно запустити сервер статичних файлів

*npm run dev-serve*

Сторінка буде доступна за адресою: 

http://localhost:8081

---

#####Інші команди:

- Щоб перезібрати проект: 

*npm install*

*npm run dev-build*

- unit тести

*npm test*

- Документація jsdoc проекта: 

*documentation-output/index.html*

або через сервер статичних файлів:

*npm run dev-doc*

Сторінка буде доступна за адресою: 

http://localhost:8082

- Production build:

*npm run prod-build*

В цьому режимі вимикається побудова документації, css source maps та вмикається мініфікація скриптів

- Watcher:

*npm run dev-watch*

Для пришвидшення роботи в режимі вотч, відключений лінтер. Він використовується тільки при збиранні


###Виконані завдання:



###Використані інструменти:

Service Worker, Local Storage, Notifications API, MVC Pattern, Handlebars templating, html5, es2015 класи, jsdoc документація, лінтер eslint, препроцесор less, gulp, sprites, gulp-sprite-generator, unit-тести, сервер статичних файлів

на сторінці:
+ jquery
+ handlebars
+ lodash
+ moment
+ materializecss
+ https://github.com/nwcell/ics.js/ - для експорту подій

для розробки та збирання:
+ gulp
+ less
+ eslint (eslint:recommended, google)
+ babel (es2015)
+ jasmin - unit тести 
+ jsdoc - документація
+ gulp-sprite-generator
+ http-server - локальний сервер статичних файлів