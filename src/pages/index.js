import Head from 'next/head'
import styles from '../styles/Home.module.css'


export default function Home() {
  return (
    <>
      <Head>
          <title>Lunar Archive</title>
      </Head>

      <h1 className={styles.title}>Under Maintenance</h1>
      <div className={styles.text}>Maintenance in progress...</div>
    </>
  )
}