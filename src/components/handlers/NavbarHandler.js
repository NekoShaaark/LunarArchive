"use client"
import { useState, useEffect } from "react"


export function NavbarHandler() {
  const [currentTime, setCurrentTime] = useState("Getting Time Data...")
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

  const iconOrderData = {
    archive: '--navbarArchiveOrder',
    logs: '--navbarLogsOrder',
    settings: '--navbarSettingsOrder',
    documents: '--navbarDocumentsOrder',
    portfolio: '--navbarPortfolioOrder',
    imageViewer: '--navbarImageViewerOrder',
    alert: '--navbarAlertOrder',
    textEditor: '--navbarTextEditorOrder'
  }

  const iconStyles = {
    desktopMenu: {
      backgroundColor: '--desktopMenuBackgroundColor',
      selectedColor: '--desktopMenuSelectedColor',
    },
    archive: {
      backgroundColor: '--navbarArchiveBackgroundColor',
      selectedColor: '--navbarArchiveSelectedColor',
    },
    logs: {
      backgroundColor: '--navbarLogsBackgroundColor',
      selectedColor: '--navbarLogsSelectedColor',
    },
    settings: {
      backgroundColor: '--navbarSettingsBackgroundColor',
      selectedColor: '--navbarSettingsSelectedColor',
    },
    documents: {
      backgroundColor: '--navbarDocumentsBackgroundColor',
      selectedColor: '--navbarDocumentsSelectedColor',
    },
    portfolio: {
      backgroundColor: '--navbarPortfolioBackgroundColor',
      selectedColor: '--navbarPortfolioSelectedColor',
    },
    imageViewer: {
      backgroundColor: '--navbarImageViewerBackgroundColor',
      selectedColor: '--navbarImageViewerSelectedColor',
    },
    alert: {
      backgroundColor: '--navbarAlertBackgroundColor',
      selectedColor: '--navbarAlertSelectedColor',
      extraStyles: { '--everythingButAlertBlur': '1px' },
    },
    textEditor: {
      backgroundColor: '--navbarTextEditorBackgroundColor',
      selectedColor: '--navbarTextEditorSelectedColor',
    },
  }

  const navbarBackgroundColors = [
    'desktopMenuBackgroundColor',
    'navbarArchiveBackgroundColor',
    'navbarLogsBackgroundColor',
    'navbarSettingsBackgroundColor',
    'navbarDocumentsBackgroundColor',
    'navbarPortfolioBackgroundColor',
    'navbarImageViewerBackgroundColor',
    'navbarAlertBackgroundColor',
    'navbarTextEditorBackgroundColor'
  ]
  
  const navbarSelectedColors = [
    'desktopMenuSelectedColor',
    'navbarArchiveSelectedColor',
    'navbarLogsSelectedColor',
    'navbarSettingsSelectedColor',
    'navbarDocumentsSelectedColor',
    'navbarPortfolioSelectedColor',
    'navbarImageViewerSelectedColor',
    'navbarAlertSelectedColor',
    'navbarTextEditorSelectedColor'
  ]


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


  //handles the navbar icon order
  const handleNavbarOrder = async () => {
    const iconOpened = navbarIconsOpenArray[navbarIconsOpenArray.length - 1]
    const indexOfIcon = navbarIconsOpenArray.indexOf(iconOpened)

    //sets order of icon on navbar
    const rootStyle = document.documentElement.style
    const cssVariable = iconOrderData[iconOpened]
    if(cssVariable){ rootStyle.setProperty(cssVariable, indexOfIcon) }
  }

  //set navbar colors/styles (for windows that are selected/focused)
  const handleNavbarColors = async (currentSelectedIcon) => {

    //get root style of icons, and get globalColor ":root" style
    //NOTE: rootStyle is the local rootStyle (non-computed), while globalColor (computed) references the actual global variables
    const rootStyle = document.documentElement.style
    var globalColor = getComputedStyle(document.querySelector(':root')).getPropertyValue('--globalColor')

    //set all to false
    navbarBackgroundColors.forEach(property => { rootStyle.setProperty(`--${property}`, '#000') })
    navbarSelectedColors.forEach(property => { rootStyle.setProperty(`--${property}`, globalColor) })
    rootStyle.setProperty('--everythingButAlertBlur', '0px')
    
    //set a specific icon to be active
    let icon = iconStyles[currentSelectedIcon]
    if(icon){
      rootStyle.setProperty(icon.backgroundColor, globalColor)
      rootStyle.setProperty(icon.selectedColor, '#000')
      
      //apply any additional styles (for cases like "alert")
      if(icon.extraStyles){
        Object.entries(icon.extraStyles).forEach(([key, value]) => {
          rootStyle.setProperty(key, value)
        })
      }
    }    
  }

  //time handling (updates every second)
  function updateTime() {
    let date = new Date()
    let amORpm = date.getHours() >= 12 ? "PM" : "AM"

    let newTime = date.toLocaleTimeString('en-US', { hour12:false, hour:"2-digit", minute:"2-digit" })
    setCurrentTime(newTime + ` ${amORpm}`)
  }
  setInterval(updateTime, 1000)


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
    currentTime: currentTime,
    navbarIconsOpen: navbarIconsOpenData,
    navbarIconsArray: navbarIconsOpenArray,

    setNavbarOrder: handleNavbarOrder,
    setNavbarColors: handleNavbarColors,

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