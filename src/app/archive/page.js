import styles from './page.module.css'
export const metadata = {
  title: '███hi██',
}


export default function Archive() {
  return (
    <>
      <body className={styles.bodyArchive}>
        <h1 className={styles.title}>Archive</h1>
        <div className={styles.text}>&quot;How did you get here?&quot;</div>
      </body>
    </>
  )
}
