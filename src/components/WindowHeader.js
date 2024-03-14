"use client"

import Image from 'next/image'
import styles from '@/styles/WindowHeader.module.css'
import { CloseIcon, MinimizeIcon, RestoreIcon } from './SvgHandler'
import { useEffect, useState } from 'react'

export default function WindowHeader({headerName, selectedIcon, setClose, setMinimize, newHeaderName, removeMinimize, keepMaximize}) {
  const [windowHeaderName, setWindowHeaderName] = useState()
  var displayIconLocation = `icons/${selectedIcon}.svg`

  function handleClose(){
    setClose()
  }

  function handleMinimize(){
    setMinimize()
  }

  useEffect(() => {
    // console.log("old: " + headerName)
    // console.log("new: " + newHeaderName)
    if(!newHeaderName){ setWindowHeaderName(headerName) }
    if(newHeaderName){ setWindowHeaderName(newHeaderName) }
  })

  return ( 
    <div id={styles.header}>
      <Image id={styles.displayIcon} src={displayIconLocation} alt="Icon" width={24} height={24}/>
      
      <h1 className={styles.name}>
        {windowHeaderName}
      </h1>
      
      <div className={styles.systemIcons}>
        {!removeMinimize && <MinimizeIcon className={styles.minimizeIcon} alt="Minimize" width={24} height={24} onClick={handleMinimize}/>}
        {keepMaximize && <RestoreIcon className={styles.maximizeIcon} alt="Close" width={24} height={24}/>}
        <CloseIcon className={styles.closeIcon} alt="Close" width={24} height={24} onClick={handleClose}/>
      </div>
    </div>
  )
}