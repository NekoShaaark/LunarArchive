"use client"

import { useEffect, useState } from 'react'
import { AlertIcon, ArchiveIcon, FolderIcon, ImageIcon, ImageViewerIcon, ImagesIcon, LogsIcon, NoteIcon, PortfolioIcon, MoonStarIcon, MoonIcon } from '@/components/SvgHandler'
import { Button } from '@mui/material'
import { ThemeProvider, createTheme } from '@mui/material/styles'
import { AnimatePresence } from 'framer-motion'
import Image from 'next/image'

import Login from '@/app/login/page'
import DesktopMenu from '@/components/DesktopMenu'
import WindowCreator from '@/components/creators/WindowsCreator'
import { WindowsHandler } from '@/components/handlers/WindowsHandler'
import { NavbarHandler } from '@/components/handlers/NavbarHandler'
import { DesktopIconButton, NavbarIconButton } from '@/components/creators/DesktopCreator'



export default function Home() {

  //window/navbar state handlers
  const windowsHandler = WindowsHandler()
  const navbarHandler = NavbarHandler()

  //other states
  const [denyAccess, setDenyAccess] = useState(true)
  const [loginOpen, setLoginOpen] = useState(false)


  //--LOGIN OPENING HANDLING--//
  const handleLoginOpen = async (e) => {
    // if(!e){ console.log("woahhhhhh loginOpen undefined"); return }
    console.log("opening/closing login")
    setLoginOpen(e)
  }

  //--DESKTOP MENU OPENING HANDLING--//
  const handleDesktopMenuOpen = async (e) => {
    if(windowsHandler.windowsOpen.alert){ return }

    //handle opening/closing of desktopMenu
    if(e){
      windowsHandler.handleFocusedWindow("desktopMenu")
      windowsHandler.desktopMenu.handleOpen(true)
      if(!navbarHandler.navbarIconsOpen.archive){
        navbarHandler.setNavbarOrder()
        navbarHandler.desktopMenu.handleOpen(true)
      }
    } 
    else{
      windowsHandler.handleChangeFocusedWindow(true)
      windowsHandler.desktopMenu.handleOpen(false)
      navbarHandler.desktopMenu.handleOpen(false)
    }
  }

  //--GET WINDOW DATA BY ID--//
  const getWindowCreationDataById = (id) => {
    return windowsCreationData.find(config => config.id === id)
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
      onClick: () => { windowsHandler.handleDocumentsDirToOpen("Documents"); windowsHandler.documents.openWindow() },
      Icon: FolderIcon,
      label: "Documents",
    },

    //pictures desktop icon
    {
      className: "icon-pictures",
      onClick: () => { windowsHandler.handleDocumentsDirToOpen("Pictures"); windowsHandler.documents.openWindow() },
      Icon: ImagesIcon,
      label: "Pictures",
    },

    //settings desktop icon
    {
      className: "icon-settings",
      onClick: windowsHandler.settings.openWindow,
      Icon: MoonStarIcon,
      label: "Settings",
    },

    //tutorial desktop icon
    {
      className: "icon-tutorial",
      onClick: () => { windowsHandler.handleAlertDescription("Coming soon"); windowsHandler.alert.openWindow() },
      Icon: ImageIcon,
      label: "tutorial.png",
    }
  ]

  const navbarIconData = [

    //archive navbar icon
    {
      windowOpen: windowsHandler.windowsOpen.archive,
      windowMinimized: windowsHandler.windowsMinimized.archive,
      windowFocused: windowsHandler.windowFocusedData.archive,
      className: "archive",
      onClick: windowsHandler.archive.openWindow,
      Icon: ArchiveIcon,
      label: "Archive"
    },

    //logs navbar icon
    {
      windowOpen: windowsHandler.windowsOpen.logs,
      windowMinimized: windowsHandler.windowsMinimized.logs,
      windowFocused: windowsHandler.windowFocusedData.logs,
      className: "logs",
      onClick: windowsHandler.logs.openWindow,
      Icon: LogsIcon,
      label: "Data Logs"
    },

    //settings navbar icon
    {
      windowOpen: windowsHandler.windowsOpen.settings,
      windowMinimized: windowsHandler.windowsMinimized.settings,
      windowFocused: windowsHandler.windowFocusedData.settings,
      className: "settings",
      onClick: windowsHandler.settings.openWindow,
      Icon: MoonStarIcon,
      label: "Settings"
    },

    //documents navbar icon
    {
      windowOpen: windowsHandler.windowsOpen.documents,
      windowMinimized: windowsHandler.windowsMinimized.documents,
      windowFocused: windowsHandler.windowFocusedData.documents,
      className: "documents",
      onClick: windowsHandler.documents.openWindow,
      Icon: FolderIcon,
      label: "Documents"
    },

    //portfolio navbar icon
    {
      windowOpen: windowsHandler.windowsOpen.portfolio,
      windowMinimized: windowsHandler.windowsMinimized.portfolio,
      windowFocused: windowsHandler.windowFocusedData.portfolio,
      className: "portfolio",
      onClick: windowsHandler.portfolio.windowOpen,
      Icon: PortfolioIcon,
      label: "Portfolio"
    },

    //image viewer navbar icon
    {
      windowOpen: windowsHandler.windowsOpen.imageViewer,
      windowMinimized: windowsHandler.windowsMinimized.imageViewer,
      windowFocused: windowsHandler.windowFocusedData.imageViewer,
      className: "imageViewer",
      onClick: windowsHandler.imageViewer.openWindow,
      Icon: ImageViewerIcon,
      label: "Ivy"
    },

    //alert navbar icon
    {
      windowOpen: windowsHandler.windowsOpen.alert,
      windowMinimized: windowsHandler.windowsMinimized.alert,
      windowFocused: windowsHandler.windowFocusedData.alert,
      className: "alert",
      onClick: windowsHandler.alert.openWindow,
      Icon: AlertIcon,
      label: "Alert"
    },

    //text editor navbar icon
    {
      windowOpen: windowsHandler.windowsOpen.textEditor,
      windowMinimized: windowsHandler.windowsMinimized.textEditor,
      windowFocused: windowsHandler.windowFocusedData.textEditor,
      className: "textEditor",
      onClick: windowsHandler.textEditor.openWindow,
      Icon: NoteIcon,
      label: "Notus"
    }
  ]


  //--WINDOWS CREATION DATA--//
  const windowsCreationData = [
    windowsHandler.archive.windowData,
    windowsHandler.logs.windowData,
    windowsHandler.settings.windowData,
    windowsHandler.documents.windowData,
    windowsHandler.portfolio.windowData,
    windowsHandler.imageViewer.windowData,
    windowsHandler.alert.windowData,
    windowsHandler.textEditor.windowData
  ]

  //--ONCE ON SERVER INIT FOR LOCAL STORAGE SETTING--//
  useEffect(() => {

    //find local storage, and handle
    if(typeof(Storage) !== "undefined"){
      var rootStyle = document.documentElement.style

      //if there is no wallpaper, set all to default
      if(localStorage.getItem("selectedWallpaper") == null){
        rootStyle.setProperty("--desktopWallpaper", "/Wallpapers/Wallpaper-WorldMachine.webp")
        rootStyle.setProperty("--globalColor", "#9665ff")
        rootStyle.setProperty("--globalColorHover", "#6a3ad1")
        rootStyle.setProperty("--globalHoverBorderColor", "rgba(106, 64, 197, 0.5)")
        rootStyle.setProperty("--globalHoverBackgroundColor", "rgba(44, 24, 87, 0.5)")
        
        localStorage.setItem("selectedWallpaper", "WorldMachine")
        localStorage.setItem("selectedTheme", "Purple")
        localStorage.setItem("desktopWallpaper", `url("/Wallpapers/Wallpaper-WorldMachine.webp")`)
        localStorage.setItem("globalColor", "#9665ff")
        localStorage.setItem("globalColorHover", "#6a3ad1")
        localStorage.setItem("globalHoverBorderColor", "rgba(106, 64, 197, 0.5)")
        localStorage.setItem("globalHoverBackgroundColor", "rgba(44, 24, 87, 0.5)")
        return
      }

      //set css properties according to last usage
      rootStyle.setProperty("--desktopWallpaper", localStorage.getItem("desktopWallpaper"))
      rootStyle.setProperty("--globalColor", localStorage.getItem("globalColor"))
      rootStyle.setProperty("--globalColorHover", localStorage.getItem("globalColorHover"))
      rootStyle.setProperty("--globalHoverBorderColor", localStorage.getItem("globalHoverBorderColor"))
      rootStyle.setProperty("--globalHoverBackgroundColor", localStorage.getItem("globalHoverBackgroundColor"))

      //set wallpaper and theme according to localStorage
      windowsHandler.handleSelectedWallpaper(localStorage.getItem("selectedWallpaper"))
      windowsHandler.handleSelectedTheme(localStorage.getItem("selectedTheme"))
      // handleCurrentArrayIndex(0)
    }
  }, [])

  
  //STUB: maybe add functionality for a "maximize" button (redirects the user to the window's webpage, and remembers what is currently open)
  //TODO: add a sorta "os-booting sqeuence" as a splashscreen

  return (
    <div className="layout">

      {loginOpen &&
        <div className="layout-content">
          <Login setLoginOpen={handleLoginOpen} setAlertOpen={windowsHandler.alert.openWindow} setErrorDescription={windowsHandler.handleAlertDescription}/>

          {/* alert dialogue window */}
          <WindowCreator {...getWindowCreationDataById("window-alert")}/>
        </div>
      }

      {/* DESKTOP */}
      {!loginOpen &&
        <div className="layout-content"> 
          {/* background image */}
          <Image className="backgroundVideo" src={`Wallpapers/Wallpaper-${windowsHandler.selectedWallpaper}.webp`} priority alt="wallpaper" width={100} height={100}/>

          {/* desktop/icons layout */}
          <ThemeProvider theme={theme}>

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
                <li className="time">{navbarHandler.currentTime}</li>
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