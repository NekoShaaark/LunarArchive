import Image from 'next/image'
import styles from '@/styles/WindowHeader.module.css'
import { CloseIcon, MinimizeIcon } from '../SvgHandler'

export default function WindowHeader({headerName, selectedIcon}) {
  var displayIconLocation = `icons/${selectedIcon}.svg`

  return ( 
    <div id={styles.header}>
      <Image id={styles.displayIcon} src={displayIconLocation} alt="Icon" width={24} height={24}/>
      
      <h1 className={styles.name}>
        {headerName}
      </h1>
      
      <div className={styles.systemIcons}>
        <MinimizeIcon id={styles.systemIcon} width={24} alt="Minimize" height={24}/>
        <CloseIcon id={styles.systemIcon} width={24} alt="Close" height={24}/>
      </div>
    </div>
  )
}