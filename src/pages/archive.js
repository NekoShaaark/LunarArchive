import Head from 'next/head'
import styles from '../styles/Archive.module.css'


export default function Archive() {
  return (
    <>
      <Head>
          <title>███hi██</title>
      </Head>

      <h1 className={styles.title}>Archive</h1>
      <div className={styles.text}>&quot;How did you get here?&quot;</div>
    </>
  )
}