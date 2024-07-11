import Image from 'next/image'
import styles from '@/styles/Archive.module.css'

// export const metadata = {
//   title: '███hi██',
// }


export default function Archive() {
  return (
    <div className={styles.archiveBody}>
      <Image unoptimized className={styles.image} src="/dedNiko.webp" width={326} height={112} alt="dedNiko"/>
      
      <h1 className={styles.title}>Arc██ve</h1>
      <p className={styles.text}><b>&quot;Ho█ █id ██u get h██e?&quot;</b></p>
      <br/>
      <p className={styles.test}><b>!██!!!██!█MURDERER!███!!██!█</b></p>
    </div>
  )
}