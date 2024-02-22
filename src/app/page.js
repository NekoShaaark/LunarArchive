"use client"

import { useEffect, useState } from 'react'
import { ArchiveIcon, LogsIcon, NoteIcon } from '@/components/SvgHandler'
import { Button } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { AnimatePresence, motion } from 'framer-motion'

import WindowHeader from '@/components/WindowHeader'
import archiveStyles from '@/styles/Archive.module.css'
import logsStyles from '@/styles/Logs.module.css'
import Archive from './archive/page'
import Logs from './logs/page'



export default function Home() {

  //--VARIABLE & STATES--//
  const date = new Date()
  const now = date.toLocaleTimeString("en-US", { hour12:false, hour:"2-digit", minute:"2-digit" })
  const amORpm = date.getHours() >= 12 ? "PM" : "AM"
  
  const [currentTime, setCurrentTime] = useState(now + ` ${amORpm}`)
  const [archiveWindowOpen, setArchiveWindowOpen] = useState(false)
  const [logsWindowOpen, setLogsWindowOpen] = useState(false)
  const [currentFocusedWindow, setCurrentFocusedWindow] = useState()
  const [changeFocusedWindow, setChangeFocusedWindow] = useState(false)

  const archiveHandleOpen = () => { setArchiveWindowOpen(true); setCurrentFocusedWindow("archive") }
  const archiveHandleClose = () => { setArchiveWindowOpen(false); setChangeFocusedWindow(true) }

  const logsHandleOpen = () => { setLogsWindowOpen(true); setCurrentFocusedWindow("logs") }
  const logsHandleClose = () => { setLogsWindowOpen(false); setChangeFocusedWindow(true) }


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

  //set currently active window
  function setNoneWindowActive(archiveWindow, logsWindow, rootStyle){
    archiveWindow ? archiveWindow.style.zIndex = 9 : null
    logsWindow ? logsWindow.style.zIndex = 9 : null
    setNoneNavbarColors(rootStyle)
    setCurrentFocusedWindow("none")
  }

  function setArchiveWindowActive(archiveWindow, logsWindow, rootStyle){
    archiveWindow ? archiveWindow.style.zIndex = 11 : null
    logsWindow ? logsWindow.style.zIndex = 9 : null
    setArchiveNavbarColors(rootStyle)
    setCurrentFocusedWindow("archive")
  }

  function setLogsWindowActive(archiveWindow, logsWindow, rootStyle){
    archiveWindow ? archiveWindow.style.zIndex = 9 : null
    logsWindow ? logsWindow.style.zIndex = 11 : null
    setLogsNavbarColors(rootStyle)
    setCurrentFocusedWindow("logs")
  }

  //set navbar colors
  function setNoneNavbarColors(rootStyle){
    rootStyle.setProperty('--navbarArchiveBackgroundColor', '#000')
    rootStyle.setProperty('--navbarLogsBackgroundColor', '#000')
  
    rootStyle.setProperty('--navbarArchiveSelectedColor', '#9665ff')
    rootStyle.setProperty('--navbarLogsSelectedColor', '#9665ff')
  }

  function setArchiveNavbarColors(rootStyle){
    rootStyle.setProperty('--navbarArchiveBackgroundColor', '#9665ff')
    rootStyle.setProperty('--navbarLogsBackgroundColor', '#000')
  
    rootStyle.setProperty('--navbarArchiveSelectedColor', '#000')
    rootStyle.setProperty('--navbarLogsSelectedColor', '#9665ff')
  }

  function setLogsNavbarColors(rootStyle){
    rootStyle.setProperty('--navbarArchiveBackgroundColor', '#000')
    rootStyle.setProperty('--navbarLogsBackgroundColor', '#9665ff')
  
    rootStyle.setProperty('--navbarArchiveSelectedColor', '#9665ff')
    rootStyle.setProperty('--navbarLogsSelectedColor', '#000')
  }


  //--ON SERVER INIT & WHEN [CONDITIONS] CHANGE--//
  //runs on server init and when the [conditions] change or are updated
  useEffect(() => {
    var rootStyle = document.documentElement.style
    var archiveWindow = document.getElementById("window-archive")
    var logsWindow = document.getElementById("window-logs")
    
    //if windows close, make the window that is still open the active window
    if(changeFocusedWindow){
      if(!archiveWindowOpen && !logsWindowOpen){ setNoneWindowActive(archiveWindow, logsWindow, rootStyle); console.log("none here") }
      if(archiveWindowOpen && !logsWindowOpen){ setArchiveWindowActive(archiveWindow, logsWindow, rootStyle); console.log("archive here") }
      if(!archiveWindowOpen && logsWindowOpen){ setLogsWindowActive(archiveWindow, logsWindow, rootStyle); console.log("logs here") }
      setChangeFocusedWindow(false)
      console.log("changed to: " + currentFocusedWindow)
    }

    //if the window is not set to change, set the current focused window as active
    if(!changeFocusedWindow){
      switch(currentFocusedWindow){
        case "archive":
          console.log("current: archive "+ currentFocusedWindow)
          setArchiveWindowActive(archiveWindow, logsWindow, rootStyle)
          break

        case "logs":
          console.log("current: logs " + currentFocusedWindow)
          setLogsWindowActive(archiveWindow, logsWindow, rootStyle)
          break
      }
    }
  }, [archiveWindowOpen, logsWindowOpen, currentFocusedWindow])


  //--ON SERVER INIT--//
  useEffect(() => {
    var rootStyle = document.documentElement.style
    var archiveWindow = document.getElementById("window-archive")
    var logsWindow = document.getElementById("window-logs")

    //make all div elements draggable    
    let mydivs = document.getElementsByClassName("draggable")
    var mydiv
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

        //set navbar colors
        // console.log(e.target.parentElement.parentElement)
        if(e.target.parentElement.parentElement.id == "window-archive"){
          setArchiveNavbarColors(rootStyle)
          if(logsWindow){ setArchiveWindowActive(archiveWindow, logsWindow, rootStyle) }
        }

        if(e.target.parentElement.parentElement.id == "window-logs"){
          setLogsNavbarColors(rootStyle)
          if(archiveWindow){ setLogsWindowActive(archiveWindow, logsWindow, rootStyle) }
        }
        
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
        </ThemeProvider>
      </div>

      {/* NAVBAR */}
      <div className="layout-nav">
        <nav id="navbar" className="navigation">

          {/* primary */}
          <div className ="navigation-primary">
            <ul>
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