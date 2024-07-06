"use client"

import { useEffect, useState } from 'react'
import { AlertIcon, ArchiveIcon, FolderIcon, ImageIcon, ImageViewerIcon, ImagesIcon, LogsIcon, NoteIcon, PortfolioIcon, MoonStarIcon } from '@/components/SvgHandler'
import { Button } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { AnimatePresence, motion, useAnimate } from 'framer-motion'
import Image from 'next/image'

import WindowHeader from '@/components/WindowHeader'
import archiveStyles from '@/styles/Archive.module.css'
import logsStyles from '@/styles/Logs.module.css'
import settingsStyles from '@/styles/Settings.module.css'
import documentsStyles from '@/styles/Documents.module.css'
import portfolioStyles from '@/styles/Portfolio.module.css'
import imageViewerStyles from '@/styles/ImageViewer.module.css'
import alertStyles from '@/styles/AlertDialogue.module.css'
import textEditorStyles from '@/styles/TextEditor.module.css'

import Archive from './archive/page'
import Logs from './logs/page'
import Settings from './settings/page'
import Documents from './documents/page'
import Portfolio from './portfolio/page'
import ImageHandler from '@/components/ImageHandler'
import AlertDialogue from '@/components/AlertDialogue'
import TextEditor from '@/components/TextEditor'
import Login from './login/page'



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
  const [selectedWallpaper, setSelectedWallpaper] = useState("Starry")
  const [selectedTheme, setSelectedTheme] = useState("Purple")
  const [currentArrayIndex, setCurrentArrayIndex] = useState(0)
  const [brightnessValue, setBrightnessValue] = useState(100)
  
  //window open states
  const [windowsOpen, setWindowsOpen] = useState({
    archive: false,
    logs: false,
    settings: false,
    documents: false,
    portfolio: false,
    imageViewer: false,
    alert: false,
    textEditor: false
  })

  //window minimized states
  const [windowsMinimized, setWindowsMinimized] = useState({
    archive: false,
    logs: false,
    settings: false,
    documents: false,
    portfolio: false,
    imageViewer: false,
    textEditor: false
  })

  //window maximized states
  const [windowsMaximized, setWindowsMaximized] = useState({
    imageViewer: false
  })

  //other states
  const [currentFocusedWindow, setCurrentFocusedWindow] = useState("none")
  const [changeFocusedWindow, setChangeFocusedWindow] = useState(false)
  const [currentWindowsOpen, setCurrentWindowsOpen] = useState(["none"])
  const [currentNavbarIconsOpen, setCurrentNavbarIconsOpen] = useState(["none"])
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
    if(!e){ console.log("woahhhhhh loginOpen undefined"); return }
    console.log("opening/closing login")
    setLoginOpen(e)
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


  //--WINDOW OPEN/CLOSE/MINIMIZE/MAXIMIZE HANDLERS--//
  const archiveHandleOpen = () => { 
    //if alert dialogue is open, allow nothing to be opened
    if(windowsOpen.alert){ return }

    // if(denyAccess){
    //   alertHandleOpen()
    //   return
    // }

    setCurrentFocusedWindow("archive")
    setWindowsOpen({ ...windowsOpen, archive: true })
    
    //check if window is minimized, if so, play animation to drag window back above navbar
    if(windowsMinimized.archive){
      pullUpWindowAnimation("archive")
      setWindowsMinimized({ ...windowsMinimized, archive: false })
    }
    
    //check if entry doesn't exist, if so, add it (otherwise it will continuously add for every handleOpen() call) 
    if(currentWindowsOpen.indexOf("archive") == -1){
      setNavbarOrder("open")
      setCurrentWindowsOpen([...currentWindowsOpen, "archive"]) //add "archive" to the array
      setCurrentNavbarIconsOpen([...currentNavbarIconsOpen, "archive"])
    }
  }
  const archiveHandleClose = () => { 
    //if alert dialogue is open, allow nothing to be closed
    if(windowsOpen.alert){ return }

    setChangeFocusedWindow(true) 
    setWindowsOpen({ ...windowsOpen, archive: false })
    setCurrentWindowsOpen(currentWindowsOpen.filter(a => a !== "archive")) //remove "archive" from the array
    setCurrentNavbarIconsOpen(currentNavbarIconsOpen.filter(a => a !== "archive"))
  }
  const archiveHandleMinimize = () => {
    //if alert dialogue is open, allow nothing to be minimized
    if(windowsOpen.alert){ return }

    setChangeFocusedWindow(true) 
    setWindowsMinimized({ ...windowsMinimized, archive: true })
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
    setWindowsOpen({ ...windowsOpen, logs: true })

    //check if window is minimized, if so, play animation to drag window back above navbar
    if(windowsMinimized.logs){
      pullUpWindowAnimation("logs")
      setWindowsMinimized({ ...windowsMinimized, logs: false })
    }

    //check if entry doesn't exist, if so, add it (otherwise it will continuously add for every handleOpen() call) 
    if(currentWindowsOpen.indexOf("logs") == -1){
      setCurrentWindowsOpen([...currentWindowsOpen, "logs"]) //add "logs" to the array
      setCurrentNavbarIconsOpen([...currentNavbarIconsOpen, "logs"])
      setNavbarOrder("open")
    }
  }
  const logsHandleClose = () => { 
    //if alert dialogue is open, allow nothing to be closed
    if(windowsOpen.alert){ return }

    setChangeFocusedWindow(true) 
    setWindowsOpen({ ...windowsOpen, logs: false }) 
    setCurrentWindowsOpen(currentWindowsOpen.filter(a => a !== "logs")) //remove "logs" from the array
    setCurrentNavbarIconsOpen(currentNavbarIconsOpen.filter(a => a !== "logs"))
  }
  const logsHandleMinimize = () => {
    //if alert dialogue is open, allow nothing to be minimized
    if(windowsOpen.alert){ return }

    setChangeFocusedWindow(true) 
    setWindowsMinimized({ ...windowsMinimized, logs: true })
    setCurrentWindowsOpen(currentWindowsOpen.filter(a => a !== "logs")) //remove "logs" from the array
    setCurrentNavbarIconsOpen(currentNavbarIconsOpen.filter(a => a !== "logs"))
  }
  
  const settingsHandleOpen = () => { 
    //if alert dialogue is open, allow nothing to be opened
    if(windowsOpen.alert){ return }

    setCurrentFocusedWindow("settings") 
    setWindowsOpen({ ...windowsOpen, settings: true })

    //check if window is minimized, if so, play animation to drag window back above navbar
    if(windowsMinimized.settings){
      pullUpWindowAnimation("settings")
      setWindowsMinimized({ ...windowsMinimized, settings: false })
    }

    //check if entry doesn't exist, if so, add it (otherwise it will continuously add for every handleOpen() call) 
    if(currentWindowsOpen.indexOf("settings") == -1){
      setCurrentWindowsOpen([...currentWindowsOpen, "settings"]) //add "settings" to the array
      setCurrentNavbarIconsOpen([...currentNavbarIconsOpen, "settings"])
      setNavbarOrder("open")
    }
  }
  const settingsHandleClose = () => { 
    //if alert dialogue is open, allow nothing to be closed
    if(windowsOpen.alert){ return }

    setChangeFocusedWindow(true) 
    setWindowsOpen({ ...windowsOpen, settings: false })
    setCurrentWindowsOpen(currentWindowsOpen.filter(a => a !== "settings")) //remove "settings" from the array
    setCurrentNavbarIconsOpen(currentNavbarIconsOpen.filter(a => a !== "settings"))
  }
  const settingsHandleMinimize = () => {
    //if alert dialogue is open, allow nothing to be minimized
    if(windowsOpen.alert){ return }

    setChangeFocusedWindow(true) 
    setWindowsMinimized({ ...windowsMinimized, settings: true })
    setCurrentWindowsOpen(currentWindowsOpen.filter(a => a !== "settings")) //remove "settings" from the array
    setCurrentNavbarIconsOpen(currentNavbarIconsOpen.filter(a => a !== "settings"))
  }

  const documentsHandleOpen = () => { 
    //if alert dialogue is open, allow nothing to be opened
    if(windowsOpen.alert){ return }

    setCurrentFocusedWindow("documents") 
    setWindowsOpen({ ...windowsOpen, documents: true })

    //check if window is minimized, if so, play animation to drag window back above navbar
    if(windowsMinimized.documents){
      pullUpWindowAnimation("documents")
      setWindowsMinimized({ ...windowsMinimized, documents: false })
    }

    //check if entry doesn't exist, if so, add it (otherwise it will continuously add for every handleOpen() call) 
    if(currentWindowsOpen.indexOf("documents") == -1){
      setCurrentWindowsOpen([...currentWindowsOpen, "documents"]) //add "documents" to the array
      setCurrentNavbarIconsOpen([...currentNavbarIconsOpen, "documents"])
      setNavbarOrder("open")
    }
  }
  const documentsHandleClose = () => {
    //if alert dialogue is open, allow nothing to be closed
    if(windowsOpen.alert){ return }
    
    setChangeFocusedWindow(true) 
    setWindowsOpen({ ...windowsOpen, documents: false })
    setCurrentWindowsOpen(currentWindowsOpen.filter(a => a !== "documents")) //remove "documents" from the array
    setCurrentNavbarIconsOpen(currentNavbarIconsOpen.filter(a => a !== "documents"))
  }
  const documentsHandleMinimize = () => {
    //if alert dialogue is open, allow nothing to be minimized
    if(windowsOpen.alert){ return }

    setChangeFocusedWindow(true) 
    setWindowsMinimized({ ...windowsMinimized, documents: true })
    setCurrentWindowsOpen(currentWindowsOpen.filter(a => a !== "documents")) //remove "documents" from the array
    setCurrentNavbarIconsOpen(currentNavbarIconsOpen.filter(a => a !== "documents"))
  }

  const portfolioHandleOpen = () => { 
    //if alert dialogue is open, allow nothing to be opened
    if(windowsOpen.alert){ return }

    setCurrentFocusedWindow("portfolio") 
    setWindowsOpen({ ...windowsOpen, portfolio: true })

    //check if window is minimized, if so, play animation to drag window back above navbar
    if(windowsMinimized.portfolio){
      pullUpWindowAnimation("portfolio")
      setWindowsMinimized({ ...windowsMinimized, portfolio: false })
    }

    //check if entry doesn't exist, if so, add it (otherwise it will continuously add for every handleOpen() call) 
    if(currentWindowsOpen.indexOf("portfolio") == -1){
      setCurrentWindowsOpen([...currentWindowsOpen, "portfolio"]) //add "portfolio" to the array
      setCurrentNavbarIconsOpen([...currentNavbarIconsOpen, "portfolio"])
      setNavbarOrder("open")
    }
  }
  const portfolioHandleClose = () => { 
    //if alert dialogue is open, allow nothing to be closed
    if(windowsOpen.alert){ return }

    setChangeFocusedWindow(true) 
    setWindowsOpen({ ...windowsOpen, portfolio: false })
    setCurrentWindowsOpen(currentWindowsOpen.filter(a => a !== "portfolio")) //remove "portfolio" from the array
    setCurrentNavbarIconsOpen(currentNavbarIconsOpen.filter(a => a !== "portfolio"))
  }
  const portfolioHandleMinimize = () => {
    //if alert dialogue is open, allow nothing to be minimized
    if(windowsOpen.alert){ return }

    setChangeFocusedWindow(true) 
    setWindowsMinimized({ ...windowsMinimized, portfolio: true })
    setCurrentWindowsOpen(currentWindowsOpen.filter(a => a !== "portfolio")) //remove "portfolio" from the array
    setCurrentNavbarIconsOpen(currentNavbarIconsOpen.filter(a => a !== "portfolio"))
  }

  const imageViewerHandleOpen = () => { 
    //if alert dialogue is open, allow nothing to be opened
    if(windowsOpen.alert){ return }

    setCurrentFocusedWindow("imageViewer") 
    setWindowsOpen({ ...windowsOpen, imageViewer: true })

    //check if window is minimized, if so, play animation to drag window back above navbar
    if(windowsMinimized.imageViewer){
      pullUpWindowAnimation("imageViewer")
      setWindowsMinimized({ ...windowsMinimized, imageViewer: false })
    }

    //check if entry doesn't exist, if so, add it (otherwise it will continuously add for every handleOpen() call) 
    if(currentWindowsOpen.indexOf("imageViewer") == -1){
      setCurrentWindowsOpen([...currentWindowsOpen, "imageViewer"]) //add "imageViewer" to the array
      setCurrentNavbarIconsOpen([...currentNavbarIconsOpen, "imageViewer"])
      setNavbarOrder("open")
    }
  }
  const imageViewerHandleClose = () => { 
    //if alert dialogue is open, allow nothing to be closed
    if(windowsOpen.alert){ return }

    setChangeFocusedWindow(true) 
    setWindowsOpen({ ...windowsOpen, imageViewer: false })
    setWindowsMaximized({ ...windowsMaximized, imageViewer: false })
    setCurrentWindowsOpen(currentWindowsOpen.filter(a => a !== "imageViewer")) //remove "imageViewer" from the array
    setCurrentNavbarIconsOpen(currentNavbarIconsOpen.filter(a => a !== "imageViewer"))
    document.onkeyup = null  //detach onkeyup event listener
  }
  const imageViewerHandleMinimize = () => {
    //if alert dialogue is open, allow nothing to be minimized
    if(windowsOpen.alert){ return }

    setChangeFocusedWindow(true) 
    setWindowsMinimized({ ...windowsMinimized, imageViewer: true })
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
    setWindowsOpen({ ...windowsOpen, alert: true })

    //check if entry doesn't exist, if so, add it (otherwise it will continuously add for every handleOpen() call) 
    if(currentWindowsOpen.indexOf("alert") == -1){
      setCurrentWindowsOpen([...currentWindowsOpen, "alert"]) //add "alert" to the array
      setCurrentNavbarIconsOpen([...currentNavbarIconsOpen, "alert"])
      setNavbarOrder("open")
    }
  }
  const alertHandleClose = () => { 
    setChangeFocusedWindow(true) 
    setWindowsOpen({ ...windowsOpen, alert: false }) 
    setCurrentWindowsOpen(currentWindowsOpen.filter(a => a !== "alert")) //remove "alert" from the array
    setCurrentNavbarIconsOpen(currentNavbarIconsOpen.filter(a => a !== "alert"))
  }

  const textEditorHandleOpen = () => { 
    //if alert dialogue is open, allow nothing to be opened
    if(windowsOpen.alert){ return }

    setCurrentFocusedWindow("textEditor") 
    setWindowsOpen({ ...windowsOpen, textEditor: true })

    //check if window is minimized, if so, play animation to drag window back above navbar
    if(windowsMinimized.textEditor){
      pullUpWindowAnimation("textEditor")
      setWindowsMinimized({ ...windowsMinimized, textEditor: false })
    }

    //check if entry doesn't exist, if so, add it (otherwise it will continuously add for every handleOpen() call) 
    if(currentWindowsOpen.indexOf("textEditor") == -1){
      setCurrentWindowsOpen([...currentWindowsOpen, "textEditor"]) //add "textEditor" to the array
      setCurrentNavbarIconsOpen([...currentNavbarIconsOpen, "textEditor"])
      setNavbarOrder("open")
    }
  }
  const textEditorHandleClose = () => { 
    //if alert dialogue is open, allow nothing to be closed
    if(windowsOpen.alert){ return }

    setChangeFocusedWindow(true) 
    setWindowsOpen({ ...windowsOpen, textEditor: false })
    setCurrentWindowsOpen(currentWindowsOpen.filter(a => a !== "textEditor")) //remove "textEditor" from the array
    setCurrentNavbarIconsOpen(currentNavbarIconsOpen.filter(a => a !== "textEditor"))
  }
  const textEditorHandleMinimize = () => {
    //if alert dialogue is open, allow nothing to be minimized
    if(windowsOpen.alert){ return }

    setChangeFocusedWindow(true) 
    setWindowsMinimized({ ...windowsMinimized, textEditor: true })
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


  //--MOTION VARIANTS--//
  const fadeIn = {
    initial: { opacity: 0, y: 10 },
    animate: { opacity: 1, y: 0 }
  }


  //--FUNCTIONS & STATE HANDLING--//
  function updateTime() {
    let date = new Date()
    let amORpm = date.getHours() >= 12 ? "PM" : "AM"

    let newTime = date.toLocaleTimeString('en-US', { hour12:false, hour:"2-digit", minute:"2-digit" })
    setCurrentTime(newTime + ` ${amORpm}`)
  }
  setInterval(updateTime, 1000)

  function moveElementInArray(arrayToMove, elementToMove){
    let indexToMove = arrayToMove.indexOf(elementToMove)
    arrayToMove.push(arrayToMove.splice(indexToMove, 1)[0])
  }

  //set currently active window
  function setActiveWindow(currentActiveWindow){
    var archiveWindow = document.getElementById("window-archive")
    var logsWindow = document.getElementById("window-logs")
    var settingsWindow = document.getElementById("window-settings")
    var documentsWindow = document.getElementById("window-documents")
    var portfolioWindow = document.getElementById("window-portfolio")
    var imageViewerWindow = document.getElementById("window-imageViewer")
    var alertWindow = document.getElementById("window-alert")
    var textEditorWindow = document.getElementById("window-textEditor")

    //reorganize the window array to represent actual window hierarchy
    if(!currentActiveWindow){ return }
    moveElementInArray(currentWindowsOpen, currentActiveWindow)
    // console.log(currentWindowsOpen)
    
    //zIndex ordering (doesn't exist will be 9, while bottom will be 10)
    var archiveIndex = currentWindowsOpen.indexOf("archive") + 10
    var logsIndex = currentWindowsOpen.indexOf("logs") + 10
    var settingsIndex = currentWindowsOpen.indexOf("settings") + 10
    var documentsIndex = currentWindowsOpen.indexOf("documents") + 10
    var portfolioIndex = currentWindowsOpen.indexOf("portfolio") + 10
    var imageViewerIndex = currentWindowsOpen.indexOf("imageViewer") + 10
    var alertIndex = currentWindowsOpen.indexOf("alert") + 20  //this is an important window/dialogue so it goes above everything
    var textEditorIndex = currentWindowsOpen.indexOf("textEditor") + 10
    
    //check if active window is none
    if(currentActiveWindow == "none"){
      archiveWindow ? archiveWindow.style.zIndex = 9 : null
      logsWindow ? logsWindow.style.zIndex = 9 : null
      settingsWindow ? settingsWindow.style.zIndex = 9 : null
      documentsWindow ? documentsWindow.style.zIndex = 9 : null
      portfolioWindow ? portfolioWindow.style.zIndex = 9 : null
      imageViewerWindow ? imageViewerWindow.style.zIndex = 9 : null
      alertWindow ? alertWindow.style.zIndex = 9 : null
      textEditorWindow ? textEditorWindow.style.zIndex = 9 : null
      
      setNavbarColors("none")
      setCurrentFocusedWindow("none")
      return
    }

    //set all windows' zIndex
    //if window exists, set zIndex to above grabbed zIndex, otherwise set to null
    archiveWindow ? archiveWindow.style.zIndex = archiveIndex : null
    logsWindow ? logsWindow.style.zIndex = logsIndex : null
    settingsWindow ? settingsWindow.style.zIndex = settingsIndex : null
    documentsWindow ? documentsWindow.style.zIndex = documentsIndex : null
    portfolioWindow ? portfolioWindow.style.zIndex = portfolioIndex : null
    imageViewerWindow ? imageViewerWindow.style.zIndex = imageViewerIndex : null
    alertWindow ? alertWindow.style.zIndex = alertIndex : null
    textEditorWindow ? textEditorWindow.style.zIndex = textEditorIndex : null

    //set navbarColors and focusedWindow
    switch(currentActiveWindow){
      case "archive":
        setNavbarColors("archive")
        setCurrentFocusedWindow("archive")
        break

      case "logs":
        setNavbarColors("logs")
        setCurrentFocusedWindow("logs")
        break

      case "settings":
        setNavbarColors("settings")
        setCurrentFocusedWindow("settings")
        break

      case "documents":
        setNavbarColors("documents")
        setCurrentFocusedWindow("documents")
        break

      case "portfolio":
        setNavbarColors("portfolio")
        setCurrentFocusedWindow("portfolio")
        break

      case "imageViewer":
        setNavbarColors("imageViewer")
        setCurrentFocusedWindow("imageViewer")
        break

      case "alert":
        setNavbarColors("alert")
        setCurrentFocusedWindow("alert")
        break

      case "textEditor":
        setNavbarColors("textEditor")
        setCurrentFocusedWindow("textEditor")
        break
    }

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
  
    rootStyle.setProperty('--navbarArchiveSelectedColor', globalColor)
    rootStyle.setProperty('--navbarLogsSelectedColor', globalColor)
    rootStyle.setProperty('--navbarSettingsSelectedColor', globalColor)
    rootStyle.setProperty('--navbarDocumentsSelectedColor', globalColor)
    rootStyle.setProperty('--navbarPortfolioSelectedColor', globalColor)
    rootStyle.setProperty('--navbarImageViewerSelectedColor', globalColor)
    rootStyle.setProperty('--navbarAlertSelectedColor', globalColor)
    rootStyle.setProperty('--navbarTextEditorSelectedColor', globalColor)

    rootStyle.setProperty('--everythingButAlertBlur', '0px')

    //set a specific icon to be active
    switch(currentSelectedIcon){
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
          <Login setLoginOpen={handleLoginOpen}/>
        </div>
      }

      {!loginOpen &&
        <div className="layout-content"> 
        {/* background image/video */}
        {/* <video className="backgroundVideo" src="videoLoop.webm" autoPlay loop muted preload="auto"/> */}
        <Image className="backgroundVideo" src={`Wallpapers/Wallpaper-${selectedWallpaper}.webp`} priority alt="wallpaper" width={100} height={100}/>

        <ThemeProvider theme={theme}>

          {/* desktop/icons layout */}
          <div className="desktop-layout">
            <AnimatePresence>

              {/* archive icon */}
              <motion.div 
                id="icon" 
                key={1}
                className="icon-documents" 
                variants={fadeIn}
                initial="initial"
                animate="animate"
                transition={{ duration: 0.4 }}
              >
                <Button disableRipple onClick={() => { handleDocumentsDirToOpen("Documents"); documentsHandleOpen() }}>
                  <FolderIcon width={56} height={56}/>
                  <h1>Documents</h1>
                </Button>
              </motion.div>

              {/* pictures icon */}
              <motion.div 
                id="icon" 
                key={2}
                className="icon-pictures"
                variants={fadeIn}
                initial="initial"
                animate="animate"
                transition={{ duration: 0.8 }}
              >
                <Button disableRipple onClick={() => { handleDocumentsDirToOpen("Pictures"); documentsHandleOpen() }}>
                  <ImagesIcon width={56} height={56}/>
                  <h1>Pictures</h1>
                </Button>
              </motion.div>

              {/* settings icon */}
              <motion.div 
                id="icon" 
                key={3}
                className="icon-settings" 
                variants={fadeIn}
                initial="initial"
                animate="animate"
                transition={{ duration: 0.6 }}
              >
                <Button disableRipple onClick={settingsHandleOpen}>
                  <MoonStarIcon width={56} height={56}/>
                  <h1>Settings</h1>
                </Button>
              </motion.div>

              {/* tutorial icon */}
              <motion.div 
                id="icon" 
                key={4}
                className="icon-tutorial"
                variants={fadeIn}
                initial="initial"
                animate="animate"
                transition={{ duration: 1.0 }}
              >
                <Button disableRipple onClick={() => { handleAlertDescription("Coming soon"); alertHandleOpen() }}>
                  <ImageIcon width={56} height={56}/>
                  <h1>tutorial.png</h1>
                </Button>
              </motion.div>

              {/* portfolio icon */}
              {/* <motion.div 
                id="icon" 
                key={5}
                className="icon-portfolio"
                variants={fadeIn}
                initial="initial"
                animate="animate"
                transition={{ duration: 1.0 }}
              >
                <Button disableRipple onClick={portfolioHandleOpen}>
                  <PortfolioIcon width={56} height={56}/>
                  <h1>Portfolio.exe</h1>
                </Button>
              </motion.div> */}
            </AnimatePresence>
          </div>


          {/* archive window */}
          <AnimatePresence>
            {windowsOpen.archive &&
              <motion.div 
                id="window-archive"
                className="draggable"
                ref={archiveWindowAnimation}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.35 }}
              >
                {/* false window header */}
                <div id="draggable-header">
                  <WindowHeader 
                    headerName="███hi██" 
                    selectedIcon="archiveIcon" 
                    setClose={archiveHandleClose} 
                    setMinimize={archiveHandleMinimize}
                  /> 
                </div>
                
                <div className={archiveStyles.archiveBody}>
                  <Archive/>
                </div>
              </motion.div>
            }
          </AnimatePresence>

          {/* data logs window */}
          <AnimatePresence>
            {windowsOpen.logs &&
              <motion.div 
                id="window-logs" 
                className="draggable"
                ref={logsWindowAnimation}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.5 }}
              >
                {/* false window header */}
                <div id="draggable-header">
                  <WindowHeader headerName="Data Logs" selectedIcon="logsIcon" setClose={logsHandleClose} setMinimize={logsHandleMinimize}/>
                </div>

                <div className={logsStyles.logsBody}>
                  <Logs/>
                </div>
              </motion.div>
            }
          </AnimatePresence>

          {/* settings window */}
          <AnimatePresence>
            {windowsOpen.settings &&
              <motion.div 
                id="window-settings" 
                className="draggable"
                ref={settingsWindowAnimation}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.5 }}
              >
                {/* false window header */}
                <div id="draggable-header">
                  <WindowHeader headerName="Settings" selectedIcon="moonStarIcon" setClose={settingsHandleClose} setMinimize={settingsHandleMinimize}/>
                </div>

                <div className={settingsStyles.settingsBody}>
                  <Settings
                    setSelectedWallpaper={handleSelectedWallpaper}
                    setSelectedTheme={handleSelectedTheme}
                    setCurrentArrayIndex={handleCurrentArrayIndex}
                    setBrightnessValue={handleBrightnessValue}
                    selectedWallpaper={selectedWallpaper}
                    selectedTheme={selectedTheme}
                    currentArrayIndex={currentArrayIndex}
                    brightnessValue={brightnessValue}
                  />
                </div>
              </motion.div>
            }
          </AnimatePresence>

          {/* documents window */}
          <AnimatePresence>
            {windowsOpen.documents &&
              <motion.div 
                id="window-documents" 
                className="draggable"
                ref={documentsWindowAnimation}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.5 }}
              >
                {/* false window header */}
                <div id="draggable-header">
                  <WindowHeader headerName="Documents" selectedIcon="folderIcon" setClose={documentsHandleClose} setMinimize={documentsHandleMinimize} newHeaderName={windowHeaderName}/>
                </div>

                <div className={documentsStyles.documentsBody}>
                  <Documents 
                    currentOpenDir={documentsDirToOpen}
                    ivyHandlers={ivyHandlers}
                    notusHandlers={notusHandlers}
                    setHeaderName={handleWindowHeaderName}
                    setArchiveOpen={archiveHandleOpen} 
                    setAlertOpen={alertHandleOpen}
                    setIvyOpen={imageViewerHandleOpen}
                    setNotusOpen={textEditorHandleOpen}
                    setErrorDescription={handleAlertDescription}
                  />
                </div>
              </motion.div>
            }
          </AnimatePresence>

          {/* portfolio window */}
          <AnimatePresence>
            {windowsOpen.portfolio &&
              <motion.div 
                id="window-portfolio"
                ref={portfolioWindowAnimation}
                initial={{ opacity: 0, y: 20, scale: 0.75 }} //TODO: add little animation here to open the window a little more nicely
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 16, scale: 0.75 }}
                transition={{ duration: 0.5 }}
              >
                {/* false window header */}
                <div>
                  <WindowHeader headerName="Portfolio" selectedIcon="portfolioIcon" setClose={portfolioHandleClose} setMinimize={portfolioHandleMinimize} keepMaximize={true}/>
                </div>

                <div className={portfolioStyles.portfolioBody}>
                  <Portfolio 
                    setIvyOpen={imageViewerHandleOpen} 
                    setIvyImage={handleIvyImage} 
                    setIvyImageWidth={handleIvyImageWidth} 
                    setIvyImageHeight={handleIvyImageHeight}
                    setIvyImageDescription={handleIvyImageDescription}
                  />
                </div>
              </motion.div>
            }
          </AnimatePresence>

          {/* image viewer window */}
          <AnimatePresence>
            {windowsOpen.imageViewer &&
              <motion.div 
                id="window-imageViewer" 
                className="draggable"
                ref={imageViewerWindowAnimation}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.5 }}
              >
                {/* false window header */}
                <div id="draggable-header">
                  <WindowHeader 
                    headerName={`Ivy - ${ivyImageHeaderName}`} 
                    selectedIcon="imageViewerIcon" 
                    setClose={imageViewerHandleClose} 
                    setMinimize={imageViewerHandleMinimize} 
                    setMaximize={imageViewerHandleMaximize} 
                    keepMaximize={true}
                    maximized={windowsMaximized.imageViewer}
                  />
                </div>

                <div className={imageViewerStyles.imageViewerBody}>
                  <ImageHandler 
                    selectedImage={currentIvyImage} 
                    isOpen={windowsOpen.imageViewer} 
                    isMaximized={windowsMaximized.imageViewer}
                    imageWidth={ivyImageWidth} 
                    imageHeight={ivyImageHeight} 
                    imageDescription={ivyImageDescription}
                    imageArrayIndex={ivyArrayIndex}
                    setHeaderName={handleIvyHeaderName}
                    imageHeader={ivyImageHeaderName}
                  />
                </div>
              </motion.div>
            }
          </AnimatePresence>

          {/* alert dialogue window */}
          <AnimatePresence>
            {windowsOpen.alert &&
              <motion.div 
                id="window-alert"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.5 }}
              >
                {/* false window header */}
                <div>
                  <WindowHeader headerName="Error" selectedIcon="alertIcon" setClose={alertHandleClose} newHeaderName={windowHeaderName} removeMinimize={true}/>
                </div>

                <div className={alertStyles.alertBody}>
                  <AlertDialogue setClose={alertHandleClose} errorDescription={alertDescription}/>
                </div>
              </motion.div>
            }
          </AnimatePresence>

          {/* text editor window */}
          <AnimatePresence>
            {windowsOpen.textEditor &&
              <motion.div 
                id="window-textEditor" 
                className="draggable"
                ref={textEditorWindowAnimation}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.5 }}
              >
                {/* false window header */}
                <div id="draggable-header">
                  <WindowHeader headerName={`Notus - ${notusHeaderName}`} selectedIcon="noteIcon" setClose={textEditorHandleClose} setMinimize={textEditorHandleMinimize}/>
                </div>

                <div className={textEditorStyles.textEditorBody}>
                  <TextEditor 
                    isOpen={windowsOpen.textEditor}
                    selectedText={currentNotusText}
                    selectedMdxFile={currentNotusFile} 
                  />
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

          {/* primary */}
          <div className ="navigation-primary">
            <ul>
              {/* archive navbar icon */}
              <AnimatePresence>
                {windowsOpen.archive &&
                  <motion.li 
                    className="archive"
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.35 }}
                  >
                    <ThemeProvider theme={theme}>
                      <Button disableRipple onClick={archiveHandleOpen}>
                        <ArchiveIcon width={24} height={24}/>
                        <span>{"Archive"}</span>
                      </Button>
                    </ThemeProvider>
                  </motion.li>
                }
              </AnimatePresence>
              
              {/* logs navbar icon */}
              <AnimatePresence>
                {windowsOpen.logs &&
                  <motion.li 
                    className="logs"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -6 }}
                    transition={{ duration: 0.5 }}
                  >
                    <ThemeProvider theme={theme}>
                      <Button disableRipple onClick={logsHandleOpen}>
                        <LogsIcon width={24} height={24}/>
                        <span>{"Data Logs"}</span>
                      </Button>
                    </ThemeProvider>
                  </motion.li>
                }
              </AnimatePresence>

              {/* settings navbar icon */}
              <AnimatePresence>
                {windowsOpen.settings &&
                  <motion.li 
                    className="settings"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -6 }}
                    transition={{ duration: 0.5 }}
                  >
                    <ThemeProvider theme={theme}>
                      <Button disableRipple onClick={settingsHandleOpen}>
                        <MoonStarIcon width={24} height={24}/>
                        <span>{"Settings"}</span>
                      </Button>
                    </ThemeProvider>
                  </motion.li>
                }
              </AnimatePresence>

              {/* docuemnts navbar icon */}
              <AnimatePresence>
                {windowsOpen.documents &&
                  <motion.li 
                    className="documents"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -6 }}
                    transition={{ duration: 0.5 }}
                  >
                    <ThemeProvider theme={theme}>
                      <Button disableRipple onClick={documentsHandleOpen}>
                        <FolderIcon width={24} height={24}/>
                        <span>{"Documents"}</span>
                      </Button>
                    </ThemeProvider>
                  </motion.li>
                }
              </AnimatePresence>

              {/* portfolio navbar icon */}
              <AnimatePresence>
                {windowsOpen.portfolio &&
                  <motion.li 
                    className="portfolio"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -6 }}
                    transition={{ duration: 0.5 }}
                  >
                    <ThemeProvider theme={theme}>
                      <Button disableRipple onClick={portfolioHandleOpen}>
                        <PortfolioIcon width={24} height={24}/>
                        <span>{"Portfolio"}</span>
                      </Button>
                    </ThemeProvider>
                  </motion.li>
                }
              </AnimatePresence>

              {/* image viewer navbar icon */}
              <AnimatePresence>
                {windowsOpen.imageViewer &&
                  <motion.li 
                    className="imageViewer"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -6 }}
                    transition={{ duration: 0.5 }}
                  >
                    <ThemeProvider theme={theme}>
                      <Button disableRipple onClick={imageViewerHandleOpen}>
                        <ImageViewerIcon width={24} height={24}/>
                        <span>{"Ivy"}</span>
                      </Button>
                    </ThemeProvider>
                  </motion.li>
                }
              </AnimatePresence>

              {/* alert navbar icon */}
              <AnimatePresence>
                {windowsOpen.alert &&
                  <motion.li 
                    className="alert"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -6 }}
                    transition={{ duration: 0.5 }}
                  >
                    <ThemeProvider theme={theme}>
                      <Button disableRipple> {/* no "onClick" handler due to it never being used/needed */}
                        <AlertIcon width={24} height={24}/>
                        <span>{"Alert"}</span>
                      </Button>
                    </ThemeProvider>
                  </motion.li>
                }
              </AnimatePresence>

              {/* text editor navbar icon */}
              <AnimatePresence>
                {windowsOpen.textEditor &&
                  <motion.li 
                    className="textEditor"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -6 }}
                    transition={{ duration: 0.5 }}
                  >
                    <ThemeProvider theme={theme}>
                      <Button disableRipple onClick={textEditorHandleOpen}>
                        <NoteIcon width={24} height={24}/>
                        <span>{"Notus"}</span>
                      </Button>
                    </ThemeProvider>
                  </motion.li>
                }
              </AnimatePresence>

              {/* this exists only to add empty space to the navbar to keep it from collapsing (or popping up when a new window is opened) */}
              <li className="null">
                <ThemeProvider theme={theme}>
                  <Button disableRipple>
                    <ArchiveIcon width={24} height={24}/>
                  </Button>
                </ThemeProvider>
              </li>
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