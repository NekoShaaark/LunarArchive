"use client"

import { useEffect, useState } from 'react'
import { ArchiveIcon, LogsIcon } from '@/components/SvgHandler'
import { Button } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import Archive from './archive/page'
import Logs from './logs/page'

import WindowHeader from '@/components/WindowHeader'
import archiveStyles from '@/styles/Archive.module.css'
import logsStyles from '@/styles/Logs.module.css'



export default function Home() {

  //--VARIABLE & STATES--//
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
            '&:hover': {
              backgroundColor: 'transparent'
            }, 
          }
        },
      },
    }
  })

  //--ON SERVER INIT AGAIN??--//
  //apparently this can be run twice? with different conditions?? WHAT???
  useEffect(() => {
    var rootStyle = document.documentElement.style
    var archiveWindow = document.getElementById("window-archive")
    var logsWindow = document.getElementById("window-logs")
    
    //if windows close, make the window that is still open the active window
    if(changeFocusedWindow){
      if(!archiveWindowOpen && !logsWindowOpen){ setNoneWindowActive(); console.log("none here") }
      if(archiveWindowOpen && !logsWindowOpen){ setArchiveWindowActive(); console.log("archive here") }
      if(!archiveWindowOpen && logsWindowOpen){ setLogsWindowActive(); console.log("logs here") }
      setChangeFocusedWindow(false)
      console.log("changed to: " + currentFocusedWindow)
    }

    //if the window is not set to change, set the current focused window as active
    if(!changeFocusedWindow){
      switch(currentFocusedWindow){
        case "archive":
          console.log("current: archive "+ currentFocusedWindow)
          setArchiveWindowActive()
          break

        case "logs":
          console.log("current: logs " + currentFocusedWindow)
          setLogsWindowActive()
          break
      }
    }


    //set active window
    function setNoneWindowActive(){
      archiveWindow ? archiveWindow.style.zIndex = 9 : null
      logsWindow ? logsWindow.style.zIndex = 9 : null
      setNoneNavbarColors()
      setCurrentFocusedWindow("none")
    }

    function setArchiveWindowActive(){
      archiveWindow ? archiveWindow.style.zIndex = 11 : null
      logsWindow ? logsWindow.style.zIndex = 9 : null
      setArchiveNavbarColors()
      setCurrentFocusedWindow("archive")
    }

    function setLogsWindowActive(){
      archiveWindow ? archiveWindow.style.zIndex = 9 : null
      logsWindow ? logsWindow.style.zIndex = 11 : null
      setLogsNavbarColors()
      setCurrentFocusedWindow("logs")
    }

    //set navbar colors
    function setNoneNavbarColors(){
      rootStyle.setProperty('--navbarArchiveBackgroundColor', '#000')
      rootStyle.setProperty('--navbarLogsBackgroundColor', '#000')

      rootStyle.setProperty('--navbarArchiveSelectedColor', '#9665ff')
      rootStyle.setProperty('--navbarLogsSelectedColor', '#9665ff')
    }

    function setArchiveNavbarColors(){
      rootStyle.setProperty('--navbarArchiveBackgroundColor', '#9665ff')
      rootStyle.setProperty('--navbarLogsBackgroundColor', '#000')

      rootStyle.setProperty('--navbarArchiveSelectedColor', '#000')
      rootStyle.setProperty('--navbarLogsSelectedColor', '#9665ff')
    }

    function setLogsNavbarColors(){
      rootStyle.setProperty('--navbarArchiveBackgroundColor', '#000')
      rootStyle.setProperty('--navbarLogsBackgroundColor', '#9665ff')

      rootStyle.setProperty('--navbarArchiveSelectedColor', '#9665ff')
      rootStyle.setProperty('--navbarLogsSelectedColor', '#000')
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
      elmnt.onmousedown = dragMouseDown
    
      function dragMouseDown(e) {
        e.preventDefault()

        // console.log(e.target.parentElement.parentElement)
        if(e.target.parentElement.parentElement.id == "window-archive"){
          setArchiveNavbarColors()
          if(logsWindow){ setArchiveWindowActive() }
        }

        if(e.target.parentElement.parentElement.id == "window-logs"){
          setLogsNavbarColors()
          if(archiveWindow){ setLogsWindowActive() }
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

        //set current focused window
        // setCurrentFocusedWindow(elmnt.id)

        if(elmnt.id == "window-archive"){
          setArchiveNavbarColors()
          if(logsWindow){ setArchiveWindowActive() }
        }

        if(elmnt.id == "window-logs"){
          setLogsNavbarColors()
          if(archiveWindow){ setLogsWindowActive() }
        }

       
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

      //set window active
      function setArchiveWindowActive(){
        // console.log("archive")
        archiveWindow.style.zIndex = 11
        logsWindow.style.zIndex = 9
        setArchiveNavbarColors()
      }

      function setLogsWindowActive(){
        // console.log("logs")
        archiveWindow.style.zIndex = 9
        logsWindow.style.zIndex = 11
        setLogsNavbarColors()
      }

      //set navbar colors 
      function setArchiveNavbarColors(){
        rootStyle.setProperty('--navbarArchiveBackgroundColor', '#9665ff')
        rootStyle.setProperty('--navbarLogsBackgroundColor', '#000')

        rootStyle.setProperty('--navbarArchiveSelectedColor', '#000')
        rootStyle.setProperty('--navbarLogsSelectedColor', '#9665ff')
      }

      function setLogsNavbarColors(){
        rootStyle.setProperty('--navbarArchiveBackgroundColor', '#000')
        rootStyle.setProperty('--navbarLogsBackgroundColor', '#9665ff')

        rootStyle.setProperty('--navbarArchiveSelectedColor', '#9665ff')
        rootStyle.setProperty('--navbarLogsSelectedColor', '#000')
      }
    }
  })

  
  return (
    <> 
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
        {archiveWindowOpen &&
          <div className="draggable" id="window-archive">
            <div id="draggable-header">
              <WindowHeader headerName="███hi██" selectedIcon="archiveIcon" setClose={archiveHandleClose}/> {/* false window header */}
            </div>

            <div className={archiveStyles.archiveBody}>
              <Archive/>
            </div>
          </div>
        }

        {/* data logs window */}
        {logsWindowOpen &&
          <div className="draggable" id="window-logs">
            <div id="draggable-header">
              <WindowHeader headerName="Data Logs" selectedIcon="logsIcon" setClose={logsHandleClose}/> {/* false window header */}
            </div>

            <div className={logsStyles.logsBody}>
              <Logs/>
            </div>
          </div>
        }
      </ThemeProvider>
    </>
  )
}