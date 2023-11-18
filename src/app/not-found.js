import Link from 'next/link'
import styles from '@/styles/Home.module.css'

export const metadata = {
  title: 'Error',
}


export default function NotFound() {
  return (
    <>
      <div className="not-found">
        <div className="layout">
          <div className="layout-content">

            <h1 className={styles.title}>That page does █ot exi██...</h1>
            <p className={styles.text}>Go back to the <Link href="/">Home█age</Link></p>

          </div>
        </div>
      </div>
    </>
  )
}