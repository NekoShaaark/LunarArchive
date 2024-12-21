"use client"

import { useEffect, useState } from 'react'
import { AlertIcon, ArchiveIcon, FolderIcon, ImageIcon, ImageViewerIcon, ImagesIcon, LogsIcon, NoteIcon, PortfolioIcon, MoonStarIcon, MoonIcon } from '@/components/SvgHandler'
import { Button } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { useAnimate, AnimatePresence } from 'framer-motion'
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
import { DesktopIconButton, NavbarIconButton } from '@/components/creators/DesktopCreator'
import WindowCreator from '@/components/creators/WindowsCreator'

import { WindowsHandler } from '@/components/handlers/WindowsHandler'
import DesktopMenu from '@/components/windows/DesktopMenu'
import { NavbarHandler } from '@/components/handlers/NavbarHandler'



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

  //desktop settings states
  const [selectedWallpaper, setSelectedWallpaper] = useState("WorldMachine")
  const [selectedTheme, setSelectedTheme] = useState("Purple")
  const [currentArrayIndex, setCurrentArrayIndex] = useState(0)
  const [brightnessValue, setBrightnessValue] = useState(100)

  //window states
  const windowsHandler = WindowsHandler()
  const windowsStack = windowsHandler.windowsStack
  const currentFocusedWindow = windowsHandler.windowFocused
  const changeFocusedWindow = windowsHandler.changeFocusedWindow
  const windowFocusedData = windowsHandler.windowFocusedData

  //navbar states
  const navbarHandler = NavbarHandler()
  const navbarIconsArray = navbarHandler.navbarIconsArray

  //other states
  const [windowHeaderName, setWindowHeaderName] = useState()
  const [alertDescription, setAlertDescription] = useState()
  const [documentsDirToOpen, setDocumentsDirToOpen] = useState("Documents")
  const [denyAccess, setDenyAccess] = useState(true)
  const [loginOpen, setLoginOpen] = useState(false)


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
    if(windowsHandler.windowsOpen.alert){ return }

    //handle opening/closing of desktopMenu
    if(e){
      windowsHandler.handleFocusedWindow("desktopMenu")
      windowsHandler.desktopMenu.handleOpen(true)
      if(!navbarHandler.navbarIconsOpen.archive){
        setNavbarOrder()
        navbarHandler.desktopMenu.handleOpen(true)
      }
    } 
    else{
      windowsHandler.handleChangeFocusedWindow(true)
      windowsHandler.desktopMenu.handleOpen(false)
      navbarHandler.desktopMenu.handleOpen(false)
    }

    //open/close desktopMenu
    // windowsHandler.desktopMenu.handleOpen(e)
    // navbarHandler.desktopMenu.handleOpen(e)
  }


  //--MINIMIZE ANIMATIONS--//
  //TODO: might be able to simplify these
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
        // await imageViewerAnimate(imageViewerWindowAnimation.current, { height: "100%" }, { duration: 1.0, delay: 0 })
        // await imageViewerAnimate(imageViewerWindowAnimation.current, { width: "100%" }, { duration: 1.0, delay: 0 })
        break
    }
  }
  const shrinkWindowAnimation = async (animationItem) => {
    switch(animationItem){
      case "imageViewer":
        // await imageViewerAnimate(imageViewerWindowAnimation.current, { height: "fit-content", width: "fit-content" }, { duration: 0.6, delay: 0.12 })
        break
    }
  }


  //--GET WINDOW DATA BY ID--//
  const getWindowCreationDataById = (id) => {
    return windowsCreationData.find(config => config.id === id)
  }


  //--WINDOW OPEN/CLOSE/MINIMIZE/MAXIMIZE HANDLERS--//
  const archiveHandleOpen = () => { 
    //if alert dialogue is open, allow nothing to be opened
    if(windowsHandler.windowsOpen.alert){ return }

    windowsHandler.handleFocusedWindow("archive")
    windowsHandler.archive.handleOpen(true)
    
    //check if window is minimized, if so, play animation to drag window back above navbar
    if(windowsHandler.windowsMinimized.archive){
      pullUpWindowAnimation("archive")
      windowsHandler.archive.handleMinimize(false)
    }
    
    //check if is already on navbar, and add to navbar if not already there
    if(!navbarHandler.navbarIconsOpen.archive){
      setNavbarOrder()
      navbarHandler.archive.handleOpen(true)
    }
  }
  const archiveHandleClose = () => { 
    //if alert dialogue is open, allow nothing to be closed
    if(windowsHandler.windowsOpen.alert){ return }

    windowsHandler.handleChangeFocusedWindow(true) 
    windowsHandler.archive.handleOpen(false)
    navbarHandler.archive.handleOpen(false)
  }
  const archiveHandleMinimize = () => {
    //if alert dialogue is open, allow nothing to be minimized
    if(windowsHandler.windowsOpen.alert){ return }

    windowsHandler.handleChangeFocusedWindow(true) 
    windowsHandler.archive.handleMinimize(true)
  }

  const logsHandleOpen = () => { 
    //if alert dialogue is open, allow nothing to be opened
    if(windowsHandler.windowsOpen.alert){ return }

    if(denyAccess){
      alertHandleOpen()
      return
    }

    windowsHandler.handleFocusedWindow("logs") 
    windowsHandler.logs.handleOpen(true)

    //check if window is minimized, if so, play animation to drag window back above navbar
    if(windowsHandler.windowsMinimized.logs){
      pullUpWindowAnimation("logs")
      windowsHandler.logs.handleMinimize(false)
    }

    //check if entry doesn't exist, if so, add it (otherwise it will continuously add for every handleOpen() call) 
    if(!navbarHandler.navbarIconsOpen.logs){
      setNavbarOrder()
      navbarHandler.archive.handleOpen(true)
    }
  }
  const logsHandleClose = () => { 
    //if alert dialogue is open, allow nothing to be closed
    if(windowsHandler.windowsOpen.alert){ return }

    windowsHandler.handleChangeFocusedWindow(true) 
    windowsHandler.logs.handleOpen(false)
    navbarHandler.logs.handleOpen(false)
  }
  const logsHandleMinimize = () => {
    //if alert dialogue is open, allow nothing to be minimized
    if(windowsHandler.windowsOpen.alert){ return }

    windowsHandler.handleChangeFocusedWindow(true) 
    windowsHandler.logs.handleMinimize(true)
  }
  
  const settingsHandleOpen = () => { 
    //if alert dialogue is open, allow nothing to be opened
    if(windowsHandler.windowsOpen.alert){ return }

    windowsHandler.handleFocusedWindow("settings") 
    windowsHandler.settings.handleOpen(true)

    //check if window is minimized, if so, play animation to drag window back above navbar
    if(windowsHandler.windowsMinimized.settings){
      pullUpWindowAnimation("settings")
      windowsHandler.settings.handleMinimize(false)
    }

    //check if entry doesn't exist, if so, add it (otherwise it will continuously add for every handleOpen() call) 
    if(!navbarHandler.navbarIconsOpen.settings){
      setNavbarOrder()
      navbarHandler.settings.handleOpen(true)
    }
  }
  const settingsHandleClose = () => { 
    //if alert dialogue is open, allow nothing to be closed
    if(windowsHandler.windowsOpen.alert){ return }

    windowsHandler.handleChangeFocusedWindow(true) 
    windowsHandler.settings.handleOpen(false)
    navbarHandler.settings.handleOpen(false)
  }
  const settingsHandleMinimize = () => {
    //if alert dialogue is open, allow nothing to be minimized
    if(windowsHandler.windowsOpen.alert){ return }

    windowsHandler.handleChangeFocusedWindow(true) 
    windowsHandler.settings.handleMinimize(true)
  }

  const documentsHandleOpen = () => { 
    //if alert dialogue is open, allow nothing to be opened
    if(windowsHandler.windowsOpen.alert){ return }

    windowsHandler.handleFocusedWindow("documents") 
    windowsHandler.documents.handleOpen(true)

    //check if window is minimized, if so, play animation to drag window back above navbar
    if(windowsHandler.windowsMinimized.documents){
      pullUpWindowAnimation("documents")
      windowsHandler.documents.handleMinimize(false)
    }

    //check if entry doesn't exist, if so, add it (otherwise it will continuously add for every handleOpen() call) 
    if(!navbarHandler.navbarIconsOpen.documents){
      setNavbarOrder()
      navbarHandler.documents.handleOpen(true)
    }
  }
  const documentsHandleClose = () => {
    //if alert dialogue is open, allow nothing to be closed
    if(windowsHandler.windowsOpen.alert){ return }
    
    windowsHandler.handleChangeFocusedWindow(true) 
    windowsHandler.documents.handleOpen(false)
    navbarHandler.documents.handleOpen(false)
  }
  const documentsHandleMinimize = () => {
    //if alert dialogue is open, allow nothing to be minimized
    if(windowsHandler.windowsOpen.alert){ return }

    windowsHandler.handleChangeFocusedWindow(true) 
    windowsHandler.documents.handleMinimize(true)
  }

  const portfolioHandleOpen = () => { 
    //if alert dialogue is open, allow nothing to be opened
    if(windowsHandler.windowsOpen.alert){ return }

    windowsHandler.handleFocusedWindow("portfolio") 
    windowsHandler.portfolio.handleOpen(true)

    //check if window is minimized, if so, play animation to drag window back above navbar
    if(windowsHandler.windowsMinimized.portfolio){
      pullUpWindowAnimation("portfolio")
      windowsHandler.portfolio.handleMinimize(false)
    }

    //check if entry doesn't exist, if so, add it (otherwise it will continuously add for every handleOpen() call) 
    if(!navbarHandler.navbarIconsOpen.portfolio){
      setNavbarOrder()
      navbarHandler.portfolio.handleOpen(true)
    }
  }
  const portfolioHandleClose = () => { 
    //if alert dialogue is open, allow nothing to be closed
    if(windowsHandler.windowsOpen.alert){ return }

    windowsHandler.handleChangeFocusedWindow(true) 
    windowsHandler.portfolio.handleOpen(false)
    navbarHandler.portfolio.handleOpen(false)
  }
  const portfolioHandleMinimize = () => {
    //if alert dialogue is open, allow nothing to be minimized
    if(windowsHandler.windowsOpen.alert){ return }

    windowsHandler.handleChangeFocusedWindow(true) 
    windowsHandler.portfolio.handleMinimize(true)
  }

  const imageViewerHandleOpen = () => { 
    //if alert dialogue is open, allow nothing to be opened
    if(windowsHandler.windowsOpen.alert){ return }

    windowsHandler.handleFocusedWindow("imageViewer") 
    windowsHandler.imageViewer.handleOpen(true)

    //check if window is minimized, if so, play animation to drag window back above navbar
    if(windowsHandler.windowsMinimized.imageViewer){
      pullUpWindowAnimation("imageViewer")
      windowsHandler.imageViewer.handleMinimize(false)
    }

    //check if entry doesn't exist, if so, add it (otherwise it will continuously add for every handleOpen() call) 
    if(!navbarHandler.navbarIconsOpen.imageViewer){
      setNavbarOrder()
      navbarHandler.imageViewer.handleOpen(true)
    }
  }
  const imageViewerHandleClose = () => { 
    //if alert dialogue is open, allow nothing to be closed
    if(windowsHandler.windowsOpen.alert){ return }

    windowsHandler.handleChangeFocusedWindow(true) 
    windowsHandler.imageViewer.handleOpen(false)
    windowsHandler.imageViewer.handleMaximize(false)
    navbarHandler.imageViewer.handleOpen(false)
    document.onkeyup = null  //detach onkeyup event listener
  }
  const imageViewerHandleMinimize = () => {
    //if alert dialogue is open, allow nothing to be minimized
    if(windowsHandler.windowsOpen.alert){ return }

    windowsHandler.handleChangeFocusedWindow(true) 
    windowsHandler.imageViewer.handleMinimize(true)
  }
  const imageViewerHandleMaximize = () => {
    //if alert dialogue is open, allow nothing to be maximized
    if(windowsHandler.windowsOpen.alert){ return }

    if(!windowsHandler.windowsMaximized.imageViewer){ windowsHandler.imageViewer.handleMaximize(true) }
    else{ windowsHandler.imageViewer.handleMaximize(false) }
    windowsHandler.handleChangeFocusedWindow(true)
  }

  const alertHandleOpen = () => { 
    windowsHandler.handleFocusedWindow("alert") 
    windowsHandler.alert.handleOpen(true)

    //check if entry doesn't exist, if so, add it (otherwise it will continuously add for every handleOpen() call) 
    if(!navbarHandler.navbarIconsOpen.alert){
      setNavbarOrder()
      navbarHandler.alert.handleOpen(true)
    }
  }
  const alertHandleClose = () => { 
    windowsHandler.handleChangeFocusedWindow(true) 
    windowsHandler.alert.handleOpen(false)
    navbarHandler.alert.handleOpen(false)
  }

  const textEditorHandleOpen = () => { 
    //if alert dialogue is open, allow nothing to be opened
    if(windowsHandler.windowsOpen.alert){ return }

    windowsHandler.handleFocusedWindow("textEditor") 
    windowsHandler.textEditor.handleOpen(true)

    //check if window is minimized, if so, play animation to drag window back above navbar
    if(windowsHandler.windowsMinimized.textEditor){
      pullUpWindowAnimation("textEditor")
      windowsHandler.textEditor.handleMinimize(false)
    }

    //check if entry doesn't exist, if so, add it (otherwise it will continuously add for every handleOpen() call) 
    if(!navbarHandler.navbarIconsOpen.textEditor){
      setNavbarOrder()
      navbarHandler.textEditor.handleOpen(true)
    }
  }
  const textEditorHandleClose = () => { 
    //if alert dialogue is open, allow nothing to be closed
    if(windowsHandler.windowsOpen.alert){ return }

    windowsHandler.handleChangeFocusedWindow(true) 
    windowsHandler.textEditor.handleOpen(false)
    navbarHandler.textEditor.handleOpen(false)
  }
  const textEditorHandleMinimize = () => {
    //if alert dialogue is open, allow nothing to be minimized
    if(windowsHandler.windowsOpen.alert){ return }

    windowsHandler.handleChangeFocusedWindow(true) 
    windowsHandler.textEditor.handleMinimize(true)
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

    //documents desktop icon
    {
      className: "icon-documents",
      onClick: () => { handleDocumentsDirToOpen("Documents"); documentsHandleOpen() },
      Icon: FolderIcon,
      label: "Documents",
    },

    //pictures desktop icon
    {
      className: "icon-pictures",
      onClick: () => { handleDocumentsDirToOpen("Pictures"); documentsHandleOpen() },
      Icon: ImagesIcon,
      label: "Pictures",
    },

    //settings desktop icon
    {
      className: "icon-settings",
      onClick: settingsHandleOpen,
      Icon: MoonStarIcon,
      label: "Settings",
    },

    //tutorial desktop icon
    {
      className: "icon-tutorial",
      onClick: () => { handleAlertDescription("Coming soon"); alertHandleOpen() },
      Icon: ImageIcon,
      label: "tutorial.png",
    }
  ]

  const navbarIconData = [

    //archive navbar icon
    {
      windowOpen: windowsHandler.windowsOpen.archive,
      windowMinimized: windowsHandler.windowsMinimized.archive,
      windowFocused: windowFocusedData.archive,
      className: "archive",
      onClick: archiveHandleOpen,
      Icon: ArchiveIcon,
      label: "Archive"
    },

    //logs navbar icon
    {
      windowOpen: windowsHandler.windowsOpen.logs,
      windowMinimized: windowsHandler.windowsMinimized.logs,
      windowFocused: windowFocusedData.logs,
      className: "logs",
      onClick: logsHandleOpen,
      Icon: LogsIcon,
      label: "Data Logs"
    },

    //settings navbar icon
    {
      windowOpen: windowsHandler.windowsOpen.settings,
      windowMinimized: windowsHandler.windowsMinimized.settings,
      windowFocused: windowFocusedData.settings,
      className: "settings",
      onClick: settingsHandleOpen,
      Icon: MoonStarIcon,
      label: "Settings"
    },

    //documents navbar icon
    {
      windowOpen: windowsHandler.windowsOpen.documents,
      windowMinimized: windowsHandler.windowsMinimized.documents,
      windowFocused: windowFocusedData.documents,
      className: "documents",
      onClick: documentsHandleOpen,
      Icon: FolderIcon,
      label: "Documents"
    },

    //portfolio navbar icon
    {
      windowOpen: windowsHandler.windowsOpen.portfolio,
      windowMinimized: windowsHandler.windowsMinimized.portfolio,
      windowFocused: windowFocusedData.portfolio,
      className: "portfolio",
      onClick: portfolioHandleOpen,
      Icon: PortfolioIcon,
      label: "Portfolio"
    },

    //image viewer navbar icon
    {
      windowOpen: windowsHandler.windowsOpen.imageViewer,
      windowMinimized: windowsHandler.windowsMinimized.imageViewer,
      windowFocused: windowFocusedData.imageViewer,
      className: "imageViewer",
      onClick: imageViewerHandleOpen,
      Icon: ImageViewerIcon,
      label: "Ivy"
    },

    //alert navbar icon
    {
      windowOpen: windowsHandler.windowsOpen.alert,
      windowMinimized: windowsHandler.windowsMinimized.alert,
      windowFocused: windowFocusedData.alert,
      className: "alert",
      onClick: alertHandleOpen,
      Icon: AlertIcon,
      label: "Alert"
    },

    //text editor navbar icon
    {
      windowOpen: windowsHandler.windowsOpen.textEditor,
      windowMinimized: windowsHandler.windowsMinimized.textEditor,
      windowFocused: windowFocusedData.textEditor,
      className: "textEditor",
      onClick: textEditorHandleOpen,
      Icon: NoteIcon,
      label: "Notus"
    }
  ]


  //--WINDOWS CREATION DATA--//
  const windowsCreationData = [

    //template
    {
      windowOpen: windowsHandler.windowsOpen.NAMEHERE,
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
      windowOpen: windowsHandler.windowsOpen.archive,
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
        //no page props
      }
    },

    //data logs window
    {
      windowOpen: windowsHandler.windowsOpen.logs,
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
      windowOpen: windowsHandler.windowsOpen.settings,
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
        setAlertOpen: alertHandleOpen,
        setErrorDescription: handleAlertDescription,
        notusHandlers: notusHandlers,
        selectedWallpaper: selectedWallpaper,
        selectedTheme: selectedTheme,
        currentArrayIndex: currentArrayIndex,
        brightnessValue: brightnessValue
      }
    },

    //documents window
    {
      windowOpen: windowsHandler.windowsOpen.documents,
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
      windowOpen: windowsHandler.windowsOpen.portfolio,
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
      windowOpen: windowsHandler.windowsOpen.imageViewer,
      id: "window-imageViewer",
      windowRef: imageViewerWindowAnimation,
      headerProps: {
        headerName: `Ivy - ${ivyImageHeaderName}`,
        Icon: ImageViewerIcon,
        setClose: imageViewerHandleClose,
        setMinimize: imageViewerHandleMinimize,
        setMaximize: imageViewerHandleMaximize,
        keepMaximize: true,
        maximized: windowsHandler.windowsMaximized.imageViewer
      },
      PageComponent: ImageHandler,
      pageProps: {
        selectedImage: currentIvyImage,
        isOpen: windowsHandler.windowsOpen.imageViewer,
        isMaximized: windowsHandler.windowsMaximized.imageViewer,
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
      windowOpen: windowsHandler.windowsOpen.alert,
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
      windowOpen: windowsHandler.windowsOpen.textEditor,
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
        isOpen: windowsHandler.windowsOpen.textEditor,
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

  //set currently active window
  function setActiveWindow(currentActiveWindow){

    //create array of all windows
    // var archiveWindow = document.getElementById("window-archive")
    const allWindowsArray = Object.keys(windowsHandler.windowsOpen)
    const windows = allWindowsArray.reduce((array, id) => {
      array[id] = document.getElementById(`window-${id}`)  //REVIEW: this might be a problem later on
      return array
    }, {})
    // console.log(windows)

    //reorganize the window array to represent actual window hierarchy
    if(!currentActiveWindow){ return }
    
    //zIndex ordering (doesn't exist will be 9, while bottom will be 10)
    //add 20 to alert (is an important window/dialogue, so it goes above everything)
    const windowsIndexes = allWindowsArray.reduce((acc, id) => {
      const index = windowsStack.indexOf(id)
      acc[id] = index + (id == "alert" ? 20 : 10)
      return acc
    }, {})
    
    //check if active window is none
    if(currentActiveWindow == "none"){
      Object.values(windows).forEach(window => {
        if(window){ window.style.zIndex = 9 }
      })
      
      setNavbarColors("none")
      windowsHandler.handleFocusedWindow("none")
      return
    }

    //set all windows' zIndex
    //if window exists, set zIndex to above grabbed zIndex, otherwise set to null
    allWindowsArray.forEach(id => {
      if(windows[id]){ windows[id].style.zIndex = windowsIndexes[id] }
    })

    //set navbarColors and focusedWindow
    windowsHandler.handleFocusedWindow(currentActiveWindow)
    setNavbarColors(currentActiveWindow)
    setNavbarOrder()
  }

  //set navbar colors/styles (when selected/focused)
  function setNavbarColors(currentSelectedIcon){

    //get root style of icons, and get globalColor ":root" style
    //NOTE: rootStyle is the local rootStyle (non-computed), while globalColor (computed) references the actual global variables 
    var rootStyle = document.documentElement.style
    var globalColor = getComputedStyle(document.querySelector(':root')).getPropertyValue('--globalColor')
    // console.log("focused: " + currentSelectedIcon)

    //navbar background properties
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
    
    //navbar selected properties
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

    //set all to false
    navbarBackgroundColors.forEach(property => { rootStyle.setProperty(`--${property}`, '#000') })
    navbarSelectedColors.forEach(property => { rootStyle.setProperty(`--${property}`, globalColor) })
    rootStyle.setProperty('--everythingButAlertBlur', '0px')

    
    //navbar icon properties 
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

  function setNavbarOrder(){
    const iconOpened = navbarIconsArray[navbarIconsArray.length - 1]
    const indexOfIcon = navbarIconsArray.indexOf(iconOpened)
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

    //sets order of icon on navbar
    const rootStyle = document.documentElement.style
    const cssVariable = iconOrderData[iconOpened]
    if(cssVariable){ rootStyle.setProperty(cssVariable, indexOfIcon) }
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

        rootStyle.setProperty("--desktopWallpaper", "/Wallpapers/Wallpaper-WorldMachine.webp")
        rootStyle.setProperty("--globalColor", "#9665ff")
        rootStyle.setProperty("--globalColorHover", "#6a3ad1")
        rootStyle.setProperty("--globalHoverBorderColor", "rgba(106, 64, 197, 0.5)")
        rootStyle.setProperty("--globalHoverBackgroundColor", "rgba(44, 24, 87, 0.5)")
        rootStyle.setProperty("--desktopWallpaperBrightness", "100")
        
        localStorage.setItem("selectedWallpaper", "WorldMachine")
        localStorage.setItem("selectedTheme", "Purple")
        localStorage.setItem("desktopWallpaper", `url("/Wallpapers/Wallpaper-WorldMachine.webp")`)
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


  //--ON SERVER INIT & WHEN WINDOWS OPEN/FOCUS/CLOSE--//
  useEffect(() => {
    
    //if windows close, make the window that is still open the active window
    if(changeFocusedWindow){
      let amountOfWindows = windowsStack.length - 2
      if(amountOfWindows === 0){ setActiveWindow("none"); console.log("none here") }
      if(amountOfWindows === 1){ setActiveWindow(windowsStack[1]); console.log("only one left") }
      if(amountOfWindows >= 2){ setActiveWindow(windowsStack[windowsStack.length - 2]); console.log("two or more left") }
      windowsHandler.handleChangeFocusedWindow(false)
      console.log(windowsStack)
      console.log(currentFocusedWindow)

      //close desktopMenu is not open, but also change focused window to something else if something else is open
      if(currentFocusedWindow != "desktopMenu" && currentFocusedWindow != "none"){
        handleDesktopMenuOpen(false)
      }
      return
    }
    
    //if the window is not set to change, set the current focused window as active
    if(!changeFocusedWindow){
      setActiveWindow(currentFocusedWindow)

      //close desktopMenu if another window gets focused
      if(windowsHandler.windowsOpen.desktopMenu && currentFocusedWindow != "desktopMenu"){
        handleDesktopMenuOpen(false)
      }
    }
  }, [windowsHandler.windowsOpen, currentFocusedWindow, windowsStack, changeFocusedWindow, dropWindowAnimation])


  //--ON SERVER INIT & WHEN WINDOWS MINIMIZE--//
  useEffect(() => {

    //convert all windows into an array to be filtered through below
    const windows = Object.keys(windowsHandler.windowsMinimized)

    //play animation to drop window below navbar
    windows.forEach(window => {
      if(windowsHandler.windowsMinimized[window]){ 
        dropWindowAnimation(window) 
      }
    })
  }, [windowsHandler.windowsMinimized])

  
  //--ON SERVER INIT & WHEN WINDOWS MAXIMIZE--//
  useEffect(() => {

    //play animation to maximize window
    if(windowsHandler.windowsMaximized.imageViewer){
      enlargeWindowAnimation("imageViewer")
      document.getElementById("window-imageViewer").setAttribute("style", "width:100%; height:100%; top:0; left:0; border-width:0")
    }
    else if(!windowsHandler.windowsMaximized.imageViewer && windowsHandler.windowsOpen.imageViewer){
      shrinkWindowAnimation("imageViewer")
      document.getElementById("window-imageViewer").setAttribute("style", "width:fit-content; height:fit-content; top:140px; left:360px; border-width:4px")
    }
  }, [windowsHandler.windowsMaximized])


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
        if(windowsHandler.windowsOpen.alert){ return }

        //upon dragging/clicking-on, set that window that is being dragged to be the active window
        //REVIEW: this can be optimized
        switch(e.target.parentElement.parentElement.id){
          case "window-archive":
            setActiveWindow("archive")
            break

          case "window-logs":
            setActiveWindow("logs")
            break

          case "window-settings":
            setActiveWindow("settings")
            break

          case "window-documents":
            setActiveWindow("documents")
            break

          case "window-portfolio":
            setActiveWindow("portfolio")
            break

          case "window-imageViewer":
            setActiveWindow("imageViewer")
            break
          
          case "window-alert":
            setActiveWindow("alert")
            break

          case "window-textEditor":
            setActiveWindow("textEditor")
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
          <AnimatePresence>
            {windowsHandler.windowsOpen.desktopMenu && <DesktopMenu/>}
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
              <div onClick={() => handleDesktopMenuOpen(!windowsHandler.windowsOpen.desktopMenu)}>
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
                      windowMinimized={data.windowMinimized}
                      windowFocused={data.windowFocused}
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