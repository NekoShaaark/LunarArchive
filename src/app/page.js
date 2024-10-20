"use client"

import { useEffect, useState } from 'react'
import { AlertIcon, ArchiveIcon, FolderIcon, ImageIcon, ImageViewerIcon, ImagesIcon, LogsIcon, NoteIcon, PortfolioIcon, MoonStarIcon, MoonIcon } from '@/components/SvgHandler'
import { Button } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { motion, useAnimate, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

import Archive from '@/app/archive/page'
import Logs from '@/app/logs/page'
import Settings from '@/app/settings/page'
import Documents from '@/app/documents/page'
import Portfolio from '@/app/portfolio/page'
import ImageHandler from '@/components/ImageHandler'
import AlertDialogue from '@/components/AlertDialogue'
import TextEditor from '@/components/TextEditor'
import Login from '@/app/login/page'
import { DesktopIconButton, MenuIconButton, NavbarIconButton } from '@/components/handlers/DesktopCreator'
import WindowCreator from '@/components/handlers/WindowsCreator'
import TypewriterEffect from '@/components/TypewriterEffect'

import { WindowsHandler } from '@/components/os-windows/WindowsHandler'



export default function Home() {

  //--VARIABLE & STATES--//

  //date and time variables, handling and state
  const [currentTime, setCurrentTime] = useState("Getting Time Data...")

  //window animation states
  const [archiveWindowAnimation, archiveAnimate] = useAnimate()
  const [logsWindowAnimation, logsAnimate] = useAnimate()
  const [settingsWindowAnimation, settingsAnimate] = useAnimate()
  const [documentsWindowAnimation, documentsAnimate] = useAnimate()
  const [portfolioWindowAnimation, portfolioAnimate] = useAnimate()
  const [imageViewerWindowAnimation, imageViewerAnimate] = useAnimate()
  const [textEditorWindowAnimation, textEditorAnimate] = useAnimate()
  const [desktopMenuAnimation, desktopMenuAnimate] = useAnimate()

  //desktop settings states
  const [selectedWallpaper, setSelectedWallpaper] = useState("Starry")
  const [selectedTheme, setSelectedTheme] = useState("Purple")
  const [currentArrayIndex, setCurrentArrayIndex] = useState(0)
  const [brightnessValue, setBrightnessValue] = useState(100)
  
  //window open states
  const windowsHandler = WindowsHandler()
  const windowsOpen = windowsHandler.windowsOpen
  const windowsOpenHandler = {
    desktopMenu: windowsHandler.onHandleDesktopMenu,
    archive: windowsHandler.onHandleArchiveWindowOpen,
    logs: windowsHandler.onHandleLogsWindowOpen,
    settings: windowsHandler.onHandleSettingsWindowOpen,
    documents: windowsHandler.onHandleDocumentsWindow,
    portfolio: windowsHandler.onHandlePortfolioWindowOpen,
    imageViewer: windowsHandler.onHandleImageViewerWindowOpen,
    alert: windowsHandler.onHandleAlertWindowOpen,
    textEditor: windowsHandler.onHandleTextEditorWindowOpen
  }

  //window minimized states
  const windowsMinimized = windowsHandler.windowsMinimized
  const windowsMinimizedHandler = {
    archive: windowsHandler.onHandleArchiveWindowMinimize,
    logs: windowsHandler.onHandleLogsWindowMinimize,
    settings: windowsHandler.onHandleSettingsWindowMinimize,
    documents: windowsHandler.onHandleDocumentsWindowMinimize,
    portfolio: windowsHandler.onHandlePortfolioWindowMinimize,
    imageViewer: windowsHandler.onHandleImageViewerWindowMinimize,
    textEditor: windowsHandler.onHandleTextEditorWindowMinimize
  }

  //window maximized states
  const [windowsMaximized, setWindowsMaximized] = useState({
    imageViewer: false
  })

  //desktop menu open states
  const [sideMenusOpen, setSideMenusOpen] = useState({
    lunarEclipse: false,
    nakoProjects: false,
    userInfo: true
  })

  //other states
  const [currentFocusedWindow, setCurrentFocusedWindow] = useState("none")
  const [changeFocusedWindow, setChangeFocusedWindow] = useState(false)
  const [currentWindowsOpen, setCurrentWindowsOpen] = useState(["none"])
  const [currentNavbarIconsOpen, setCurrentNavbarIconsOpen] = useState(["none"])
  const [currentSideMenuOpen, setCurrentSideMenuOpen] = useState("User Info")
  const [windowHeaderName, setWindowHeaderName] = useState()
  const [alertDescription, setAlertDescription] = useState()
  const [documentsDirToOpen, setDocumentsDirToOpen] = useState("Documents")
  const [denyAccess, setDenyAccess] = useState(true)
  const [loginOpen, setLoginOpen] = useState(false)
  const [desktopMenuOpen, setDesktopMenuOpen] = useState(false)
  const [desktopSideMenuContent, setDesktopSideMenuContent] = useState(
    <span>
      profile picture<br/>
      username<br/>
      more info<br/>
    </span>
  )
  const [desktopSideMenuFooter, setDesktopSideMenuFooter] = useState("v0.3.5")


  //image viewer (ivy) states
  const [currentIvyImage, setCurrentIvyImage] = useState()
  const [ivyImageWidth, setIvyImageWidth] = useState()
  const [ivyImageHeight, setIvyImageHeight] = useState()
  const [ivyImageDescription, setIvyImageDescription] = useState()
  const [ivyImageHeaderName, setIvyImageHeaderName] = useState("Image Viewer")
  const [ivyArrayIndex, setIvyArrayIndex] = useState()
  const [ivyHandlers, setIvyHandlers] = useState({
    setIvyImage: null,
    setIvyImageWidth: null,
    setIvyImageHeight: null,
    setIvyImageDescription: null,
    setIvyImageHeaderName: null,
    setIvyImageArrayIndex: null
  })

  //text editor (notus) states
  const [currentNotusText, setCurrentNotusText] = useState()
  const [notusHeaderName, setNotusHeaderName] = useState("Text Editor")
  const [currentNotusFile, setCurrentNotusFile] = useState("Text Editor")
  const [notusHandlers, setNotusHandlers] = useState({
    setNotusHeaderName: null,
    setNotusText: null,
    setNotusFile: null
  })


  //--DESKTOP SETTINGS HANDLING--//
  const handleSelectedWallpaper = async (e) => {
    if(!e){ console.log("woahhhhhh selectedWallpaper undefined"); return }
    // console.log("currentWallpaper: " + selectedWallpaper)
    // console.log("passingWallpaper: " + e)
    setSelectedWallpaper(e)
  }

  const handleSelectedTheme = async (e) => {
    if(!e){ console.log("woahhhhhh selectedTheme undefined"); return }
    // console.log("currentTheme: " + selectedTheme)
    // console.log("passingTheme: " + e)
    setSelectedTheme(e)
  }

  const handleCurrentArrayIndex = async (e) => {
    if(!e){ console.log("woahhhhhh currentArrayIndex undefined"); e = 0 }
    // console.log("currentArrayIndex: " + currentArrayIndex)
    // console.log("passingArrayIndex: " + e)
    setCurrentArrayIndex(e)
  }

  const handleBrightnessValue = async (e) => {
    if(!e){ console.log("woahhhhhh brightnessValue undefined"); e = 0 }
    // console.log("currentBrightness: " + brightnessValue)
    // console.log("passingBrightness: " + e)
    setBrightnessValue(e)
  }


  //--IMAGE VIEWER HANDLING--//
  const handleIvyImage = async (e) => {
    if(!e){ console.log("woahhhhhh ivyImage undefined"); return }
    // console.log("currentIvy: " + currentIvyImage)
    // console.log("passingIvy: " + e)
    setCurrentIvyImage(e)
  }

  const handleIvyImageWidth = async (e) => {
    if(!e){ console.log("woahhhhhh ivyImageWidth undefined"); return }
    // console.log("currentIvyWidth: " + ivyImageWidth)
    // console.log("passingIvyWidth: " + e)
    setIvyImageWidth(e)
  }

  const handleIvyImageHeight = async (e) => {
    if(!e){ console.log("woahhhhhh ivyImageHeight undefined"); return }
    // console.log("currentIvyHeight: " + ivyImageHeight)
    // console.log("passingIvyHeight: " + e)
    setIvyImageHeight(e)
  }

  const handleIvyImageDescription = async (e) => {
    if(!e){ console.log("woahhhhhh ivyImageDescription undefined"); return }
    // console.log("currentIvyDescription: " + ivyImageDescription)
    // console.log("passingIvyDescription: " + e)
    setIvyImageDescription(e)
  }

  const handleIvyHeaderName = async (e) => {
    if(!e){ console.log("woahhhhhh ivyImageHeaderName undefined"); return }
    // console.log("currentIvyHeaderName: " + ivyImageHeaderName)
    // console.log("passingIvyHeaderName: " + e)
    setIvyImageHeaderName(e)
  }

  const handleIvyArrayIndex = async (e) => {
    if(!e){ console.log("woahhhhhh ivyArrayIndex undefined"); e = 0 }
    // console.log("currentIvyArrayIndex: " + ivyArrayIndex)
    // console.log("passingIvyArrayIndex: " + e)
    setIvyArrayIndex(e)
  }


  //--TEXT EDITOR HANDLING--//
  const handleNotusText = async (e) => {
    if(!e){ console.log("wahhhhhhhh notusText undefined"); return }
    // console.log("currentNotus: " + currentNotusText)
    // console.log("passingNotus: " + e)
    setCurrentNotusText(e)
  }

  const handleNotusHeaderName = async (e) => {
    if(!e){ console.log("woahhhhhh notusHeaderName undefined"); return }
    // console.log("currentNotusHeaderName: " + notusHeaderName)
    // console.log("passingNotusHeaderName: " + e)
    setNotusHeaderName(e)
  }

  const handleCurrentNotusFile = async (e) => {
    if(!e){ console.log("woahhhhhh notusCurrentFile undefined"); return }
    // console.log("currentNotusCurrentFile: " + notusCurrentFile)
    // console.log("passingNotusCurrentFile: " + e)
    setCurrentNotusFile(e)
  }


  //--WINDOW HEADER HANDLING--//
  const handleWindowHeaderName = async (e) => {
    // console.log("window: " + e)
    setWindowHeaderName(e)
  }

  //--ALERT DESCRIPTION HANDLING--//
  const handleAlertDescription = async (e) => {
    // console.log("alertDescription: " + e)
    setAlertDescription(e)
  }

  //--DOCUMENTS OPENING HANDLING--//
  const handleDocumentsDirToOpen = async (e) => {
    if(!e){ console.log("woahhhhhh documentsDirToOpen undefined"); return }
    console.log("documentsDirToOpen: " + e)
    setDocumentsDirToOpen(e)
  }

  //--LOGIN OPENING HANDLING--//
  const handleLoginOpen = async (e) => {
    // if(!e){ console.log("woahhhhhh loginOpen undefined"); return }
    console.log("opening/closing login")
    setLoginOpen(e)
  }

  //--DESKTOP MENU OPENING HANDLING--//
  const handleDesktopMenuOpen = async (e) => {
    // if(!e){ console.log("woahhhhhh desktopMenuOpen undefined"); return }
    // console.log("opening/closing desktopMenu")
    if(windowsOpen.alert){ return }

    //handle opening/closing of desktopMenu
    if(e){ 
      setCurrentFocusedWindow("desktopMenu")
      setCurrentWindowsOpen(prevWindows => [...prevWindows, "desktopMenu"]) //add "desktopMenu" to the array
      setCurrentNavbarIconsOpen(prevWindows => [...prevWindows, "desktopMenu"])
    }
    else{ 
      setChangeFocusedWindow(true)
      setCurrentWindowsOpen(currentWindowsOpen.filter(a => a !== "desktopMenu")) //remove "desktopMenu" from the array
      setCurrentNavbarIconsOpen(currentNavbarIconsOpen.filter(a => a !== "desktopMenu"))
    }

    //open/close desktopMenu
    windowsOpenHandler.desktopMenu(e)
    setDesktopMenuOpen(e)
  }

  //--DESKTOP SIDE MENU OPENING HANDLING--//
  const handleSideMenuOpen = async (menuOpen, menuName) => {
    // if(!e){ console.log("woahhhhhh sideMenuOpen undefined"); return }
    console.log("opening/closing sideMenu")
    if(windowsOpen.alert || sideMenusOpen[menuOpen]){ return }

    //close all menus (and closing animation)
    setCurrentSideMenuOpen(menuName)
    await menuAnimation("sideMenuClose")
    closeAllSideMenus()
    
    //open new menu
    setSideMenusOpen(prevState => ({ ...prevState, [menuOpen]: true }))
    switch(menuOpen){
      case "lunarEclipse":
        setDesktopSideMenuContent(
          <span>
            genshin events<br/>
            date and time<br/>
          </span>
        )
        setDesktopSideMenuFooter("v0.3.5")
        break
      
      case "nakoProjects":
        setDesktopSideMenuContent(
          <span>
            museum project<br/>
            ████████<br/>
            lunar archive<br/>
            kom█ni█a █xperi██nt<br/>
            evi1 n3ko l0g<br/>
          </span>
        )
        setDesktopSideMenuFooter(`"I see you."`)
        break

      case "userInfo":
        setDesktopSideMenuContent(
          <span>
            profile picture<br/>
            username<br/>
            more info<br/>
          </span>
        )
        setDesktopSideMenuFooter("v0.3.5")
        break
    }

    //(and opening animation)
    menuAnimation("sideMenuOpen")
  }

  //--DESKTOP SIDE MENU CLOSING HANDLING--//
  const closeAllSideMenus = async (e) => {
    const updatedState = Object.keys(sideMenusOpen).reduce((acc, key) => {
      acc[key] = false
      return acc
    }, {})
    
    setSideMenusOpen(updatedState)
  }


  //--MINIMIZE ANIMATIONS--//
  const dropWindowAnimation = async (animationItem) => {
    switch(animationItem){
      case "archive":
        await archiveAnimate(archiveWindowAnimation.current, { y: "250%" }, { duration: 0.6, delay: 0.12 })
        break

      case "logs":
        await logsAnimate(logsWindowAnimation.current, { y: "150%" }, { duration: 0.6, delay: 0.12 })
        break

      case "settings":
        await settingsAnimate(settingsWindowAnimation.current, { y: "350%" }, { duration: 0.6, delay: 0.12 })
        break

      case "documents":
        await documentsAnimate(documentsWindowAnimation.current, { y: "350%" }, { duration: 0.6, delay: 0.12 })
        break

      case "portfolio":
        await portfolioAnimate(portfolioWindowAnimation.current, { y: "350%" }, { duration: 0.6, delay: 0.12 })
        break

      case "imageViewer":
        await imageViewerAnimate(imageViewerWindowAnimation.current, { y: "350%" }, { duration: 0.6, delay: 0.12 })
        break

      case "textEditor":
        await textEditorAnimate(textEditorWindowAnimation.current, { y: "650%" }, { duration: 0.6, delay: 0.12 })
        break
    }
  }

  const pullUpWindowAnimation = async (animationItem) => {
    switch(animationItem){
      case "archive":
        await archiveAnimate(archiveWindowAnimation.current, { y: 0 }, { duration: 0.4 })
        break

      case "logs":
        await logsAnimate(logsWindowAnimation.current, { y: 0 }, { duration: 0.4 })
        break

      case "settings":
        await settingsAnimate(settingsWindowAnimation.current, { y: 0 }, { duration: 0.4 })
        break

      case "documents":
        await documentsAnimate(documentsWindowAnimation.current, { y: 0 }, { duration: 0.4 })
        break

      case "portfolio":
        await portfolioAnimate(portfolioWindowAnimation.current, { y: 0 }, { duration: 0.4 })
        break

      case "imageViewer":
        await imageViewerAnimate(imageViewerWindowAnimation.current, { y: 0 }, { duration: 0.4 })
        break

      case "textEditor":
        await textEditorAnimate(textEditorWindowAnimation.current, { y: 0 }, { duration: 0.4 })
        break
    }
  }


  //--MAXIMIZE ANIMATIONS--//
  //TODO: add maximize animations
  const enlargeWindowAnimation = async (animationItem) => {
    switch(animationItem){
      case "imageViewer":
        // await imageViewerAnimate(imageViewerWindowAnimation.current, { x: 100 }, { duration: 2.6, delay: 0 })
        break
    }
  }
  const shrinkWindowAnimation = async (animationItem) => {
    switch(animationItem){
      case "imageViewer":
        // await imageViewerAnimate(imageViewerWindowAnimation.current, { y: "250%" }, { duration: 0.6, delay: 0.12 })
        break
    }
  }


  //--DESKTOP MENU ANIMATIONS--//
  const menuAnimation = async (e) => {
    if(!desktopMenuAnimation.current){ return }

    if(e == "sideMenuClose"){
      await desktopMenuAnimate(desktopMenuAnimation.current, { x: -240 }, { duration: 0.4, delay: 0 })
      desktopMenuAnimate(desktopMenuAnimation.current, { x: -240 }, { duration: 0.0, delay: 0 })
      return
    }

    if(e == "sideMenuOpen"){
      desktopMenuAnimate(desktopMenuAnimation.current, { x: 0 }, { duration: 0.4, delay: 0.2 })
      return
    }

    if(desktopMenuOpen){
      await desktopMenuAnimate(desktopMenuAnimation.current, { x: -240, y: 18, opacity: 0 }, { duration: 0.0, delay: 0 })
      desktopMenuAnimate(desktopMenuAnimation.current, { x: 0, opacity: 1 }, { duration: 0.6, delay: 0.2 })
    }
    else{
      desktopMenuAnimate(desktopMenuAnimation.current, { x: -120 }, { duration: 0.6, delay: 0 })
    }
  }


  //--GET WINDOW DATA BY ID--//
  const getWindowCreationDataById = (id) => {
    return windowsCreationData.find(config => config.id === id)
  }


  //--WINDOW OPEN/CLOSE/MINIMIZE/MAXIMIZE HANDLERS--//
  const archiveHandleOpen = () => { 
    //if alert dialogue is open, allow nothing to be opened
    if(windowsOpen.alert){ return }

    // if(denyAccess){
    //   alertHandleOpen()
    //   return
    // }

    setCurrentFocusedWindow("archive")
    windowsOpenHandler.archive(true)
    
    //check if window is minimized, if so, play animation to drag window back above navbar
    if(windowsMinimized.archive){
      pullUpWindowAnimation("archive")
      windowsMinimizedHandler.archive(false)
    }
    
    //check if entry doesn't exist, if so, add it (otherwise it will continuously add for every handleOpen() call) 
    if(!windowsOpen.archive){
      setNavbarOrder("open")
      setCurrentWindowsOpen(prevWindows => [...prevWindows, "archive"]) //add "archive" to the array
      setCurrentNavbarIconsOpen(prevWindows => [...prevWindows, "archive"])
    }
  }
  const archiveHandleClose = () => { 
    //if alert dialogue is open, allow nothing to be closed
    if(windowsOpen.alert){ return }

    setChangeFocusedWindow(true) 
    windowsOpenHandler.archive(false)
    setCurrentWindowsOpen(currentWindowsOpen.filter(a => a !== "archive")) //remove "archive" from the array
    setCurrentNavbarIconsOpen(currentNavbarIconsOpen.filter(a => a !== "archive"))
  }
  const archiveHandleMinimize = () => {
    //if alert dialogue is open, allow nothing to be minimized
    if(windowsOpen.alert){ return }

    setChangeFocusedWindow(true) 
    windowsMinimizedHandler.archive(true)
    setCurrentWindowsOpen(currentWindowsOpen.filter(a => a !== "archive")) //remove "archive" from the array
    setCurrentNavbarIconsOpen(currentNavbarIconsOpen.filter(a => a !== "archive"))
  }

  const logsHandleOpen = () => { 
    //if alert dialogue is open, allow nothing to be opened
    if(windowsOpen.alert){ return }

    if(denyAccess){
      alertHandleOpen()
      return
    }

    setCurrentFocusedWindow("logs") 
    windowsOpenHandler.logs(true)

    //check if window is minimized, if so, play animation to drag window back above navbar
    if(windowsMinimized.logs){
      pullUpWindowAnimation("logs")
      windowsMinimizedHandler.logs(false)
    }

    //check if entry doesn't exist, if so, add it (otherwise it will continuously add for every handleOpen() call) 
    if(!windowsOpen.logs){
      setNavbarOrder("open")
      setCurrentWindowsOpen(prevWindows => [...prevWindows, "logs"]) //add "logs" to the array
      setCurrentNavbarIconsOpen(prevWindows => [...prevWindows, "logs"])
    }
  }
  const logsHandleClose = () => { 
    //if alert dialogue is open, allow nothing to be closed
    if(windowsOpen.alert){ return }

    setChangeFocusedWindow(true) 
    windowsOpenHandler.logs(false)
    setCurrentWindowsOpen(currentWindowsOpen.filter(a => a !== "logs")) //remove "logs" from the array
    setCurrentNavbarIconsOpen(currentNavbarIconsOpen.filter(a => a !== "logs"))
  }
  const logsHandleMinimize = () => {
    //if alert dialogue is open, allow nothing to be minimized
    if(windowsOpen.alert){ return }

    setChangeFocusedWindow(true) 
    windowsMinimizedHandler.logs(true)
    setCurrentWindowsOpen(currentWindowsOpen.filter(a => a !== "logs")) //remove "logs" from the array
    setCurrentNavbarIconsOpen(currentNavbarIconsOpen.filter(a => a !== "logs"))
  }
  
  const settingsHandleOpen = () => { 
    //if alert dialogue is open, allow nothing to be opened
    if(windowsOpen.alert){ return }

    setCurrentFocusedWindow("settings") 
    windowsOpenHandler.settings(true)

    //check if window is minimized, if so, play animation to drag window back above navbar
    if(windowsMinimized.settings){
      pullUpWindowAnimation("settings")
      windowsMinimizedHandler.settings(false)
    }

    //check if entry doesn't exist, if so, add it (otherwise it will continuously add for every handleOpen() call) 
    if(!windowsOpen.settings){
      setNavbarOrder("open")
      setCurrentWindowsOpen(prevWindows => [...prevWindows, "settings"]) //add "settings" to the array
      setCurrentNavbarIconsOpen(prevWindows => [...prevWindows, "settings"])
    }
  }
  const settingsHandleClose = () => { 
    //if alert dialogue is open, allow nothing to be closed
    if(windowsOpen.alert){ return }

    setChangeFocusedWindow(true) 
    windowsOpenHandler.settings(false)
    setCurrentWindowsOpen(currentWindowsOpen.filter(a => a !== "settings")) //remove "settings" from the array
    setCurrentNavbarIconsOpen(currentNavbarIconsOpen.filter(a => a !== "settings"))
  }
  const settingsHandleMinimize = () => {
    //if alert dialogue is open, allow nothing to be minimized
    if(windowsOpen.alert){ return }

    setChangeFocusedWindow(true) 
    windowsMinimizedHandler.settings(true)
    setCurrentWindowsOpen(currentWindowsOpen.filter(a => a !== "settings")) //remove "settings" from the array
    setCurrentNavbarIconsOpen(currentNavbarIconsOpen.filter(a => a !== "settings"))
  }

  const documentsHandleOpen = () => { 
    //if alert dialogue is open, allow nothing to be opened
    if(windowsOpen.alert){ return }

    setCurrentFocusedWindow("documents") 
    windowsOpenHandler.documents(true)

    //check if window is minimized, if so, play animation to drag window back above navbar
    if(windowsMinimized.documents){
      pullUpWindowAnimation("documents")
      windowsMinimizedHandler.documents(false)
    }

    //check if entry doesn't exist, if so, add it (otherwise it will continuously add for every handleOpen() call) 
    if(!windowsOpen.documents){
      setNavbarOrder("open")
      setCurrentWindowsOpen(prevWindows => [...prevWindows, "documents"]) //add "documents" to the array
      setCurrentNavbarIconsOpen(prevWindows => [...prevWindows, "documents"])
    }
  }
  const documentsHandleClose = () => {
    //if alert dialogue is open, allow nothing to be closed
    if(windowsOpen.alert){ return }
    
    setChangeFocusedWindow(true) 
    windowsOpenHandler.documents(false)
    setCurrentWindowsOpen(currentWindowsOpen.filter(a => a !== "documents")) //remove "documents" from the array
    setCurrentNavbarIconsOpen(currentNavbarIconsOpen.filter(a => a !== "documents"))
  }
  const documentsHandleMinimize = () => {
    //if alert dialogue is open, allow nothing to be minimized
    if(windowsOpen.alert){ return }

    setChangeFocusedWindow(true) 
    windowsMinimizedHandler.documents(true)
    setCurrentWindowsOpen(currentWindowsOpen.filter(a => a !== "documents")) //remove "documents" from the array
    setCurrentNavbarIconsOpen(currentNavbarIconsOpen.filter(a => a !== "documents"))
  }

  const portfolioHandleOpen = () => { 
    //if alert dialogue is open, allow nothing to be opened
    if(windowsOpen.alert){ return }

    setCurrentFocusedWindow("portfolio") 
    windowsOpenHandler.portfolio(true)

    //check if window is minimized, if so, play animation to drag window back above navbar
    if(windowsMinimized.portfolio){
      pullUpWindowAnimation("portfolio")
      windowsMinimizedHandler.portfolio(false)
    }

    //check if entry doesn't exist, if so, add it (otherwise it will continuously add for every handleOpen() call) 
    if(!windowsOpen.portfolio){
      setNavbarOrder("open")
      setCurrentWindowsOpen(prevWindows => [...prevWindows, "portfolio"]) //add "portfolio" to the array
      setCurrentNavbarIconsOpen(prevWindows => [...prevWindows, "portfolio"])
    }
  }
  const portfolioHandleClose = () => { 
    //if alert dialogue is open, allow nothing to be closed
    if(windowsOpen.alert){ return }

    setChangeFocusedWindow(true) 
    windowsOpenHandler.portfolio(false)
    setCurrentWindowsOpen(currentWindowsOpen.filter(a => a !== "portfolio")) //remove "portfolio" from the array
    setCurrentNavbarIconsOpen(currentNavbarIconsOpen.filter(a => a !== "portfolio"))
  }
  const portfolioHandleMinimize = () => {
    //if alert dialogue is open, allow nothing to be minimized
    if(windowsOpen.alert){ return }

    setChangeFocusedWindow(true) 
    windowsMinimizedHandler.portfolio(true)
    setCurrentWindowsOpen(currentWindowsOpen.filter(a => a !== "portfolio")) //remove "portfolio" from the array
    setCurrentNavbarIconsOpen(currentNavbarIconsOpen.filter(a => a !== "portfolio"))
  }

  const imageViewerHandleOpen = () => { 
    //if alert dialogue is open, allow nothing to be opened
    if(windowsOpen.alert){ return }

    setCurrentFocusedWindow("imageViewer") 
    windowsOpenHandler.imageViewer(true)

    //check if window is minimized, if so, play animation to drag window back above navbar
    if(windowsMinimized.imageViewer){
      pullUpWindowAnimation("imageViewer")
      windowsMinimizedHandler.imageViewer(false)
    }

    //check if entry doesn't exist, if so, add it (otherwise it will continuously add for every handleOpen() call) 
    if(!windowsOpen.imageViewer){
      setNavbarOrder("open")
      setCurrentWindowsOpen(prevWindows => [...prevWindows, "imageViewer"]) //add "imageViewer" to the array
      setCurrentNavbarIconsOpen(prevWindows => [...prevWindows, "imageViewer"])
    }
  }
  const imageViewerHandleClose = () => { 
    //if alert dialogue is open, allow nothing to be closed
    if(windowsOpen.alert){ return }

    setChangeFocusedWindow(true) 
    windowsOpenHandler.imageViewer(false)
    setWindowsMaximized({ ...windowsMaximized, imageViewer: false })
    setCurrentWindowsOpen(currentWindowsOpen.filter(a => a !== "imageViewer")) //remove "imageViewer" from the array
    setCurrentNavbarIconsOpen(currentNavbarIconsOpen.filter(a => a !== "imageViewer"))
    document.onkeyup = null  //detach onkeyup event listener
  }
  const imageViewerHandleMinimize = () => {
    //if alert dialogue is open, allow nothing to be minimized
    if(windowsOpen.alert){ return }

    setChangeFocusedWindow(true) 
    windowsMinimizedHandler.imageViewer(true)
    setCurrentWindowsOpen(currentWindowsOpen.filter(a => a !== "imageViewer")) //remove "imageViewer" from the array
    setCurrentNavbarIconsOpen(currentNavbarIconsOpen.filter(a => a !== "imageViewer"))
  }
  const imageViewerHandleMaximize = () => {
    //if alert dialogue is open, allow nothing to be maximized
    if(windowsOpen.alert){ return }

    if(!windowsMaximized.imageViewer){ setWindowsMaximized({ ...windowsMaximized, imageViewer: true }) }
    else{ setWindowsMaximized({ ...windowsMaximized, imageViewer: false }) }
    setChangeFocusedWindow(true)
  }

  const alertHandleOpen = () => { 
    setCurrentFocusedWindow("alert") 
    windowsOpenHandler.alert(true)

    //check if entry doesn't exist, if so, add it (otherwise it will continuously add for every handleOpen() call) 
    if(!windowsOpen.alert){
      setNavbarOrder("open")
      setCurrentWindowsOpen(prevWindows => [...prevWindows, "alert"]) //add "alert" to the array
      setCurrentNavbarIconsOpen(prevWindows => [...prevWindows, "alert"])
    }
  }
  const alertHandleClose = () => { 
    setChangeFocusedWindow(true) 
    windowsOpenHandler.alert(false)
    setCurrentWindowsOpen(currentWindowsOpen.filter(a => a !== "alert")) //remove "alert" from the array
    setCurrentNavbarIconsOpen(currentNavbarIconsOpen.filter(a => a !== "alert"))
  }

  const textEditorHandleOpen = () => { 
    //if alert dialogue is open, allow nothing to be opened
    if(windowsOpen.alert){ return }

    setCurrentFocusedWindow("textEditor") 
    windowsOpenHandler.textEditor(true)

    //check if window is minimized, if so, play animation to drag window back above navbar
    if(windowsMinimized.textEditor){
      pullUpWindowAnimation("textEditor")
      windowsMinimizedHandler.textEditor(false)
    }

    //check if entry doesn't exist, if so, add it (otherwise it will continuously add for every handleOpen() call) 
    if(!windowsOpen.textEditor){
      setNavbarOrder("open")
      setCurrentWindowsOpen(prevWindows => [...prevWindows, "textEditor"]) //add "textEditor" to the array
      setCurrentNavbarIconsOpen(prevWindows => [...prevWindows, "textEditor"])
    }
  }
  const textEditorHandleClose = () => { 
    //if alert dialogue is open, allow nothing to be closed
    if(windowsOpen.alert){ return }

    setChangeFocusedWindow(true) 
    windowsOpenHandler.textEditor(false)
    setCurrentWindowsOpen(currentWindowsOpen.filter(a => a !== "textEditor")) //remove "textEditor" from the array
    setCurrentNavbarIconsOpen(currentNavbarIconsOpen.filter(a => a !== "textEditor"))
  }
  const textEditorHandleMinimize = () => {
    //if alert dialogue is open, allow nothing to be minimized
    if(windowsOpen.alert){ return }

    setChangeFocusedWindow(true) 
    windowsMinimizedHandler.textEditor(true)
    setCurrentWindowsOpen(currentWindowsOpen.filter(a => a !== "textEditor")) //remove "textEditor" from the array
    setCurrentNavbarIconsOpen(currentNavbarIconsOpen.filter(a => a !== "textEditor"))
  }


  //--THEME--//
  const theme = createTheme({
    typography: {
      fontFamily: 'eightbitFortress'
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            textTransform: 'none',
            padding: 0,
            '&:hover': {
              backgroundColor: 'transparent'
            }, 
          }
        },
      },
    }
  })


  //--DESKTOP/NAVBAR ICONS DATA--//
  const desktopIconData = [
    {
      className: "icon-documents",
      onClick: () => { handleDocumentsDirToOpen("Documents"); documentsHandleOpen() },
      Icon: FolderIcon,
      label: "Documents",
    },
    {
      className: "icon-pictures",
      onClick: () => { handleDocumentsDirToOpen("Pictures"); documentsHandleOpen() },
      Icon: ImagesIcon,
      label: "Pictures",
    },
    {
      className: "icon-settings",
      onClick: settingsHandleOpen,
      Icon: MoonStarIcon,
      label: "Settings",
    },
    {
      className: "icon-tutorial",
      onClick: () => { handleAlertDescription("Coming soon"); alertHandleOpen() },
      Icon: ImageIcon,
      label: "tutorial.png",
    }
  ]

  const navbarIconData = [
    {
      windowOpen: windowsOpen.archive,
      className: "archive",
      onClick: archiveHandleOpen,
      Icon: ArchiveIcon,
      label: "Archive"
    },
    {
      windowOpen: windowsOpen.logs,
      className: "logs",
      onClick: logsHandleOpen,
      Icon: LogsIcon,
      label: "Data Logs"
    },
    {
      windowOpen: windowsOpen.settings,
      className: "settings",
      onClick: settingsHandleOpen,
      Icon: MoonStarIcon,
      label: "Settings"
    },
    {
      windowOpen: windowsOpen.documents,
      className: "documents",
      onClick: documentsHandleOpen,
      Icon: FolderIcon,
      label: "Documents"
    },
    {
      windowOpen: windowsOpen.portfolio,
      className: "portfolio",
      onClick: portfolioHandleOpen,
      Icon: PortfolioIcon,
      label: "Portfolio"
    },
    {
      windowOpen: windowsOpen.imageViewer,
      className: "imageViewer",
      onClick: imageViewerHandleOpen,
      Icon: ImageViewerIcon,
      label: "Ivy"
    },
    {
      windowOpen: windowsOpen.alert,
      className: "alert",
      onClick: alertHandleOpen,
      Icon: AlertIcon,
      label: "Alert"
    },
    {
      windowOpen: windowsOpen.textEditor,
      className: "textEditor",
      onClick: textEditorHandleOpen,
      Icon: NoteIcon,
      label: "Notus"
    }
  ]

  const menuIconData = [
    {
      onClick: () => handleSideMenuOpen("lunarEclipse", "Lunar Eclipse"),
      Icon: MoonIcon,
      label: "Lunar Eclipse"
    },
    {
      onClick: () => handleSideMenuOpen("nakoProjects", `"I'm watching you."`),
      Icon: FolderIcon,
      label: "Nako Projects"
    },
    {
      onClick: () => handleSideMenuOpen("userInfo", "User Info"),
      Icon: NoteIcon,
      label: "User Info"
    }
  ]


  //--WINDOWS CREATION DATA--//
  const windowsCreationData = [

    //template
    {
      windowOpen: windowsOpen.NAMEHERE,
      id: "window-NAMEHERE",
      windowRef: null,
      headerProps: {
        headerName: "NAME HERE",
        Icon: null,
        setClose: null,
        setMinimize: null,
      },
      PageComponent: null,
      pageProps: {
        
      }
    },

    //archive window
    {
      windowOpen: windowsOpen.archive,
      id: "window-archive",
      windowRef: archiveWindowAnimation,
      headerProps: {
        headerName: "███hi██",
        Icon: ArchiveIcon,
        setClose: archiveHandleClose,
        setMinimize: archiveHandleMinimize,
      },
      PageComponent: Archive,
      pageProps: {
        
      }
    },

    //data logs window
    {
      windowOpen: windowsOpen.logs,
      id: "window-logs",
      windowRef: logsWindowAnimation,
      headerProps: {
        headerName: "Data Logs",
        Icon: LogsIcon,
        setClose: logsHandleClose,
        setMinimize: logsHandleMinimize,
      },
      PageComponent: Logs,
      pageProps: {
        
      }
    },

    //settings window
    {
      windowOpen: windowsOpen.settings,
      id: "window-settings",
      windowRef: settingsWindowAnimation,
      headerProps: {
        headerName: "Settings",
        Icon: MoonStarIcon,
        setClose: settingsHandleClose,
        setMinimize: settingsHandleMinimize,
      },
      PageComponent: Settings,
      pageProps: {
        setSelectedWallpaper: handleSelectedWallpaper,
        setSelectedTheme: handleSelectedTheme,
        setCurrentArrayIndex: handleCurrentArrayIndex,
        setBrightnessValue: handleBrightnessValue,
        setNotusOpen: textEditorHandleOpen,
        notusHandlers: notusHandlers,
        selectedWallpaper: selectedWallpaper,
        selectedTheme: selectedTheme,
        currentArrayIndex: currentArrayIndex,
        brightnessValue: brightnessValue
      }
    },

    //documents window
    {
      windowOpen: windowsOpen.documents,
      id: "window-documents",
      windowRef: documentsWindowAnimation,
      headerProps: {
        headerName: "Documents",
        Icon: FolderIcon,
        setClose: documentsHandleClose,
        setMinimize: documentsHandleMinimize,
        newHeaderName: windowHeaderName
      },
      PageComponent: Documents,
      pageProps: {
        currentOpenDir: documentsDirToOpen,
        ivyHandlers,
        notusHandlers,
        setHeaderName: handleWindowHeaderName,
        setArchiveOpen: archiveHandleOpen,
        setAlertOpen: alertHandleOpen,
        setIvyOpen: imageViewerHandleOpen,
        setNotusOpen: textEditorHandleOpen,
        setErrorDescription: handleAlertDescription
      }
    },

    //portfolio window
    {
      windowOpen: windowsOpen.portfolio,
      id: "window-portfolio",
      windowRef: portfolioWindowAnimation,
      headerProps: {
        headerName: "Portfolio", 
        Icon: PortfolioIcon,
        setClose: portfolioHandleClose,
        setMinimize: portfolioHandleMinimize,
        keepMaximize: true
      },
      PageComponent: Portfolio,
      pageProps: {
        setIvyOpen: imageViewerHandleOpen,
        setIvyImage: handleIvyImage,
        setIvyImageWidth: handleIvyImageWidth,
        setIvyImageHeight: handleIvyImageHeight,
        setIvyImageDescription: handleIvyImageDescription
      }
    },

    //image viewer window 
    {
      windowOpen: windowsOpen.imageViewer,
      id: "window-imageViewer",
      windowRef: imageViewerWindowAnimation,
      headerProps: {
        headerName: `Ivy - ${ivyImageHeaderName}`,
        Icon: ImageViewerIcon,
        setClose: imageViewerHandleClose,
        setMinimize: imageViewerHandleMinimize,
        setMaximize: imageViewerHandleMaximize,
        keepMaximize: true,
        maximized: windowsMaximized.imageViewer
      },
      PageComponent: ImageHandler,
      pageProps: {
        selectedImage: currentIvyImage,
        isOpen: windowsOpen.imageViewer,
        isMaximized: windowsMaximized.imageViewer,
        imageWidth: ivyImageWidth,
        imageHeight: ivyImageHeight,
        imageDescription: ivyImageDescription,
        imageArrayIndex: ivyArrayIndex,
        setHeaderName: handleIvyHeaderName,
        imageHeader: ivyImageHeaderName
      }
    },

    //alert window
    {
      windowOpen: windowsOpen.alert,
      id: "window-alert",
      windowRef: null,
      headerProps: {
        headerName: "Error",
        Icon: AlertIcon,
        setClose: alertHandleClose,
        newHeaderName: windowHeaderName,
        removeMinimize: true
      },
      PageComponent: AlertDialogue,
      pageProps: {
        setClose: alertHandleClose,
        errorDescription: alertDescription
      }
    },

    //text editor window
    {
      windowOpen: windowsOpen.textEditor,
      id: "window-textEditor",
      windowRef: textEditorWindowAnimation,
      headerProps: {
        headerName: `Notus - ${notusHeaderName}`,
        Icon: NoteIcon,
        setClose: textEditorHandleClose,
        setMinimize: textEditorHandleMinimize
      },
      PageComponent: TextEditor,
      pageProps: {
        isOpen: windowsOpen.textEditor,
        selectedText: currentNotusText,
        selectedMdxFile: currentNotusFile 
      }
    },
  ]


  //--FUNCTIONS & STATE HANDLING--//
  function updateTime() {
    let date = new Date()
    let amORpm = date.getHours() >= 12 ? "PM" : "AM"

    let newTime = date.toLocaleTimeString('en-US', { hour12:false, hour:"2-digit", minute:"2-digit" })
    setCurrentTime(newTime + ` ${amORpm}`)
  }
  setInterval(updateTime, 1000)

  //reorganize the window array to represent actual window hierarchy
  function moveElementInArray(arrayToMove, elementToMove){
    let indexToMove = arrayToMove.indexOf(elementToMove)
    arrayToMove.push(arrayToMove.splice(indexToMove, 1)[0])
  }

  //set currently active window
  function setActiveWindow(currentActiveWindow){

    //create array of all windows
    // var archiveWindow = document.getElementById("window-archive")
    const allWindowsArray = Object.keys(windowsOpen)
    const windows = allWindowsArray.reduce((array, id) => {
      array[id] = document.getElementById(`window-${id}`)
      return array
    }, {})

    //reorganize the window array to represent actual window hierarchy
    if(!currentActiveWindow){ return }
    moveElementInArray(currentWindowsOpen, currentActiveWindow)
    
    //zIndex ordering (doesn't exist will be 9, while bottom will be 10)
    //add 20 to alert (is an important window/dialogue, so it goes above everything)
    const windowsIndexes = allWindowsArray.reduce((acc, id) => {
      const index = currentWindowsOpen.indexOf(id)
      acc[id] = index + (id == "alert" ? 20 : 10)
      return acc
    }, {})
    
    //check if active window is none
    if(currentActiveWindow == "none"){
      Object.values(windows).forEach(window => {
        if(window){ window.style.zIndex = 9 }
      })
      
      setNavbarColors("none")
      setCurrentFocusedWindow("none")
      return
    }

    //set all windows' zIndex
    //if window exists, set zIndex to above grabbed zIndex, otherwise set to null
    allWindowsArray.forEach(id => {
      if(windows[id]){ windows[id].style.zIndex = windowsIndexes[id] }
    })

    //set navbarColors and focusedWindow
    setNavbarColors(currentActiveWindow)
    setCurrentFocusedWindow(currentActiveWindow)
    setNavbarOrder("open")
  }

  //set navbar colors
  function setNavbarColors(currentSelectedIcon){

    //get root style of icons, and get globalColor ":root" style
    //NOTE: rootStyle is the local rootStyle (non-computed), while globalColor (computed) references the actual global variables 
    var rootStyle = document.documentElement.style
    var globalColor = getComputedStyle(document.querySelector(':root')).getPropertyValue('--globalColor')
    // console.log("globalColor: " + globalColor)
    console.log(currentSelectedIcon)

    //set all to false, and set only one to true
    rootStyle.setProperty('--navbarArchiveBackgroundColor', '#000')
    rootStyle.setProperty('--navbarLogsBackgroundColor', '#000')
    rootStyle.setProperty('--navbarSettingsBackgroundColor', '#000')
    rootStyle.setProperty('--navbarDocumentsBackgroundColor', '#000')
    rootStyle.setProperty('--navbarPortfolioBackgroundColor', '#000')
    rootStyle.setProperty('--navbarImageViewerBackgroundColor', '#000')
    rootStyle.setProperty('--navbarAlertBackgroundColor', '#000')
    rootStyle.setProperty('--navbarTextEditorBackgroundColor', '#000')
    rootStyle.setProperty('--desktopMenuBackgroundColor', '#000')
  
    rootStyle.setProperty('--navbarArchiveSelectedColor', globalColor)
    rootStyle.setProperty('--navbarLogsSelectedColor', globalColor)
    rootStyle.setProperty('--navbarSettingsSelectedColor', globalColor)
    rootStyle.setProperty('--navbarDocumentsSelectedColor', globalColor)
    rootStyle.setProperty('--navbarPortfolioSelectedColor', globalColor)
    rootStyle.setProperty('--navbarImageViewerSelectedColor', globalColor)
    rootStyle.setProperty('--navbarAlertSelectedColor', globalColor)
    rootStyle.setProperty('--navbarTextEditorSelectedColor', globalColor)
    rootStyle.setProperty('--desktopMenuSelectedColor', globalColor)

    rootStyle.setProperty('--everythingButAlertBlur', '0px')

    //set a specific icon to be active
    switch(currentSelectedIcon){
      case "desktopMenu":
        rootStyle.setProperty('--desktopMenuBackgroundColor', globalColor)
        rootStyle.setProperty('--desktopMenuSelectedColor', '#000')
        break

      case "archive":
        rootStyle.setProperty('--navbarArchiveBackgroundColor', globalColor)
        rootStyle.setProperty('--navbarArchiveSelectedColor', '#000')
        break

      case "logs":
        rootStyle.setProperty('--navbarLogsBackgroundColor', globalColor)
        rootStyle.setProperty('--navbarLogsSelectedColor', '#000')
        break
      
      case "settings":
        rootStyle.setProperty('--navbarSettingsBackgroundColor', globalColor)
        rootStyle.setProperty('--navbarSettingsSelectedColor', '#000')
        break

      case "documents":
        rootStyle.setProperty('--navbarDocumentsBackgroundColor', globalColor)
        rootStyle.setProperty('--navbarDocumentsSelectedColor', '#000')
        break

      case "portfolio":
        rootStyle.setProperty('--navbarPortfolioBackgroundColor', globalColor)
        rootStyle.setProperty('--navbarPortfolioSelectedColor', '#000')
        break

      case "imageViewer":
        rootStyle.setProperty('--navbarImageViewerBackgroundColor', globalColor)
        rootStyle.setProperty('--navbarImageViewerSelectedColor', '#000')
        break

      case "alert":
        rootStyle.setProperty('--navbarAlertBackgroundColor', globalColor)
        rootStyle.setProperty('--navbarAlertSelectedColor', '#000')
        rootStyle.setProperty('--everythingButAlertBlur', '1px')
        break

      case "textEditor":
        rootStyle.setProperty('--navbarTextEditorBackgroundColor', globalColor)
        rootStyle.setProperty('--navbarTextEditorSelectedColor', '#000')
        break
    }
  }

  //REVIEW: for some reason sometimes the order doesn't line up? (not sure why or what causes this)
  function setNavbarOrder(openOrClose){
    var rootStyle = document.documentElement.style

    // console.log(currentNavbarIconsOpen)

    //open new navbar icon
    if(openOrClose == "open" && currentWindowsOpen.length > 3){ 
      // console.log(currentNavbarIconsOpen)
      console.log("three icons open already")
      return
    }

    //might need to set this up so it only runs three times
    if(openOrClose == "open"){
      // var windowOpened = currentWindowsOpen[currentWindowsOpen.length - 1]
      // var indexOfWindow = currentWindowsOpen.indexOf(windowOpened)

      var iconOpened = currentNavbarIconsOpen[currentNavbarIconsOpen.length - 1]
      var indexOfIcon = currentNavbarIconsOpen.indexOf(iconOpened)
      // console.log(currentNavbarIconsOpen)
      // console.log(iconOpened)

      switch(iconOpened){
        case "archive":
          rootStyle.setProperty('--navbarArchiveOrder', indexOfIcon)
          // console.log("wow archive")
          break

        case "logs":
          rootStyle.setProperty('--navbarLogsOrder', indexOfIcon)
          // console.log("wow logs")
          break

        case "settings":
          rootStyle.setProperty('--navbarSettingsOrder', indexOfIcon)
          // console.log("wow settings")
          break

        case "documents":
          rootStyle.setProperty('--navbarDocumentsOrder', indexOfIcon)
          // console.log("wow documents")
          break

        case "portfolio":
          rootStyle.setProperty('--navbarPortfolioOrder', indexOfIcon)
          // console.log("wow portfolio")
          break

        case "imageViewer":
          rootStyle.setProperty('--navbarImageViewerOrder', indexOfIcon)
          // console.log("wow imageViewer")
          break

        case "alert":
          rootStyle.setProperty('--navbarAlertOrder', indexOfIcon)
          // console.log("wow alert")
          break

        case "textEditor":
          rootStyle.setProperty('--navbarTextEditorOrder', indexOfIcon)
          // console.log("wow textEditor")
          break
      }
    }
  }


  //--ONCE ON SERVER INIT FOR HANDLER SETTING--//
  useEffect(() => {

    //ivy handlers
    setIvyHandlers({
      setIvyImage: handleIvyImage,
      setIvyImageWidth: handleIvyImageWidth,
      setIvyImageHeight: handleIvyImageHeight,
      setIvyImageDescription: handleIvyImageDescription,
      setIvyImageHeaderName: handleIvyHeaderName,
      setIvyImageArrayIndex: handleIvyArrayIndex
    })
    
    //notus handlers
    setNotusHandlers({
      setNotusHeaderName: handleNotusHeaderName,
      setNotusText: handleNotusText,
      setNotusFile: handleCurrentNotusFile
    })
  }, [])


  //--ONCE ON SERVER INIT FOR LOCAL STORAGE SETTING--//
  useEffect(() => {

    //find local storage, and handle
    if(typeof(Storage) !== "undefined"){
      var rootStyle = document.documentElement.style

      //if there is no wallpaper, set all to default
      if(localStorage.getItem("selectedWallpaper") == null){
        console.log("what the heck man i'm setting initial local storage here")

        rootStyle.setProperty("--desktopWallpaper", "/Wallpapers/Wallpaper-Starry.webp")
        rootStyle.setProperty("--globalColor", "#9665ff")
        rootStyle.setProperty("--globalColorHover", "#6a3ad1")
        rootStyle.setProperty("--globalHoverBorderColor", "rgba(106, 64, 197, 0.5)")
        rootStyle.setProperty("--globalHoverBackgroundColor", "rgba(44, 24, 87, 0.5)")
        rootStyle.setProperty("--desktopWallpaperBrightness", "100")
        
        localStorage.setItem("selectedWallpaper", "Starry")
        localStorage.setItem("selectedTheme", "Purple")
        localStorage.setItem("desktopWallpaper", `url("/Wallpapers/Wallpaper-Starry.webp")`)
        localStorage.setItem("globalColor", "#9665ff")
        localStorage.setItem("globalColorHover", "#6a3ad1")
        localStorage.setItem("globalHoverBorderColor", "rgba(106, 64, 197, 0.5)")
        localStorage.setItem("globalHoverBackgroundColor", "rgba(44, 24, 87, 0.5)")
        localStorage.setItem("desktopWallpaperBrightness", "100")
        return
      }

      //set css properties according to last usage
      rootStyle.setProperty("--desktopWallpaper", localStorage.getItem("desktopWallpaper"))
      rootStyle.setProperty("--globalColor", localStorage.getItem("globalColor"))
      rootStyle.setProperty("--globalColorHover", localStorage.getItem("globalColorHover"))
      rootStyle.setProperty("--globalHoverBorderColor", localStorage.getItem("globalHoverBorderColor"))
      rootStyle.setProperty("--globalHoverBackgroundColor", localStorage.getItem("globalHoverBackgroundColor"))
      rootStyle.setProperty("--desktopWallpaperBrightness", localStorage.getItem("desktopWallpaperBrightness"))

      //set wallpaper, theme and brightness according to localStorage
      handleSelectedWallpaper(localStorage.getItem("selectedWallpaper"))
      handleSelectedTheme(localStorage.getItem("selectedTheme"))
      // handleCurrentArrayIndex(0)
      handleBrightnessValue(localStorage.getItem("desktopWallpaperBrightness"))
    }
  }, [])


  //--ON SERVER INIT & WHEN DESKTOP MENU OPEN/CLOSE--//
  useEffect(() => {
    menuAnimation()
  }, [desktopMenuOpen])


  //--ON SERVER INIT & WHEN WINDOWS OPEN/FOCUS/CLOSE--//
  useEffect(() => {
    
    //if windows close, make the window that is still open the active window
    if(changeFocusedWindow){
      if(currentWindowsOpen.length === 0){ setActiveWindow("none"); console.log("none here") }
      if(currentWindowsOpen.length === 1){ setActiveWindow(currentWindowsOpen[0]); console.log("only one left") }
      if(currentWindowsOpen.length >= 2){ setActiveWindow(currentWindowsOpen[currentWindowsOpen.length - 1]); console.log("two or more left") }
      setChangeFocusedWindow(false)
      // console.log("changed to: " + currentFocusedWindow)
      // console.log(currentWindowsOpen)
      return
    }
    
    //if the window is not set to change, set the current focused window as active
    if(!changeFocusedWindow){
      setActiveWindow(currentFocusedWindow)
      // setNavbarOrder("open")
      // console.log("current focused window: " + currentFocusedWindow)

      //close desktopMenu if another window gets focused
      if(windowsOpen.desktopMenu && currentFocusedWindow != "desktopMenu"){
        handleDesktopMenuOpen(false)
      }
    }
  }, [windowsOpen, currentFocusedWindow, currentWindowsOpen, changeFocusedWindow, dropWindowAnimation])


  //--ON SERVER INIT & WHEN WINDOWS MINIMIZE--//
  useEffect(() => {

    //convert all windows into an array to be filtered through below
    const windows = Object.keys(windowsMinimized)

    //play animation to drop window below navbar
    windows.forEach(window => {
      if(windowsMinimized[window]){ 
        dropWindowAnimation(window) 
      }
    })
  }, [windowsMinimized])

  
  //--ON SERVER INIT & WHEN WINDOWS MAXIMIZE--//
  useEffect(() => {

    //play animation to maximize window
    if(windowsMaximized.imageViewer){
      enlargeWindowAnimation("imageViewer")
      document.getElementById("window-imageViewer").setAttribute("style", "width:100%; height:100%; top:0; left:0; border-width:0")
    }
    else if(!windowsMaximized.imageViewer && windowsOpen.imageViewer){
      shrinkWindowAnimation("imageViewer")
      document.getElementById("window-imageViewer").setAttribute("style", "width:fit-content; height:fit-content; top:140px; left:360px; border-width:4px")
    }
  }, [windowsMaximized])


  //--ON SERVER INIT & WHEN DRAGGING WINDOWS--//
  useEffect(() => {

    //make all div elements draggable    
    let mydivs = document.getElementsByClassName("draggable")
    let mydiv
    for(mydiv of mydivs) {
      dragElement(mydiv)
    }
    
    function dragElement(elmnt) {
      var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0
      if(document.getElementById("draggable-header")){
        //specifically targetting the first child, of which - if the hierachy is correct - should be the "draggable-header"
        elmnt.firstChild.onmousedown = dragMouseDown
        // elmnt.onmousedown = dragMouseDown  //this also works, but instead targets the entire div instead of just "draggable-header"
      }
    
      function dragMouseDown(e) {
        e.preventDefault()

        //if alert dialogue is open, allow nothing to be dragged
        if(windowsOpen.alert){
          // console.log("hor hor hor")
          return
        }

        //upon dragging/clicking-on, set that window that is being dragged to be the active window
        switch(e.target.parentElement.parentElement.id){
          case "window-archive":
            setActiveWindow("archive")
            moveElementInArray(currentWindowsOpen, "archive")
            break

          case "window-logs":
            setActiveWindow("logs")
            moveElementInArray(currentWindowsOpen, "logs")
            break

          case "window-settings":
            setActiveWindow("settings")
            moveElementInArray(currentWindowsOpen, "settings")
            break

          case "window-documents":
            setActiveWindow("documents")
            moveElementInArray(currentWindowsOpen, "documents")
            break

          case "window-portfolio":
            setActiveWindow("portfolio")
            moveElementInArray(currentWindowsOpen, "portfolio")
            break

          case "window-imageViewer":
            setActiveWindow("imageViewer")
            moveElementInArray(currentWindowsOpen, "imageViewer")
            break
          
          case "window-alert":
            setActiveWindow("alert")
            moveElementInArray(currentWindowsOpen, "alert")
            break

          case "window-textEditor":
            setActiveWindow("textEditor")
            moveElementInArray(currentWindowsOpen, "textEditor")
            break
        }
        // console.log(e.target.parentElement.parentElement)
        // console.log(currentWindowsOpen)
        
        //get cursor position at startup
        pos3 = e.clientX
        pos4 = e.clientY
        document.onmouseup = closeDragElement
        //call function whenever cursor moves
        document.onmousemove = elementDrag
      }
    
      function elementDrag(e) {
        e.preventDefault()
        //calculate new cursor position
        pos1 = pos3 - e.clientX
        pos2 = pos4 - e.clientY
        pos3 = e.clientX
        pos4 = e.clientY
        //set element's new position
        var newTopPos = (elmnt.offsetTop - pos2)
        var newLeftPos = (elmnt.offsetLeft - pos1)
        const offsetRight = document.documentElement.scrollWidth - elmnt.getBoundingClientRect().right
        const navbarOffsetBottom = document.getElementById("navbar").getBoundingClientRect().height
        const offsetBottom = document.documentElement.scrollHeight - elmnt.getBoundingClientRect().bottom - navbarOffsetBottom
       
        if(elmnt.offsetTop <= 0){
          elmnt.style.top = "1px"
          return
        }

        if(elmnt.offsetLeft <= 0){
          elmnt.style.left = "1px"
          return
        }

        if(offsetRight <= 0){
          /* (width of viewport - width of element) - 1 + "px" */
          elmnt.style.left = (document.documentElement.scrollWidth - elmnt.offsetWidth) - 1 + "px"
          return
        }

        if(offsetBottom <= 0){
          /* (height of viewport - height of element - height of navbar) - 1 + "px" */
          elmnt.style.top = (document.documentElement.scrollHeight - elmnt.offsetHeight - navbarOffsetBottom) - 1 + "px"
          return
        }

        elmnt.style.top = newTopPos + "px"
        elmnt.style.left = newLeftPos + "px"
      }
    
      function closeDragElement(){
        //stop moving when mouse button is released
        document.onmouseup = null
        document.onmousemove = null
      }
    }
  })

  
  //STUB: maybe add functionality for a "maximize" button (redirects the user to the window's webpage, and remembers what is currently open)
  //REVIEW: if css variable setting is dynamic: might be able make navbar icon order dynamic
  //REVIEW: when minimizing windows, they sometimes have the chance of displaying the incorrect navbar color
  //REVIEW: when unminimizing windows, they sometimes have the chance of being incorrectly rearranged (moved to the beginning) in the navbar order [array] 
  //TODO: add a sorta "os-booting sqeuence" as a splashscreen

  return (
    <div className="layout">

      {loginOpen &&
        <div className="layout-content">
          <Login setLoginOpen={handleLoginOpen} setAlertOpen={alertHandleOpen} setErrorDescription={handleAlertDescription}/>

          {/* alert dialogue window */}
          <WindowCreator {...getWindowCreationDataById("window-alert")}/>
        </div>
      }

      {!loginOpen &&
        <div className="layout-content"> 
        {/* background image/video */}
        {/* <video className="backgroundVideo" src="videoLoop.webm" autoPlay loop muted preload="auto"/> */}
        <Image className="backgroundVideo" src={`Wallpapers/Wallpaper-${selectedWallpaper}.webp`} priority alt="wallpaper" width={100} height={100}/>

        <ThemeProvider theme={theme}>

          {/* desktop/icons layout */}
          {/* icons handling */}
          <div className="desktop-layout">
            {desktopIconData.map((data, index) => (
              <DesktopIconButton
                key={index}
                index={index}
                className={data.className}
                onClick={data.onClick}
                Icon={data.Icon}
                label={data.label}
              />
            ))}
          </div>

          {/* windows handling */}
          {windowsCreationData.map((data, index) => (
            <WindowCreator key={index} {...data}/>
          ))}

          {/* desktop menu */}
          {/* TODO: extract this to its own Component */}
          <AnimatePresence>
            {desktopMenuOpen &&
              <motion.div 
                className="layout-menu"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.5 }}
              >
                
                {/* left menu */}
                <div className="left-menu">
                  <ul>
                    <span>
                      Selected: <TypewriterEffect text={currentSideMenuOpen} delay={30}/><br/>
                      ---
                    </span>
                    {menuIconData.map((data, index) => (
                      <MenuIconButton
                        key={index}
                        index={index}
                        onClick={data.onClick}
                        Icon={data.Icon}
                        label={data.label}
                      />
                    ))}
                  </ul>

                  {/* bottom disclaimer */}
                  <span style={{position:'fixed', bottom:0, left:0, padding:10, fontSize:"10px"}}>
                    <i>Disclaimer:<br/>
                    ~ Prototype - expect 3rrors ~</i>
                  </span>
                </div>
                
                {/* right menu */}
                <div 
                  className="right-menu"
                  ref={desktopMenuAnimation}
                >
                  {desktopSideMenuContent}
                  <span style={{position:'fixed', bottom:0, right:0, padding:10}}>
                    {desktopSideMenuFooter}
                  </span>
                </div>
              
              </motion.div>
            }
          </AnimatePresence>
        </ThemeProvider>
      </div>
      }

      {/* NAVBAR */}
      {!loginOpen &&
        <div className="layout-nav">
          <nav id="navbar" className="navigation">

            {/* menu */}
            <div className="menu">
              <div onClick={() => handleDesktopMenuOpen(!desktopMenuOpen)}>
                <MoonIcon alt="menu" width={24} height={24}/>
              </div>
            </div>

            {/* primary */}
            <div className ="navigation-primary">
              <ul>
                <ThemeProvider theme={theme}>

                  {/* all navbar icons */}
                  {navbarIconData.map((data, index) => (
                    <NavbarIconButton
                      key={index}
                      windowOpen={data.windowOpen}
                      className={data.className}
                      onClick={data.onClick}
                      Icon={data.Icon}
                      label={data.label}
                    />
                  ))}

                  {/* this exists only to add empty space to the navbar height to keep it from collapsing (or popping up/down when a new window is opened) */}
                  {/* NOTE: if adds a menu, probably won't need this */}
                  <li className="null">
                    <Button disableRipple>
                      <ArchiveIcon width={24} height={24}/>
                    </Button>
                  </li>
                </ThemeProvider>
              </ul>
            </div>

            {/* secondary */}
            <div className="navigation-secondary">
              <ul>
                <li className="time">{currentTime}</li>
                <li className="something">
                  {/* <div onClick={() => { textEditorHandleOpen(); handleNotusHeaderName("Secret?"); handleCurrentNotusFile("Navbar.txt") }}> */}
                  <div onClick={() => handleLoginOpen(true)}>
                    <NoteIcon alt="???" width={24} height={24}/>
                  </div>
                </li>
              </ul>
            </div>
                
          </nav>
        </div>
      }
    </div>
  )
}