import Image from 'next/image'
import styles from '@/styles/Archive.module.css'

export const metadata = {
  title: '███hi██',
}


export default function Archive() {
  return (
    <>
      <h1 className={styles.title}>Arc██ve</h1>
      <p className={styles.text}>&quot;Ho█ █id ██u get h██e?&quot;</p>
      
      <Image src="/dedNiko.png" width={326} height={112} alt="dedNiko"/>
    </>
  )
}