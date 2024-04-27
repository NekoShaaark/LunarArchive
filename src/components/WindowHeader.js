"use client"

import styles from '@/styles/WindowHeader.module.css'
import { AlertIcon, ArchiveIcon, CloseIcon, FolderIcon, ImageViewerIcon, LogsIcon, MaximizeIcon, MinimizeIcon, MoonStarIcon, NoteIcon, 
  PortfolioIcon, RestoreIcon } from './SvgHandler'
import { useEffect, useState } from 'react'

export default function WindowHeader({headerName, selectedIcon, setClose, setMinimize, setMaximize, newHeaderName, removeMinimize, keepMaximize, maximized}) {
  const [windowHeaderName, setWindowHeaderName] = useState()
  const [haveMaximize, setHaveMaximize] = useState(false)

  function handleClose(){
    setClose()
  }

  function handleMinimize(){
    setMinimize()
  }

  function handleMaximize(){
    setMaximize()
  }

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
      { selectedIcon == "alertIcon" && <AlertIcon id={styles.displayIcon} width={24} height={24}/> }
      { selectedIcon == "archiveIcon" && <ArchiveIcon id={styles.displayIcon} width={24} height={24}/> }
      { selectedIcon == "folderIcon" && <FolderIcon id={styles.displayIcon} width={24} height={24}/> }
      { selectedIcon == "imageViewerIcon" && <ImageViewerIcon id={styles.displayIcon} width={24} height={24}/> }
      { selectedIcon == "logsIcon" && <LogsIcon id={styles.displayIcon} width={24} height={24}/> }
      { selectedIcon == "moonStarIcon" && <MoonStarIcon id={styles.displayIcon} width={24} height={24}/> }
      { selectedIcon == "noteIcon" && <NoteIcon id={styles.displayIcon} width={24} height={24}/> }
      { selectedIcon == "portfolioIcon" && <PortfolioIcon id={styles.displayIcon} width={24} height={24}/> }
      
      <h1 className={styles.name}>
        {windowHeaderName}
      </h1>
      
      <div className={styles.systemIcons}>
        {!removeMinimize && <MinimizeIcon className={styles.minimizeIcon} alt="Minimize" width={24} height={24} onClick={handleMinimize}/>}
        {(haveMaximize && !maximized) && <MaximizeIcon className={styles.maximizeIcon} alt="Maximize" width={24} height={24} onClick={handleMaximize}/>}
        {(haveMaximize && maximized) && <RestoreIcon className={styles.maximizeIcon} alt="Restore" width={24} height={24} onClick={handleMaximize}/>}
        <CloseIcon className={styles.closeIcon} alt="Close" width={24} height={24} onClick={handleClose}/>
      </div>
    </div>
  )
}