import Link from 'next/link'
import styles from '@/styles/Home.module.css'

export const metadata = {
  title: 'Error',
}


export default function NotFound() {
  return (
    <body className="not-found">
      <div className="layout">
        <div className="layout-content">
          
          <h1 className={styles.title}>That page does not exist...</h1>
          <p className={styles.title}>Go back to the <Link href="/">Homepage</Link></p>
        
        </div>
      </div>
    </body>
  )
}