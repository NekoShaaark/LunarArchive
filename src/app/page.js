"use client"

import { useEffect, useState } from 'react'
import { ArchiveIcon, LogsIcon, MoonStarIcon, NoteIcon } from '@/components/SvgHandler'
import { Button } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { AnimatePresence, motion } from 'framer-motion'

import WindowHeader from '@/components/WindowHeader'
import archiveStyles from '@/styles/Archive.module.css'
import logsStyles from '@/styles/Logs.module.css'
import moonStyles from '@/styles/Moon.module.css'
import Archive from './archive/page'
import Logs from './logs/page'
import Moon from './moon/page'



export default function Home() {

  //--VARIABLE & STATES--//
  const date = new Date()
  const now = date.toLocaleTimeString("en-US", { hour12:false, hour:"2-digit", minute:"2-digit" })
  const amORpm = date.getHours() >= 12 ? "PM" : "AM"
  
  const [currentTime, setCurrentTime] = useState(now + ` ${amORpm}`)
  const [archiveWindowOpen, setArchiveWindowOpen] = useState(false)
  const [logsWindowOpen, setLogsWindowOpen] = useState(false)
  const [moonWindowOpen, setMoonWindowOpen] = useState(false)
  const [currentFocusedWindow, setCurrentFocusedWindow] = useState()
  const [changeFocusedWindow, setChangeFocusedWindow] = useState(false)
  const [currentWindowsOpen, setCurrentWindowsOpen] = useState([])
  const [currentNavbarIconsOpen, setCurrentNavbarIconsOpen] = useState([])


  //--WINDOW OPEN HANDLERS--//
  const archiveHandleOpen = () => { 
    setArchiveWindowOpen(true) 
    setCurrentFocusedWindow("archive") 
    
    //check if entry doesn't exist, if so, add it (otherwise it will continuously add for every handleOpen() call) 
    if(currentWindowsOpen.indexOf("archive") == -1){
      setCurrentWindowsOpen([...currentWindowsOpen, "archive"]) //add "archive" to the array
      setCurrentNavbarIconsOpen([...currentNavbarIconsOpen, "archive"])
      // setNavbarOrder("open")
    }
  }
  const archiveHandleClose = () => { 
    setArchiveWindowOpen(false) 
    setChangeFocusedWindow(true) 
    setCurrentWindowsOpen(currentWindowsOpen.filter(a => a !== "archive")) //remove "archive" from the array
    setCurrentNavbarIconsOpen(currentNavbarIconsOpen.filter(a => a !== "archive"))
    setNavbarOrder("close")
  }

  const logsHandleOpen = () => { 
    setLogsWindowOpen(true) 
    setCurrentFocusedWindow("logs") 

    //check if entry doesn't exist, if so, add it (otherwise it will continuously add for every handleOpen() call) 
    if(currentWindowsOpen.indexOf("logs") == -1){
      setCurrentWindowsOpen([...currentWindowsOpen, "logs"]) //add "logs" to the array
      setCurrentNavbarIconsOpen([...currentNavbarIconsOpen, "logs"])
      // setNavbarOrder("open")
    }
  }
  const logsHandleClose = () => { 
    setLogsWindowOpen(false) 
    setChangeFocusedWindow(true) 
    setCurrentWindowsOpen(currentWindowsOpen.filter(a => a !== "logs")) //remove "logs" from the array
    setCurrentNavbarIconsOpen(currentNavbarIconsOpen.filter(a => a !== "archive"))
    setNavbarOrder("close")
  }
  
  const moonHandleOpen = () => { 
    setMoonWindowOpen(true) 
    setCurrentFocusedWindow("moon") 

    //check if entry doesn't exist, if so, add it (otherwise it will continuously add for every handleOpen() call) 
    if(currentWindowsOpen.indexOf("moon") == -1){
      setCurrentWindowsOpen([...currentWindowsOpen, "moon"]) //add "moon" to the array
      setCurrentNavbarIconsOpen([...currentNavbarIconsOpen, "moon"])
      // setNavbarOrder("open")
    }
  }
  const moonHandleClose = () => { 
    setMoonWindowOpen(false) 
    setChangeFocusedWindow(true) 
    setCurrentWindowsOpen(currentWindowsOpen.filter(a => a !== "moon")) //remove "moon" from the array
    setCurrentNavbarIconsOpen(currentNavbarIconsOpen.filter(a => a !== "archive"))
    setNavbarOrder("close")
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

    //reorganize the window array to represent actual window hierarchy
    if(!currentActiveWindow){ return }
    moveElementInArray(currentWindowsOpen, currentActiveWindow)
    
    //zIndex ordering (doesn't exist will be 9, while bottom will be 10)
    var archiveIndex = currentWindowsOpen.indexOf("archive") + 10
    var logsIndex = currentWindowsOpen.indexOf("logs") + 10
    var moonIndex = currentWindowsOpen.indexOf("moon") + 10
    
    console.log(currentWindowsOpen)
    
    switch(currentActiveWindow){
      case "none":
        archiveWindow ? archiveWindow.style.zIndex = 9 : null
        logsWindow ? logsWindow.style.zIndex = 9 : null
        moonWindow ? moonWindow.style.zIndex = 9 : null
        
        setNavbarColors("none")
        setCurrentFocusedWindow("none")
        break
        
      case "archive":
        archiveWindow ? archiveWindow.style.zIndex = archiveIndex : null
        logsWindow ? logsWindow.style.zIndex = logsIndex : null
        moonWindow ? moonWindow.style.zIndex = moonIndex : null
        
        setNavbarColors("archive")
        setCurrentFocusedWindow("archive")
      break

      case "logs":
        archiveWindow ? archiveWindow.style.zIndex = archiveIndex : null
        logsWindow ? logsWindow.style.zIndex = logsIndex : null
        moonWindow ? moonWindow.style.zIndex = moonIndex : null

        setNavbarColors("logs")
        setCurrentFocusedWindow("logs")
        break

      case "moon":
        archiveWindow ? archiveWindow.style.zIndex = archiveIndex : null
        logsWindow ? logsWindow.style.zIndex = logsIndex : null
        moonWindow ? moonWindow.style.zIndex = moonIndex : null

        setNavbarColors("moon")
        setCurrentFocusedWindow("moon")
        break
    }
  }

  //set navbar colors
  function setNavbarColors(currentSelectedIcon){
    var rootStyle = document.documentElement.style

    switch(currentSelectedIcon){
      case "none":
        rootStyle.setProperty('--navbarArchiveBackgroundColor', '#000')
        rootStyle.setProperty('--navbarLogsBackgroundColor', '#000')
        rootStyle.setProperty('--navbarMoonBackgroundColor', '#000')
      
        rootStyle.setProperty('--navbarArchiveSelectedColor', '#9665ff')
        rootStyle.setProperty('--navbarLogsSelectedColor', '#9665ff')
        rootStyle.setProperty('--navbarMoonSelectedColor', '#9665ff')
        break

      case "archive":
        rootStyle.setProperty('--navbarArchiveBackgroundColor', '#9665ff')
        rootStyle.setProperty('--navbarLogsBackgroundColor', '#000')
        rootStyle.setProperty('--navbarMoonBackgroundColor', '#000')

        rootStyle.setProperty('--navbarArchiveSelectedColor', '#000')
        rootStyle.setProperty('--navbarLogsSelectedColor', '#9665ff')
        rootStyle.setProperty('--navbarMoonSelectedColor', '#9665ff')
        break

      case "logs":
        rootStyle.setProperty('--navbarArchiveBackgroundColor', '#000')
        rootStyle.setProperty('--navbarLogsBackgroundColor', '#9665ff')
        rootStyle.setProperty('--navbarMoonBackgroundColor', '#000')
      
        rootStyle.setProperty('--navbarArchiveSelectedColor', '#9665ff')
        rootStyle.setProperty('--navbarLogsSelectedColor', '#000')
        rootStyle.setProperty('--navbarMoonSelectedColor', '#9665ff')
        break
      
      case "moon":
        rootStyle.setProperty('--navbarArchiveBackgroundColor', '#000')
        rootStyle.setProperty('--navbarLogsBackgroundColor', '#000')
        rootStyle.setProperty('--navbarMoonBackgroundColor', '#9665ff')
      
        rootStyle.setProperty('--navbarArchiveSelectedColor', '#9665ff')
        rootStyle.setProperty('--navbarLogsSelectedColor', '#9665ff')
        rootStyle.setProperty('--navbarMoonSelectedColor', '#000')
        break
    }
  }

  //TODO: finish doing custom navbar order here
  function setNavbarOrder(openOrClose){
    var rootStyle = document.documentElement.style

    //open new navbar icon
    if(openOrClose == "open"){
      // var iconOpened = currentNavbarIconsOpen[currentNavbarIconsOpen.length - 1]
      // var indexOfIcon = currentNavbarIconsOpen.indexOf(iconOpened)
      // console.log(`navbar ${iconOpened}: ${indexOfIcon}`)
      // console.log(currentNavbarIconsOpen)

      switch(iconOpened){
        case "archive":
          rootStyle.setProperty('--navbarArchiveOrder', indexOfIcon)
          console.log("woah something")
          break

        case "logs":
          rootStyle.setProperty('--navbarLogsOrder', indexOfIcon)
          break

        case "moon":
          rootStyle.setProperty('--navbarMoonOrder', indexOfIcon)
          break
      }
    }

    //close and reorder all navbar icons
    if(openOrClose == "close"){
      // console.log("close: " + currentNavbarIconsOpen)
    }
    
    // rootStyle.setProperty('--navbarArchiveOrder', 1)
    // rootStyle.setProperty('--navbarLogsOrder', 2)
    // rootStyle.setProperty('--navbarMoonOrder', 3)
  }

  //--ON SERVER INIT & WHEN [CONDITIONS] CHANGE--//
  //runs on server init and when the [conditions] change or are updated
  useEffect(() => {
    
    //if windows close, make the window that is still open the active window
    if(changeFocusedWindow){
      if(currentWindowsOpen.length === 0){ setActiveWindow("none"); console.log("none here") }
      if(currentWindowsOpen.length === 1){ setActiveWindow(currentWindowsOpen[0]); console.log("only one left") }
      if(currentWindowsOpen.length >= 2){ setActiveWindow(currentWindowsOpen[currentWindowsOpen.length - 1]); console.log("two or more left") }
      setChangeFocusedWindow(false)
      // console.log("changed to: " + currentFocusedWindow)
      // console.log(currentWindowsOpen)
    }
    
    //if the window is not set to change, set the current focused window as active
    if(!changeFocusedWindow){
      setActiveWindow(currentFocusedWindow)
      // setNavbarOrder("open")
      // console.log("current focused window: " + currentFocusedWindow)
    }
  }, [archiveWindowOpen, logsWindowOpen, moonWindowOpen, currentFocusedWindow, currentWindowsOpen])


  //--ON SERVER INIT--//
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

  
  //STUB: maybe add a sorta "os-booting sqeuence" as a splashscreen
  //STUB: maybe add functionality to the "minimize" button (closes the window, but it stays on the navbar)
  //STUB: maybe add functionality for a "maximize" button (redirects the user to the window's webpage, and remembers what is currently open)
  //REVIEW: it might be possible to make all these setting of css variables dynamic
  //STUB: if css variable setting is dynamic: might be able make navbar icon order dynamic

  return (
    <div className="layout">
      <div className="layout-content"> 
        {/* background video */}
        <video className="backgroundVideo" src='videoLoop.webm' autoPlay loop muted preload="auto"/>

        <ThemeProvider theme={theme}>

          {/* desktop/icons layout */}
          <div className="desktop-layout">
            <div id="icon" className="icon-archive">
              <Button disableRipple onClick={archiveHandleOpen}>
                <ArchiveIcon width="8vh" height="8vh"/>
                <h1>Archive</h1>
              </Button>
            </div>

            <div id="icon" className="icon-logs">
              <Button disableRipple onClick={logsHandleOpen}>
                <LogsIcon width="8vh" height="8vh"/>
                <h1>Data Logs</h1>
              </Button>
            </div>

            <div id="icon" className="icon-moon">
              <Button disableRipple onClick={moonHandleOpen}>
                <MoonStarIcon width="8vh" height="8vh"/>
                <h1>Moon</h1>
              </Button>
            </div>
          </div>


          {/* archive window */}
          <AnimatePresence>
            {archiveWindowOpen &&
              <motion.div 
                id="window-archive"
                className="draggable"
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                transition={{ duration: 0.35 }}
              >
                <div id="draggable-header">
                  <WindowHeader headerName="███hi██" selectedIcon="archiveIcon" setClose={archiveHandleClose}/> {/* false window header */}
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
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.5 }}
              >
                <div id="draggable-header">
                  <WindowHeader headerName="Data Logs" selectedIcon="logsIcon" setClose={logsHandleClose}/> {/* false window header */}
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
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 16 }}
                transition={{ duration: 0.5 }}
              >
                <div id="draggable-header">
                  <WindowHeader headerName="Moon" selectedIcon="moonStarIcon" setClose={moonHandleClose}/> {/* false window header */}
                </div>

                <div className={moonStyles.moonBody}>
                  <Moon/>
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
              <li className="something"><NoteIcon alt="???" width={24} height={24}/></li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  )
}