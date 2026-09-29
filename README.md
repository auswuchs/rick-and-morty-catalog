# Rick & Morty Catalog

Каталог персонажей на **React** и **GraphQL**: типизированные запросы к [Rick and Morty GraphQL API](https://rickandmortyapi.com/graphql) через Apollo Client, типы генерируются из схемы.

**Демо:** https://auswuchs.github.io/rick-and-morty-catalog/

![Каталог персонажей](docs/screenshot.jpg)

## Стек

- **React 19**, TypeScript (strict), Vite, React Router 8
- **GraphQL:** Apollo Client 4, GraphQL Code Generator
- CSS Modules без UI-кита
- Vitest и Testing Library
- ESLint (Stylistic) и Stylelint

## Структура

Код разложен по вертикальным модулям: всё, что относится к домену, лежит в одной папке.

```
src/
├── modules/
│   ├── characters/   graphql/, components/, hooks/, services/, types.ts
│   └── favorites/    graphql/, components/, hooks/, services/
├── pages/            тонкие страницы, без бизнес-логики
├── components/       ui/ (не знают про домен) и app/ (шапка)
├── hooks/            общие хуки: usePageParam, useDebouncedCallback
├── app/              роутинг, Layout, провайдеры
├── api/              Apollo-клиент
└── gql/              сгенерированные типы
```

Поток данных для каталога: URL, затем хук `useCharactersView`, затем запрос Apollo, затем маппер, затем компоненты.
