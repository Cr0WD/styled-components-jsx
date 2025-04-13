# 🎨 styled-components-jsx

[![package version](https://img.shields.io/npm/v/styled-components-jsx.svg?style=flat-square)](https://www.npmjs.com/package/styled-components-jsx)
[![package downloads](https://img.shields.io/npm/dm/styled-components-jsx.svg?style=flat-square)](https://www.npmjs.com/package/styled-components-jsx)
[![package license](https://img.shields.io/npm/l/styled-components-jsx.svg?style=flat-square)](https://www.npmjs.com/package/styled-components-jsx)


Write styles like [`styled-components`](https://www.npmjs.com/package/styled-components), powered by [`styled-jsx`](https://www.npmjs.com/package/styled-jsx) under the hood.

If you love the simplicity and performance of `styled-jsx` but prefer the ergonomic syntax of `styled-components`, this library gives you the best of both worlds.

---

## 🚀 Installation
> ⚠️ Requires [`styled-jsx`](https://www.npmjs.com/package/styled-jsx) to be installed and configured in your app.


With **Yarn**:
```bash
yarn add styled-components-jsx
```

With **npm**:
```bash
npm install styled-components-jsx
```


---

## ✨ Basic Usage

```tsx
import styled from 'styled-components-jsx'

const Button = styled.button`
  background: dodgerblue;
  color: white;
  border: none;
  padding: 12px 20px;
  border-radius: 8px;
  cursor: pointer;

  &:hover {
    background: deepskyblue;
  }
`

const Title = styled.h1`
  font-size: 2rem;
  color: hotpink;
`

export default function App() {
  return (
    <>
      <Title>Hello</Title>
      <Button>Click me</Button>
    </>
  )
}
```

---

## 🧠 How It Works

This library wraps your styles using `styled-jsx`, giving you:

- Full CSS scoping via `styled-jsx`
- `styled-components`-like API
- Optional interpolations like `${props => props.color}`
- Support for both DOM elements and custom React components
- Automatic prop filtering (`$`-prefixed props are stripped from DOM)


---

## 🛠 Configuration

For full setup (e.g., Babel, SSR, Next.js), refer to the [`styled-jsx` documentation](https://github.com/vercel/styled-jsx).

This library builds on top of `styled-jsx` and inherits all of its capabilities.

---

## 🎨 About the `.🎨` class Prefix

`styled-jsx` does not generate any CSS if there are no selectors in the final output.  
In other words, if your component's styles contain **only raw properties** (without a selector), the CSS will silently be ignored.

To work around this, we **always prefix styles with a dummy class**, and we chose `🎨` as a fun and recognizable default.

For example, this:

```tsx
const Container = styled.div`
  max-width: 960px;
  margin: 0 auto;
`
```

Will render internally like this:

```html
<style id="__jsx-3515400890">
  .🎨.jsx-3515400890 {
    max-width: 960px;
    margin: 0 auto;
  }
</style>
```

### Why `.🎨`?

- It ensures your styles are always emitted correctly
- It’s unique enough to avoid collisions
- And hey, it looks kinda nice in DevTools too 😎

---

## 🧩 Interpolations

Inject values with functions that receive props:

```tsx
const Alert = styled.div`
  color: ${props => (props.$error ? 'red' : 'green')};
`
```

Props prefixed with `$` are automatically excluded from the rendered DOM.

---

## 🧪 Custom Components

```tsx
const Card = ({ className }: { className?: string }) => (
  <div className={className}>Styled Card</div>
)

const StyledCard = styled(Card)`
  padding: 24px;
  border-radius: 12px;
  background: red;
`
```

---

## 🧼 Automatic Minification

All styles are **automatically minified** before being passed to `styled-jsx`.

This includes:

- 🧹 Stripping all comments (`/* */` and `//`)
- 🧱 Removing extra whitespace and newlines
- 🧵 Trimming spaces around symbols like `:`, `{}`, `;`, etc.
- ❌ Eliminating redundant `;` before closing braces

### Example

This:

```tsx
const Box = styled('div')`
  // This is a comment
  padding: 16px ;  
  margin: 0 auto   ;
`
```

Turns into:

```css
.🎨.jsx-123456 {padding:16px;margin:0 auto;}
```

> The minifier is lightweight and built-in — no extra setup required.

Under the hood, it's powered by a custom function that processes all styles similarly to how LESS/CSS preprocessors do it, but focused purely on cleanup and safe compression.


---

## 💻 TypeScript Support

- Fully typed components and props
- Autocomplete for tag names and styles
- Works seamlessly with React 18+

---

## 📦 Designed for React

Supports React 18 and 19, and integrates smoothly into any React-based project or framework (including Next.js).

---

## 💡 Why This Exists

`styled-jsx` is powerful, but its tagged template syntax isn’t always ergonomic.  
This package brings the comfort and beauty of `styled-components` to the world of `styled-jsx`.

**You get the best of both worlds — now with a splash of color. 🎨**

---

## 🙏 Thanks & Credits

A **huge thank you** to the creators and contributors of:

- [`styled-jsx`](https://github.com/vercel/styled-jsx) – for pioneering scoped CSS in React and enabling this project’s core functionality
- [`styled-components`](https://github.com/styled-components/styled-components) – for inspiring the expressive and elegant developer experience this library builds on

This library wouldn't exist without the incredible work done by these communities.  

If you use and enjoy [`styled-components-jsx`](https://www.npmjs.com/package/styled-components-jsx), consider supporting and starring the original projects too — they made all of this possible.

---

## 📄 License

MIT © [Cr0WD](https://github.com/Cr0WD)
