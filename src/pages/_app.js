import Head from 'next/head'
import Layout from '../components/layout'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico"/>
        
        <meta name="title" content="Lunar Archive"/>
        <meta name="description" content="Lunar Archive Project"/>
      </Head>


      <Layout>
        <Component {...pageProps} />
      </Layout>
    </>
  )
}

export default MyApp