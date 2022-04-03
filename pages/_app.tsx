import '../styles/globals.css';
import type {AppProps} from 'next/app';
import Head from 'next/head';

function MyApp({Component, pageProps}: AppProps) {
  return <>
    <Head>
      <title>burt-blog</title>
      <meta name="description" content="burt的个人博客"/>
      <meta name="viewport"
            content="width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no,viewport-fit=cover"/>
      <link rel="icon" href="/favicon.ico"/>
    </Head>
    <Component {...pageProps} />
  </>;
}

export default MyApp;
