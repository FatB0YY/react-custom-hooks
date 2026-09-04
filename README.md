**English** | [Русский](./README.ru.md)

# React Custom Hooks

A collection of custom React hooks covering the patterns that come up repeatedly in real applications: keeping callbacks stable across renders, subscribing to events without leaks, rate-limiting work, composing refs and observing the DOM.

Each hook lives in its own folder with a `doc.md` explaining the logic and the reasoning behind it, and an `example.tsx` showing it in use.

## Why `useRef` runs through most of these

Most of the hooks here are built on `useRef` rather than state. The distinction matters: updating state schedules a re-render, while a ref holds a mutable value across renders without triggering one.

That makes refs the right tool whenever a value has to stay current but its changes should not, by themselves, cause the component to render again — the latest version of a callback, a previous value kept for comparison, a subscription that must be cleaned up. Reaching for state in these cases produces either unnecessary renders or stale closures.

## The hooks

### Effects and lifecycle

| Hook | What it does |
| --- | --- |
| `useUpdateEffect` | Runs an effect when dependencies change, but skips the first render |
| `useIsMounted` | Reports whether the component is currently mounted |

### Stable values and references

| Hook | What it does |
| --- | --- |
| `useLatest` | Holds the current value of a variable without adding it as an effect dependency or triggering a render |
| `usePrevious` | Returns the value a prop or piece of state held on the previous render |
| `useEvent` | Returns a callback with a stable identity that always invokes the latest version of the function passed to it |
| `useCombinedRef` (`useForkRef`) | Merges several refs into a single callback ref |

### Events

| Hook | What it does |
| --- | --- |
| `useWindowEvent` | Subscribes to a `window` event with cleanup handled for you |
| `useEventListener` | Attaches a listener to the DOM element held in a ref, gated by an `active` flag |
| `useEventListenerCbRef` | Attaches a listener through a callback ref, assigning it directly via the element's `ref` attribute |
| `useOutsideClick` | Detects clicks that land outside a given element |

### Rate limiting

| Hook | What it does |
| --- | --- |
| `useDebounce` | Defers a call until the stream of calls has paused for a given interval |
| `useRafThrottle` | Limits a callback to at most one execution per animation frame, keeping work aligned with the browser's repaint cycle |

### DOM observation

| Hook | What it does |
| --- | --- |
| `useResizeObserver` | Tracks size changes of a DOM element via `ResizeObserver`, wired through a callback ref |

### Debugging

| Hook | What it does |
| --- | --- |
| `useWhyDidUpdate` | Logs which props changed between renders, for tracking down unexpected re-renders |

## Usage

The hooks have no dependencies beyond React. Copy the folder you need into your project, or read `doc.md` and adapt the implementation.

## Stack

React, TypeScript.

## Note

The per-hook `doc.md` files are in Russian.

## Author

Rodion Ramazanov — [GitHub](https://github.com/FatB0YY) · [Telegram](https://t.me/iamrodionn)
