"use client"
import { useState, useEffect } from "react"


export function NavbarHandler() {
  const [navbarIconsOpenArray, setNavbarIconsOpenArray] = useState([])
  const [navbarIconsOpenData, setNavbarIconsOpenData] = useState({
    none: true,
    desktopMenu: false,
    archive: false,
    logs: false,
    settings: false,
    documents: false,
    portfolio: false,
    imageViewer: false,
    alert: false,
    textEditor: false
  })


  //updates navbarIconsOpenArray based on which navbarIcons are open
  useEffect(() => {
    setNavbarIconsOpenArray((prevNavbarIconsOpenArray) => {
      const newTrueKeys = Object.keys(navbarIconsOpenData)
        .filter((key) => navbarIconsOpenData[key]) //keys that are true
          
      //preserve existing order and append new keys at the end
      const updatedKeys = [...prevNavbarIconsOpenArray]
      newTrueKeys.forEach((key) => {
        if(!updatedKeys.includes(key)) {
          updatedKeys.push(key)
        }
      })
    
      //filter out keys that are no longer true
      let finalKeys = updatedKeys.filter((key) => newTrueKeys.includes(key))
      return finalKeys
    })
  }, [navbarIconsOpenData])


  //navbarIcon open handling
  const handleDesktopMenuIconOpen = async (e) => { setNavbarIconsOpenData({ ...navbarIconsOpenData, desktopMenu: e }) }
  const handleArchiveIconOpen = async (e) => { setNavbarIconsOpenData({ ...navbarIconsOpenData, archive: e }) }
  const handleLogsIconOpen = async (e) => { setNavbarIconsOpenData({ ...navbarIconsOpenData, logs: e }) }
  const handleSettingsIconOpen = async (e) => { setNavbarIconsOpenData({ ...navbarIconsOpenData, settings: e }) }
  const handleDocumentsIconOpen = async (e) => { setNavbarIconsOpenData({ ...navbarIconsOpenData, documents: e }) }
  const handlePortfolioIconOpen = async (e) => { setNavbarIconsOpenData({ ...navbarIconsOpenData, portfolio: e }) }
  const handleImageViewerIconOpen = async (e) => { setNavbarIconsOpenData({ ...navbarIconsOpenData, imageViewer: e }) }
  const handleAlertIconOpen = async (e) => { setNavbarIconsOpenData({ ...navbarIconsOpenData, alert: e }) }
  const handleTextEditorIconOpen = async (e) => { setNavbarIconsOpenData({ ...navbarIconsOpenData, textEditor: e }) }



  //navbar handling properties export object
  const handlingProps = {
    navbarIconsOpen: navbarIconsOpenData,
    navbarIconsArray: navbarIconsOpenArray,

    desktopMenu: { handleOpen: handleDesktopMenuIconOpen },
    archive: { handleOpen: handleArchiveIconOpen },
    logs: { handleOpen: handleLogsIconOpen },
    settings: { handleOpen: handleSettingsIconOpen },
    documents: { handleOpen: handleDocumentsIconOpen },
    portfolio: { handleOpen: handlePortfolioIconOpen },
    imageViewer: { handleOpen: handleImageViewerIconOpen },
    alert: { handleOpen: handleAlertIconOpen },
    textEditor: { handleOpen: handleTextEditorIconOpen }
  }

  return handlingProps
}