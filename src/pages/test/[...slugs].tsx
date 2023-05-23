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

