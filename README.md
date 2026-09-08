# space-prototype

Прототип на дизайн-системе `@otp/space-ui-kit`. Живёт только в этом
репозитории: `main` — исходники, `gh-pages` — собранный билд для GitHub Pages.
Сам кит в репозиторий не входит: он подключается локально как tgz-пакет из
`vendor/` (в `.gitignore`), собранный командой `npm run kit:update` из
локальной копии кита (`package.json#config.kitDir`).

## Первый запуск на новой машине

```bash
npm run kit:update   # нужен локальный клон кита с собранным dist/
npm install
npm run dev
```

## Команды

| Команда | Что делает |
| --- | --- |
| `npm run dev` | локальный dev-сервер Vite |
| `npm run kit:update` | пересобрать tgz из `dist/` кита и переустановить (`-- --build` — сначала собрать кит) |
| `npm run deploy` | билд + публикация `dist/` в ветку `gh-pages` репозитория из `package.json#config.pagesRepo` |
| `npm run deploy -- --repo Tallercreator/имя` | то же, в другой репозиторий |

## Правила

- Компоненты импортировать по subpath: `@otp/space-ui-kit/button`, иконки — `@otp/space-ui-kit/icons/<имя>`.
- Стили — только токен-утилиты кита (`gap-spacing-md`, `p-spacing-xl`, `bg-base-surface-primary-background`), без сырых `var(--ui-*)` и числовых утилит.
- В ките нет preflight: голые `h2`/`button` получают UA-стили, используйте `Typography` и `Button`.
- Тёмная тема — класс `dark` на `<html>`.
