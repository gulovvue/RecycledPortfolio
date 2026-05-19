# Recycling Portfolio — Данилов М.Ф.

Статический одностраничный сайт-портфолио. Чистый HTML + React (через Babel-standalone, без сборки). Можно открывать прямо из файловой системы и хостить как статику.

## Структура

```
index.html         — корень
styles.css         — все стили (токены вшиты внутрь)
Nav.jsx            — навигация
Hero.jsx           — главный экран
Components.jsx     — общие компоненты + Lightbox
assets/projects/   — изображения (по проектам)
```

## Локальный запуск

Любой статический сервер сгодится, например:

```
npx serve .
# или
python3 -m http.server 8080
```

Откройте `http://localhost:8080`.

## Деплой — GitHub Pages

1. Залейте содержимое этой папки в корень репозитория `gulovvue/RecycledPortfolio` (ветка `main`).
2. На GitHub → **Settings → Pages** → Source: **Deploy from a branch**, ветка `main`, папка `/ (root)`.
3. Через 30–60 секунд сайт будет на `https://gulovvue.github.io/RecycledPortfolio/`.

Файл `.nojekyll` уже включён, чтобы GitHub Pages не пытался обработать страницу через Jekyll и не ломал ничего, что начинается с подчёркивания.

## Контакты

Telegram: [@danilovmf](https://t.me/danilovmf)
