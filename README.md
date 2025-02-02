# React Custom Hooks

## 📌 Описание

Этот репозиторий содержит набор полезных кастомных хуков, которые позволяют писать более чистый и переиспользуемый код в проектах на React. Каждый хук сопровождается подробным описанием логики (doc.md), принципа работы и примерами использования (example.tsx).

## Основные принципы работы

В большинстве хуков используется `useRef` для оптимизации производительности.

## Список хуков

1. `useUpdateEffect` - выполняет эффект только при изменении зависимостей, но не на первом рендере.
2. `useLatest` - позволяет хранить и получать актуальное значение переменной без необходимости обновления состояния или создания зависимости в эффектах.
3. `usePrevious` - позволяет при рендере компонента получить предыдущее значение пропса, либо стейта.
4. `useWhyDidUpdate` - хук для отслеживания изменений в пропсах компонента и вывода их в консоль.
5. `useWindowEvent` - хук помогает безопасно подписываться на события.
6. `useEvent` - Возвращает стабильный колбэк, всегда вызывающий последнюю версию переданной функции.
7. `useIsMounted` - Хук, определяющий, был ли компонент монтирован.
