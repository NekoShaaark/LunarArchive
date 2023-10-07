import styles from '@/styles/Home.module.css'

export const metadata = {
  title: 'Lunar Archive',
}


export default function Home() {
  return (
    <body className={styles.homeBody}>
      <div className="layout">
        <div className="layout-content">

          <h1 className={styles.title}>Under Maintenance</h1>
          <div className={styles.text}>Maintenance in progress...</div>
        
        </div>
      </div>
    </body>
  )
}