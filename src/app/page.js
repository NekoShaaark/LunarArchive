"use client"

import { useEffect, useState } from 'react'
import { AlertIcon, ArchiveIcon, FolderIcon, ImageIcon, ImageViewerIcon, LogsIcon, MoonStarIcon, NoteIcon, PortfolioIcon } from '@/components/SvgHandler'
import { Button } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { AnimatePresence, motion, useAnimate } from 'framer-motion'

import WindowHeader from '@/components/WindowHeader'
import archiveStyles from '@/styles/Archive.module.css'
import logsStyles from '@/styles/Logs.module.css'
import moonStyles from '@/styles/Moon.module.css'
import documentsStyles from '@/styles/Documents.module.css'
import portfolioStyles from '@/styles/Portfolio.module.css'
import imageViewerStyles from '@/styles/ImageViewer.module.css'
import alertStyles from '@/styles/AlertDialogue.module.css'
import textEditorStyles from '@/styles/TextEditor.module.css'

import Archive from './archive/page'
import Logs from './logs/page'
import Moon from './moon/page'
import Documents from './documents/page'
import Portfolio from './portfolio/page'
import ImageHandler from '@/components/ImageHandler'
import AlertDialogue from '@/components/AlertDialogue'
import TextEditor from '@/components/TextEditor'



export default function Home() {

  //--VARIABLE & STATES--//

  //date and time variables, handling and state
  const date = new Date()
  const now = date.toLocaleTimeString("en-US", { hour12:false, hour:"2-digit", minute:"2-digit" })
  const amORpm = date.getHours() >= 12 ? "PM" : "AM"
  const [currentTime, setCurrentTime] = useState(now + ` ${amORpm}`)

  //minimize animation states
  const [archiveMinimize, archiveAnimate] = useAnimate()
  const [logsMinimize, logsAnimate] = useAnimate()
  const [moonMinimize, moonAnimate] = useAnimate()
  const [documentsMinimize, documentsAnimate] = useAnimate()
  const [portfolioMinimize, portfolioAnimate] = useAnimate()
  const [imageViewerMinimize, imageViewerAnimate] = useAnimate()
  const [textEditorMinimize, textEditorAnimate] = useAnimate()
  
  //window open states
  const [archiveWindowOpen, setArchiveWindowOpen] = useState(false)
  const [logsWindowOpen, setLogsWindowOpen] = useState(false)
  const [moonWindowOpen, setMoonWindowOpen] = useState(false)
  const [documentsWindowOpen, setDocumentsWindowOpen] = useState(false)
  const [portfolioWindowOpen, setPortfolioWindowOpen] = useState(false)
  const [imageViewerWindowOpen, setImageViewerWindowOpen] = useState(false)
  const [alertWindowOpen, setAlertWindowOpen] = useState(false)
  const [textEditorWindowOpen, setTextEditorWindowOpen] = useState(false)

  //window minimized states
  const [archiveWindowMinimized, setArchiveWindowMinimized] = useState(false)
  const [logsWindowMinimized, setLogsWindowMinimized] = useState(false)
  const [moonWindowMinimized, setMoonWindowMinimized] = useState(false)
  const [documentsWindowMinimized, setDocumentsWindowMinimized] = useState(false)
  const [portfolioWindowMinimized, setPortfolioWindowMinimized] = useState(false)
  const [imageViewerWindowMinimized, setImageViewerWindowMinimized] = useState(false)
  const [textEditorWindowMinimized, setTextEditorWindowMinimized] = useState(false)

  //other states
  const [currentFocusedWindow, setCurrentFocusedWindow] = useState("none")
  const [changeFocusedWindow, setChangeFocusedWindow] = useState(false)
  const [currentWindowsOpen, setCurrentWindowsOpen] = useState(["none"])
  const [currentNavbarIconsOpen, setCurrentNavbarIconsOpen] = useState(["none"])
  const [windowHeaderName, setWindowHeaderName] = useState()
  const [alertDescription, setAlertDescription] = useState()
  const [denyAccess, setDenyAccess] = useState(true)

  //image viewer (ivy) states
  const [currentIvyImage, setCurrentIvyImage] = useState()
  const [ivyImageWidth, setIvyImageWidth] = useState()
  const [ivyImageHeight, setIvyImageHeight] = useState()
  const [ivyImageDescription, setIvyImageDescription] = useState()
  const [ivyHeaderName, setIvyImageHeaderName] = useState("Image Viewer")

  //text editor (notus) states
  const [currentNotusText, setCurrentNotusText] = useState()
  const [notusHeaderName, setNotusHeaderName] = useState("Text Editor")
  const [currentNotusFile, setCurrentNotusFile] = useState("Text Editor")


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


  //--MINIMIZE ANIMATIONS--//
  const dropWindowAnimation = async (animationItem) => {
    switch(animationItem){
      case "archive":
        await archiveAnimate(archiveMinimize.current, { y: "250%" }, { duration: 0.6, delay: 0.12 })
        break

      case "logs":
        await logsAnimate(logsMinimize.current, { y: "150%" }, { duration: 0.6, delay: 0.12 })
        break

      case "moon":
        await moonAnimate(moonMinimize.current, { y: "350%" }, { duration: 0.6, delay: 0.12 })
        break

      case "documents":
        await documentsAnimate(documentsMinimize.current, { y: "350%" }, { duration: 0.6, delay: 0.12 })
        break

      case "portfolio":
        await portfolioAnimate(portfolioMinimize.current, { y: "350%" }, { duration: 0.6, delay: 0.12 })
        break

      case "imageViewer":
        await imageViewerAnimate(imageViewerMinimize.current, { y: "350%" }, { duration: 0.6, delay: 0.12 })
        break

      case "textEditor":
        await textEditorAnimate(textEditorMinimize.current, { y: "650%" }, { duration: 0.6, delay: 0.12 })
        break
    }
  }

  const pullWindowAnimation = async (animationItem) => {
    switch(animationItem){
      case "archive":
        await archiveAnimate(archiveMinimize.current, { y: 0 }, { duration: 0.4 })
        break

      case "logs":
        await logsAnimate(logsMinimize.current, { y: 0 }, { duration: 0.4 })
        break

      case "moon":
        await moonAnimate(moonMinimize.current, { y: 0 }, { duration: 0.4 })
        break

      case "documents":
        await documentsAnimate(documentsMinimize.current, { y: 0 }, { duration: 0.4 })
        break

      case "portfolio":
        await portfolioAnimate(portfolioMinimize.current, { y: 0 }, { duration: 0.4 })
        break

      case "imageViewer":
        await imageViewerAnimate(imageViewerMinimize.current, { y: 0 }, { duration: 0.4 })
        break

      case "textEditor":
        await textEditorAnimate(textEditorMinimize.current, { y: 0 }, { duration: 0.4 })
    }
  }


  //--WINDOW OPEN/CLOSE/MINIMIZE HANDLERS--//
  const archiveHandleOpen = () => { 
    //if alert dialogue is open, allow nothing to be opened
    if(alertWindowOpen){ return }

    // if(denyAccess){
    //   alertHandleOpen()
    //   return
    // }

    setArchiveWindowOpen(true) 
    setCurrentFocusedWindow("archive")
    
    //check if window is minimized, if so, play animation to drag window back above navbar
    if(archiveWindowMinimized){
      pullWindowAnimation("archive")
      setArchiveWindowMinimized(false)
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
    if(alertWindowOpen){ return }

    setArchiveWindowOpen(false) 
    setChangeFocusedWindow(true) 
    setCurrentWindowsOpen(currentWindowsOpen.filter(a => a !== "archive")) //remove "archive" from the array
    setCurrentNavbarIconsOpen(currentNavbarIconsOpen.filter(a => a !== "archive"))
  }
  const archiveHandleMinimize = () => {
    //if alert dialogue is open, allow nothing to be minimized
    if(alertWindowOpen){ return }

    setChangeFocusedWindow(true) 
    setArchiveWindowMinimized(true)
    setCurrentWindowsOpen(currentWindowsOpen.filter(a => a !== "archive")) //remove "archive" from the array
    setCurrentNavbarIconsOpen(currentNavbarIconsOpen.filter(a => a !== "archive"))
  }

  const logsHandleOpen = () => { 
    //if alert dialogue is open, allow nothing to be opened
    if(alertWindowOpen){ return }

    if(denyAccess){
      alertHandleOpen()
      return
    }

    setLogsWindowOpen(true) 
    setCurrentFocusedWindow("logs") 

    //check if window is minimized, if so, play animation to drag window back above navbar
    if(logsWindowMinimized){
      pullWindowAnimation("logs")
      setLogsWindowMinimized(false)
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
    if(alertWindowOpen){ return }

    setLogsWindowOpen(false) 
    setChangeFocusedWindow(true) 
    setCurrentWindowsOpen(currentWindowsOpen.filter(a => a !== "logs")) //remove "logs" from the array
    setCurrentNavbarIconsOpen(currentNavbarIconsOpen.filter(a => a !== "logs"))
  }
  const logsHandleMinimize = () => {
    //if alert dialogue is open, allow nothing to be minimized
    if(alertWindowOpen){ return }

    setChangeFocusedWindow(true) 
    setLogsWindowMinimized(true)
    setCurrentWindowsOpen(currentWindowsOpen.filter(a => a !== "logs")) //remove "logs" from the array
    setCurrentNavbarIconsOpen(currentNavbarIconsOpen.filter(a => a !== "logs"))
  }
  
  const moonHandleOpen = () => { 
    //if alert dialogue is open, allow nothing to be opened
    if(alertWindowOpen){ return }

    if(denyAccess){
      alertHandleOpen()
      return
    }

    setMoonWindowOpen(true) 
    setCurrentFocusedWindow("moon") 

    //check if window is minimized, if so, play animation to drag window back above navbar
    if(moonWindowMinimized){
      pullWindowAnimation("moon")
      setMoonWindowMinimized(false)
    }

    //check if entry doesn't exist, if so, add it (otherwise it will continuously add for every handleOpen() call) 
    if(currentWindowsOpen.indexOf("moon") == -1){
      setCurrentWindowsOpen([...currentWindowsOpen, "moon"]) //add "moon" to the array
      setCurrentNavbarIconsOpen([...currentNavbarIconsOpen, "moon"])
      setNavbarOrder("open")
    }
  }
  const moonHandleClose = () => { 
    //if alert dialogue is open, allow nothing to be closed
    if(alertWindowOpen){ return }

    setMoonWindowOpen(false) 
    setChangeFocusedWindow(true) 
    setCurrentWindowsOpen(currentWindowsOpen.filter(a => a !== "moon")) //remove "moon" from the array
    setCurrentNavbarIconsOpen(currentNavbarIconsOpen.filter(a => a !== "moon"))
  }
  const moonHandleMinimize = () => {
    //if alert dialogue is open, allow nothing to be minimized
    if(alertWindowOpen){ return }

    setChangeFocusedWindow(true) 
    setMoonWindowMinimized(true)
    setCurrentWindowsOpen(currentWindowsOpen.filter(a => a !== "moon")) //remove "moon" from the array
    setCurrentNavbarIconsOpen(currentNavbarIconsOpen.filter(a => a !== "moon"))
  }

  const documentsHandleOpen = () => { 
    //if alert dialogue is open, allow nothing to be opened
    if(alertWindowOpen){ return }

    setDocumentsWindowOpen(true) 
    setCurrentFocusedWindow("documents") 

    //check if window is minimized, if so, play animation to drag window back above navbar
    if(documentsWindowMinimized){
      pullWindowAnimation("documents")
      setDocumentsWindowMinimized(false)
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
    if(alertWindowOpen){ return }
    
    setChangeFocusedWindow(true) 
    setDocumentsWindowOpen(false) 
    setCurrentWindowsOpen(currentWindowsOpen.filter(a => a !== "documents")) //remove "documents" from the array
    setCurrentNavbarIconsOpen(currentNavbarIconsOpen.filter(a => a !== "documents"))
  }
  const documentsHandleMinimize = () => {
    //if alert dialogue is open, allow nothing to be minimized
    if(alertWindowOpen){ return }

    setDocumentsWindowMinimized(true)
    setChangeFocusedWindow(true) 
    setCurrentWindowsOpen(currentWindowsOpen.filter(a => a !== "documents")) //remove "documents" from the array
    setCurrentNavbarIconsOpen(currentNavbarIconsOpen.filter(a => a !== "documents"))
  }

  const portfolioHandleOpen = () => { 
    //if alert dialogue is open, allow nothing to be opened
    if(alertWindowOpen){ return }

    setPortfolioWindowOpen(true) 
    setCurrentFocusedWindow("portfolio") 

    //check if window is minimized, if so, play animation to drag window back above navbar
    if(portfolioWindowMinimized){
      pullWindowAnimation("portfolio")
      setPortfolioWindowMinimized(false)
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
    if(alertWindowOpen){ return }

    setChangeFocusedWindow(true) 
    setPortfolioWindowOpen(false) 
    setCurrentWindowsOpen(currentWindowsOpen.filter(a => a !== "portfolio")) //remove "portfolio" from the array
    setCurrentNavbarIconsOpen(currentNavbarIconsOpen.filter(a => a !== "portfolio"))
  }
  const portfolioHandleMinimize = () => {
    //if alert dialogue is open, allow nothing to be minimized
    if(alertWindowOpen){ return }

    setPortfolioWindowMinimized(true)
    setChangeFocusedWindow(true) 
    setCurrentWindowsOpen(currentWindowsOpen.filter(a => a !== "portfolio")) //remove "portfolio" from the array
    setCurrentNavbarIconsOpen(currentNavbarIconsOpen.filter(a => a !== "portfolio"))
  }

  const imageViewerHandleOpen = () => { 
    //if alert dialogue is open, allow nothing to be opened
    if(alertWindowOpen){ return }

    setImageViewerWindowOpen(true) 
    setCurrentFocusedWindow("imageViewer") 

    //check if window is minimized, if so, play animation to drag window back above navbar
    if(imageViewerWindowMinimized){
      pullWindowAnimation("imageViewer")
      setImageViewerWindowMinimized(false)
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
    if(alertWindowOpen){ return }

    setChangeFocusedWindow(true) 
    setImageViewerWindowOpen(false) 
    setCurrentWindowsOpen(currentWindowsOpen.filter(a => a !== "imageViewer")) //remove "imageViewer" from the array
    setCurrentNavbarIconsOpen(currentNavbarIconsOpen.filter(a => a !== "imageViewer"))
  }
  const imageViewerHandleMinimize = () => {
    //if alert dialogue is open, allow nothing to be minimized
    if(alertWindowOpen){ return }

    setImageViewerWindowMinimized(true)
    setChangeFocusedWindow(true) 
    setCurrentWindowsOpen(currentWindowsOpen.filter(a => a !== "imageViewer")) //remove "imageViewer" from the array
    setCurrentNavbarIconsOpen(currentNavbarIconsOpen.filter(a => a !== "imageViewer"))
  }

  const alertHandleOpen = () => { 
    setAlertWindowOpen(true) 
    setCurrentFocusedWindow("alert") 

    //check if entry doesn't exist, if so, add it (otherwise it will continuously add for every handleOpen() call) 
    if(currentWindowsOpen.indexOf("alert") == -1){
      setCurrentWindowsOpen([...currentWindowsOpen, "alert"]) //add "alert" to the array
      setCurrentNavbarIconsOpen([...currentNavbarIconsOpen, "alert"])
      setNavbarOrder("open")
    }
  }
  const alertHandleClose = () => { 
    setAlertWindowOpen(false) 
    setChangeFocusedWindow(true) 
    setCurrentWindowsOpen(currentWindowsOpen.filter(a => a !== "alert")) //remove "alert" from the array
    setCurrentNavbarIconsOpen(currentNavbarIconsOpen.filter(a => a !== "alert"))
  }

  const textEditorHandleOpen = () => { 
    //if alert dialogue is open, allow nothing to be opened
    if(alertWindowOpen){ return }

    setTextEditorWindowOpen(true) 
    setCurrentFocusedWindow("textEditor") 

    //check if window is minimized, if so, play animation to drag window back above navbar
    if(textEditorWindowMinimized){
      pullWindowAnimation("textEditor")
      setTextEditorWindowMinimized(false)
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
    if(alertWindowOpen){ return }

    setChangeFocusedWindow(true) 
    setTextEditorWindowOpen(false) 
    setCurrentWindowsOpen(currentWindowsOpen.filter(a => a !== "textEditor")) //remove "textEditor" from the array
    setCurrentNavbarIconsOpen(currentNavbarIconsOpen.filter(a => a !== "textEditor"))
  }
  const textEditorHandleMinimize = () => {
    //if alert dialogue is open, allow nothing to be minimized
    if(alertWindowOpen){ return }

    setTextEditorWindowMinimized(true)
    setChangeFocusedWindow(true) 
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


  //--FUNCTIONS & STATE HANDLING--//
  function updateTime() {
    const date = new Date()
    const amORpm = date.getHours() >= 12 ? "PM" : "AM"

    const newTime = date.toLocaleTimeString('en-US', { hour12:false, hour:"2-digit", minute:"2-digit" })
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
    var moonWindow = document.getElementById("window-moon")
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
    var moonIndex = currentWindowsOpen.indexOf("moon") + 10
    var documentsIndex = currentWindowsOpen.indexOf("documents") + 10
    var portfolioIndex = currentWindowsOpen.indexOf("portfolio") + 10
    var imageViewerIndex = currentWindowsOpen.indexOf("imageViewer") + 10
    var alertIndex = currentWindowsOpen.indexOf("alert") + 20  //this is an important window/dialogue so it goes above everything
    var textEditorIndex = currentWindowsOpen.indexOf("textEditor") + 10
    
    //check if active window is none
    if(currentActiveWindow == "none"){
      archiveWindow ? archiveWindow.style.zIndex = 9 : null
      logsWindow ? logsWindow.style.zIndex = 9 : null
      moonWindow ? moonWindow.style.zIndex = 9 : null
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
    moonWindow ? moonWindow.style.zIndex = moonIndex : null
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

      case "moon":
        setNavbarColors("moon")
        setCurrentFocusedWindow("moon")
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
    var rootStyle = document.documentElement.style
    console.log(currentSelectedIcon)

    //set all to false, and set only one to true
    rootStyle.setProperty('--navbarArchiveBackgroundColor', '#000')
    rootStyle.setProperty('--navbarLogsBackgroundColor', '#000')
    rootStyle.setProperty('--navbarMoonBackgroundColor', '#000')
    rootStyle.setProperty('--navbarDocumentsBackgroundColor', '#000')
    rootStyle.setProperty('--navbarPortfolioBackgroundColor', '#000')
    rootStyle.setProperty('--navbarImageViewerBackgroundColor', '#000')
    rootStyle.setProperty('--navbarAlertBackgroundColor', '#000')
    rootStyle.setProperty('--navbarTextEditorBackgroundColor', '#000')
  
    rootStyle.setProperty('--navbarArchiveSelectedColor', '#9665ff')
    rootStyle.setProperty('--navbarLogsSelectedColor', '#9665ff')
    rootStyle.setProperty('--navbarMoonSelectedColor', '#9665ff')
    rootStyle.setProperty('--navbarDocumentsSelectedColor', '#9665ff')
    rootStyle.setProperty('--navbarPortfolioSelectedColor', '#9665ff')
    rootStyle.setProperty('--navbarImageViewerSelectedColor', '#9665ff')
    rootStyle.setProperty('--navbarAlertSelectedColor', '#9665ff')
    rootStyle.setProperty('--navbarTextEditorSelectedColor', '#9665ff')

    rootStyle.setProperty('--everythingButAlertBlur', '0px')

    //set a specific icon to be active
    switch(currentSelectedIcon){
      case "archive":
        rootStyle.setProperty('--navbarArchiveBackgroundColor', '#9665ff')
        rootStyle.setProperty('--navbarArchiveSelectedColor', '#000')
        break

      case "logs":
        rootStyle.setProperty('--navbarLogsBackgroundColor', '#9665ff')
        rootStyle.setProperty('--navbarLogsSelectedColor', '#000')
        break
      
      case "moon":
        rootStyle.setProperty('--navbarMoonBackgroundColor', '#9665ff')
        rootStyle.setProperty('--navbarMoonSelectedColor', '#000')
        break

      case "documents":
        rootStyle.setProperty('--navbarDocumentsBackgroundColor', '#9665ff')
        rootStyle.setProperty('--navbarDocumentsSelectedColor', '#000')
        break

      case "portfolio":
        rootStyle.setProperty('--navbarPortfolioBackgroundColor', '#9665ff')
        rootStyle.setProperty('--navbarPortfolioSelectedColor', '#000')
        break

      case "imageViewer":
        rootStyle.setProperty('--navbarImageViewerBackgroundColor', '#9665ff')
        rootStyle.setProperty('--navbarImageViewerSelectedColor', '#000')
        break

      case "alert":
        rootStyle.setProperty('--navbarAlertBackgroundColor', '#9665ff')
        rootStyle.setProperty('--navbarAlertSelectedColor', '#000')
        rootStyle.setProperty('--everythingButAlertBlur', '1px')
        break

      case "textEditor":
        rootStyle.setProperty('--navbarTextEditorBackgroundColor', '#9665ff')
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

        case "moon":
          rootStyle.setProperty('--navbarMoonOrder', indexOfIcon)
          // console.log("wow moon")
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
  }, [archiveWindowOpen, logsWindowOpen, moonWindowOpen, documentsWindowOpen, portfolioWindowOpen, imageViewerWindowOpen, 
      alertWindowOpen, textEditorWindowOpen, currentFocusedWindow, currentWindowsOpen, changeFocusedWindow, dropWindowAnimation])


  //--ON SERVER INIT & WHEN WINDOWS MINIMIZE--//
  useEffect(() => {

    //play animation to drop window below navbar
    if(archiveWindowMinimized){ dropWindowAnimation("archive") }
    if(logsWindowMinimized){ dropWindowAnimation("logs") }
    if(moonWindowMinimized){ dropWindowAnimation("moon") }
    if(documentsWindowMinimized){ dropWindowAnimation("documents") }
    if(portfolioWindowMinimized){ dropWindowAnimation("portfolio") }
    if(imageViewerWindowMinimized){ dropWindowAnimation("imageViewer") }
    if(textEditorWindowMinimized){ dropWindowAnimation("textEditor") }
  }, [archiveWindowMinimized, logsWindowMinimized, moonWindowMinimized, documentsWindowMinimized, portfolioWindowMinimized,
      imageViewerWindowMinimized, textEditorWindowMinimized])


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
        if(alertWindowOpen){
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

          case "window-moon":
            setActiveWindow("moon")
            moveElementInArray(currentWindowsOpen, "moon")
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
      <div className="layout-content"> 
        {/* background video */}
        <video className="backgroundVideo" src='videoLoop.webm' autoPlay loop muted preload="auto"/>

        <ThemeProvider theme={theme}>

          {/* desktop/icons layout */}
          <div className="desktop-layout">
            {/* <div id="icon" className="icon-archive">
              <Button disableRipple onClick={archiveHandleOpen}>
                <ArchiveIcon width="6vh" height="6vh"/>
                <h1>Archive</h1>
              </Button>
            </div> */}

            {/* <div id="icon" className="icon-logs">
              <Button disableRipple onClick={logsHandleOpen}>
                <LogsIcon width="6vh" height="6vh"/>
                <h1>Data Logs</h1>
              </Button>
            </div> */}

            {/* <div id="icon" className="icon-moon">
              <Button disableRipple onClick={moonHandleOpen}>
                <MoonStarIcon width="6vh" height="6vh"/>
                <h1>Moon</h1>
              </Button>
            </div> */}

            <div id="icon" className="icon-documents">
              <Button disableRipple onClick={documentsHandleOpen}>
                <FolderIcon width="6vh" height="6vh"/>
                <h1>Documents</h1>
              </Button>
            </div>

            {/* <div id="icon" className="icon-portfolio">
              <Button disableRipple onClick={portfolioHandleOpen}>
                <PortfolioIcon width="6vh" height="6vh"/>
                <h1>Portfolio</h1>
              </Button>
            </div> */}

            <div id="icon" className="icon-tutorial">
              <Button disableRipple onClick={alertHandleOpen}>
                <ImageIcon width="6vh" height="6vh"/>
                <h1>tutorial.png</h1>
              </Button>
            </div>
          </div>


          {/* archive window */}
          <AnimatePresence>
            {archiveWindowOpen &&
              <motion.div 
                id="window-archive"
                className="draggable"
                ref={archiveMinimize}
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
            {logsWindowOpen &&
              <motion.div 
                id="window-logs" 
                className="draggable"
                ref={logsMinimize}
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

          {/* moon window */}
          <AnimatePresence>
            {moonWindowOpen &&
              <motion.div 
                id="window-moon" 
                className="draggable"
                ref={moonMinimize}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.5 }}
              >
                {/* false window header */}
                <div id="draggable-header">
                  <WindowHeader headerName="Moon" selectedIcon="moonStarIcon" setClose={moonHandleClose} setMinimize={moonHandleMinimize}/>
                </div>

                <div className={moonStyles.moonBody}>
                  <Moon/>
                </div>
              </motion.div>
            }
          </AnimatePresence>

          {/* documents window */}
          <AnimatePresence>
            {documentsWindowOpen &&
              <motion.div 
                id="window-documents" 
                className="draggable"
                ref={documentsMinimize}
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
                    archiveOpen={archiveHandleOpen} 
                    alertOpen={alertHandleOpen}
                    setIvyOpen={imageViewerHandleOpen} 
                    setIvyImage={handleIvyImage} 
                    setIvyImageWidth={handleIvyImageWidth} 
                    setIvyImageHeight={handleIvyImageHeight}
                    setIvyImageDescription={handleIvyImageDescription}
                    setIvyImageHeaderName={handleIvyHeaderName}
                    setHeaderName={handleWindowHeaderName}
                    setErrorDescription={handleAlertDescription}
                    setNotusOpen={textEditorHandleOpen}
                    setNotusText={handleNotusText}
                    setNotusHeaderName={handleNotusHeaderName}
                    setNotusFile={handleCurrentNotusFile}
                  />
                </div>
              </motion.div>
            }
          </AnimatePresence>

          {/* portfolio window */}
          <AnimatePresence>
            {portfolioWindowOpen &&
              <motion.div 
                id="window-portfolio"
                ref={portfolioMinimize}
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
            {imageViewerWindowOpen &&
              <motion.div 
                id="window-imageViewer" 
                className="draggable"
                ref={imageViewerMinimize}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.5 }}
              >
                {/* false window header */}
                <div id="draggable-header">
                  <WindowHeader headerName={`Ivy - ${ivyHeaderName}`} selectedIcon="imageViewerIcon" setClose={imageViewerHandleClose} setMinimize={imageViewerHandleMinimize}/>
                </div>

                <div className={imageViewerStyles.imageViewerBody}>
                  <ImageHandler 
                    selectedImage={currentIvyImage} 
                    isOpen={imageViewerWindowOpen} 
                    imageWidth={ivyImageWidth} 
                    imageHeight={ivyImageHeight} 
                    imageDescription={ivyImageDescription}
                  />
                </div>
              </motion.div>
            }
          </AnimatePresence>

          {/* alert dialogue window */}
          <AnimatePresence>
            {alertWindowOpen &&
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
            {textEditorWindowOpen &&
              <motion.div 
                id="window-textEditor" 
                className="draggable"
                ref={textEditorMinimize}
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
                    isOpen={textEditorWindowOpen}
                    selectedText={currentNotusText}
                    selectedMdxFile={currentNotusFile} 
                  />
                </div>
              </motion.div>
            }
          </AnimatePresence>
        </ThemeProvider>
      </div>

      {/* NAVBAR */}
      <div className="layout-nav">
        <nav id="navbar" className="navigation">

          {/* primary */}
          <div className ="navigation-primary">
            <ul>
              {/* archive navbar icon */}
              <AnimatePresence>
                {archiveWindowOpen &&
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
                {logsWindowOpen &&
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

              {/* moon navbar icon */}
              <AnimatePresence>
                {moonWindowOpen &&
                  <motion.li 
                    className="moon"
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -6 }}
                    transition={{ duration: 0.5 }}
                  >
                    <ThemeProvider theme={theme}>
                      <Button disableRipple onClick={moonHandleOpen}>
                        <MoonStarIcon width={24} height={24}/>
                        <span>{"Moon"}</span>
                      </Button>
                    </ThemeProvider>
                  </motion.li>
                }
              </AnimatePresence>

              {/* docuemnts navbar icon */}
              <AnimatePresence>
                {documentsWindowOpen &&
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
                {portfolioWindowOpen &&
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
                {imageViewerWindowOpen &&
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
                {alertWindowOpen &&
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
                {textEditorWindowOpen &&
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
              <li className="something"><div><NoteIcon alt="???" width={24} height={24}/></div></li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  )
}