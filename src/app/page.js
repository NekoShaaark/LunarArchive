import styles from './page.module.css'


export default function Home() {
  return (
    <>
      <body className={styles.bodyHome}>
        <h1 className={styles.title}>Under Maintenance</h1>
        <div className={styles.text}>Maintenance in progress...</div>

        <div className={styles.triangle}></div>
      </body>
    </>
  )
}