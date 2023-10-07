import Image from 'next/image'
import styles from '@/styles/Archive.module.css'

export const metadata = {
  title: '███hi██',
}


export default function Archive() {
  return (
    <body className={styles.archiveBody}>
      <div className="layout">
        <div className="layout-content">

          <h1 className={styles.title}>Archive</h1>
          <div className={styles.text}>&quot;How did you get here?&quot;</div>
          <Image src="/dedNiko.png" width={326} height={112} alt="dedNiko"/>
        
        </div>
      </div>
    </body>
  )
}