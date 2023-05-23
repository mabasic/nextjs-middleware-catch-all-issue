# Next.js issue with middleware/catch-all/rewrites/getInitialProps when client side navigation occurs

**Must be built with `npm run build` and started with `npm run start` for the issue to appear. It works in development mode with `npm run dev`.**

## Reproduction steps

`next.config.js`:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/:nodeSlugs*/test2',
        destination: '/test/:nodeSlugs*?slug=test2',
      },
    ]
  }
}

module.exports = nextConfig
```

Existence of `middleware.ts` file. Can be an empty file to reproduce the issue.

`src/middleware.ts`:

```ts
export function middleware() {
}
 
```

Catch-all page route eg. `src/pages/test/[...slugs].js`.

Must have `getInitialProps` for this issue to appear. It works when server rendering, but does not work on client side navigation.

`src/pages/test/[...slugs].js`:

```tsx
import Link from 'next/link';
import { NextPageContext } from 'next';

export default function Test() {
	return (
		<p>
			<Link href="/something1/test2">something1/test2</Link> -
			<Link href="/something2/test2">something2/test2</Link>
		</p>
	)
}

Test.getInitialProps = async (ctx: NextPageContext) => {
	console.log({query: ctx.query})
  return { test: 'works' };
};
```

## Issue

Open the browser on `http://localhost:3000/something1/test2`, and click on the link "something2/test2".

If you check the console log (in the browser) after a client side navigation event, you will not see `slugs`, but only `slug`. On server rendering this works properly. You get both `slugs` and `slug` in the console.

## Solution

There are two solutions:
1. you can remove one of: rewrite rule, middleware file, getInitialProps, or stop using catch-all
2. explicitly pass catch-all variable `slugs` to the page params (see example bellow)

Example: `next.config.js`:

```js
/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  async rewrites() {
    return [
      {
        source: '/:nodeSlugs*/test2',
        destination: '/test/:nodeSlugs*?slug=test2?slugs=:nodeSlugs*',
      },
    ]
  }
}

module.exports = nextConfig
```
