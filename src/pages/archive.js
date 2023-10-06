import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Archive.module.css'


export default function Archive() {
  return (
    <>
      <Head>
          <title>███hi██</title>
      </Head>

      <h1 className={styles.title}>Archive</h1>
      <div className={styles.text}>&quot;How did you get here?&quot;</div>
      <Image src="/dedNiko.png" width={326} height={112} alt="dedNiko"/>
    </>
  )
}