import Image from 'next/image'
import styles from '@/styles/WindowHeader.module.css'
import { CloseIcon, MinimizeIcon } from './SvgHandler'

export default function WindowHeader({headerName, selectedIcon, setClose, setMinimize}) {
  var displayIconLocation = `icons/${selectedIcon}.svg`

  function handleClose(){
    setClose()
  }

  function handleMinimize(){
    setMinimize()
  }

  return ( 
    <div id={styles.header}>
      <Image id={styles.displayIcon} src={displayIconLocation} alt="Icon" width={24} height={24}/>
      
      <h1 className={styles.name}>
        {headerName}
      </h1>
      
      <div className={styles.systemIcons}>
        <MinimizeIcon className={styles.minimizeIcon} alt="Minimize" width={24} height={24} onClick={handleMinimize}/>
        <CloseIcon className={styles.closeIcon} alt="Close" width={24} height={24} onClick={handleClose}/>
      </div>
    </div>
  )
}