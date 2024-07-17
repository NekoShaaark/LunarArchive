"use client"

import styles from '@/styles/WindowHeader.module.css'
import { CloseIcon, MaximizeIcon, MinimizeIcon, RestoreIcon } from './SvgHandler'
import { useEffect, useState } from 'react'

export default function WindowHeader({ 
  headerName, 
  Icon, 
  setClose, 
  setMinimize, 
  setMaximize, 
  newHeaderName, 
  removeMinimize, 
  keepMaximize, 
  maximized
}) {

  const [windowHeaderName, setWindowHeaderName] = useState()
  const [haveMaximize, setHaveMaximize] = useState(false)  

  useEffect(() => {
    // console.log("old: " + headerName)
    // console.log("new: " + newHeaderName)
    if(!newHeaderName){ setWindowHeaderName(headerName) }
    if(newHeaderName){ setWindowHeaderName(newHeaderName) }
    
    if(window.screen.width < 768 && keepMaximize || !keepMaximize){ setHaveMaximize(false) }
    else{ setHaveMaximize(true) }
  })

  return ( 
    <div id={styles.header}>
      <Icon id={styles.displayIcon} width={24} height={24}/>
      
      <h1 className={styles.name}>
        {windowHeaderName}
      </h1>
      
      <div className={styles.systemIcons}>
        {!removeMinimize && <MinimizeIcon className={styles.minimizeIcon} alt="Minimize" width={24} height={24} onClick={setMinimize}/>}
        {(haveMaximize && !maximized) && <MaximizeIcon className={styles.maximizeIcon} alt="Maximize" width={24} height={24} onClick={setMaximize}/>}
        {(haveMaximize && maximized) && <RestoreIcon className={styles.maximizeIcon} alt="Restore" width={24} height={24} onClick={setMaximize}/>}
        <CloseIcon className={styles.closeIcon} alt="Close" width={24} height={24} onClick={setClose}/>
      </div>
    </div>
  )
}