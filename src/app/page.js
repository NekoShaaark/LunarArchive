"use client"

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { ArchiveIcon, LogsIcon } from '@/components/SvgHandler'
import { Button, FormLabel, IconButton, InputAdornment, TextField } from '@mui/material'
import Archive from './archive/page'

import WindowHeader from '@/components/Genshin-Events/WindowHeader'
import archiveStyles from '@/styles/Archive.module.css'



export default function Home() {

  //--VARIABLE & STATES--//
  const [archiveWindowOpen, setArchiveWindowOpen] = useState(false)

  const handleClickOpen = () => { setArchiveWindowOpen(true) }
  const handleClose = () => { setArchiveWindowOpen(false) }


  useEffect(() => {
    // Make the DIV element draggable:
    dragElement(document.getElementById("draggable"))
      
    function dragElement(elmnt) {
      var pos1 = 0, pos2 = 0, pos3 = 0, pos4 = 0
      if(document.getElementById("draggable-header")){
        // if present, the header is where you move the DIV from:
        document.getElementById("draggable-header").onmousedown = dragMouseDown
      } 
      else{
        // otherwise, move the DIV from anywhere inside the DIV:
        elmnt.onmousedown = dragMouseDown
      }
    
      function dragMouseDown(e) {
        e.preventDefault()
        // get the mouse cursor position at startup:
        pos3 = e.clientX
        pos4 = e.clientY
        document.onmouseup = closeDragElement
        // call a function whenever the cursor moves:
        document.onmousemove = elementDrag
      }
    
      function elementDrag(e) {
        e.preventDefault()
        // calculate the new cursor position:
        pos1 = pos3 - e.clientX
        pos2 = pos4 - e.clientY
        pos3 = e.clientX
        pos4 = e.clientY
        // set the element's new position:
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
    
      function closeDragElement() {
        // stop moving when mouse button is released:
        document.onmouseup = null
        document.onmousemove = null
      }
    }
  })


  //TODO - Theory/Proposition: navigation to different pages (desktop layout) is always on the "false desktop" (and is there on every page),
  // but the user *actually* moves between pages, and can move around the "false window" as originally intended (this creates the illusion
  // that the user is opening a new window when in reality, they are just moving to a different page)
  // Caveat: won't be able to open multiple "false windows" and the illusion may be broken with loading the different pages
  
  return (
    <> 
      {/* background video */}
      <video className="backgroundVideo" src='videoLoop.webm' autoPlay loop muted preload="auto"/>
      <div className="desktop-layout">
        <div id="icon" className="icon-archive">
          <Button onClick={() => console.log("clicked")}>
            <ArchiveIcon width="8vh" height="8vh"/>
            <h1>Archive</h1>
          </Button>
        </div>

        <div id="icon" className="icon-logs">
          <Link href={"/logs"}>
            <LogsIcon width="8vh" height="8vh"/>
            <h1>Data Logs</h1>
          </Link>
        </div>
      </div>

      <div id="draggable" className="event-name">
        <div id="draggable-header">
          <WindowHeader headerName="Name" selectedIcon="labelIcon"/> {/* false window header */}
        </div>

        {/* content, form, and form-content */}
        <div id="window-content">
          <div id="window-form">
            <div id="window-form-content">
              <div className={archiveStyles.archiveBody}>
                <Archive/>
              </div>
            </div>
          </div>
        </div>

      </div>
    </>
  )
}