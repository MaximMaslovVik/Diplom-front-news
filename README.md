# Diplom-front-news

## Фронтенд часть дипломного проекта Яндекс.Практикум:
```
Данный проект состоит из двух страниц. 
Проект представляет собой сервис по поиску новостей по запросу, и возможностью сохранить их в личном кабинете.
Сборка проекта реализована при помощи Webpack.
```
Открытие/закрытие мобильного меню:
```
document.querySelector('.header__popup-mobile').classList.toggle('header_is-opened');
```
Открытие/закрытие popup 'Вход'
```
document.querySelector('.popup-signin').classList.toggle('popup_is-opened');
```
Открытие/закрытие popup 'Регистрация'
```
document.querySelector('.popup-signup').classList.toggle('popup_is-opened');
```
Открытие/закрытие popup 'Успешная регистрация'
```
document.querySelector('.popup-success').classList.toggle('popup_is-opened');
```

[Бэкенд часть]

  /*  max@84.201.146.193:diplom-max.ml */

### Функционал:
#### Страница "Главная":
- Регистрация пользователя,
- Вход в личный кабинет,
- Валидация форм,
- Шапка имеет 2 состояния(зарегистрирован/не зарегистрирован),
- Сервис подключён к API с новостями,
- Поиск статей по ключевым словам,
- Настроен прелоудер при загрузке новостей,
- Настроен блок "Ничего не найдено",
- Перечисление найденных карточек на странице,
- Есть кнопка "Показать ещё", при нажатии выводит ещё по 3 статьи,
- Сохранение карточек если пользователь зарегистрирован, если нет, выводится всплывающее предупреждение.

#### Страница "Сохранённые статьи":
- Ведётся подсчёт сохраннёных статей,
- Перечислены ключевые слова, по которым статьи были найдены. Слова расположены в порядке убывания популярности,
- Перечисление сохраненных карточек на странице,
- Возможность удаления карточек,
- Если не зарегистрированный пользователь заходит на страницу с сохранёнными статьями (например, по прямой ссылке), он автоматически будет переведён на главную страницу.

### Установка проекта:
Для установки необходимо наличие установленного Node.JS и npm.
Сохраните проект у себя на компьютере:
```
git clone 
```

В корне проекта через консоль/терминал запустите команду:
```
npm install
```
  
#### После успешной установки станут доступны команды:
Поднятие локального сервера с режимом разработки:
```
npm run dev
```

Сборка продакшн версии:
```
npm run build
```

Развёртывание проекта на gh-pages:
```
npm run deploy
```
