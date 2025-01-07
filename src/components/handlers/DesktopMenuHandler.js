"use client"
import { useState } from "react"
import { WindowsHandler } from "@/components/handlers/WindowsHandler"
import { useAnimate } from 'framer-motion'


export function DesktopMenuHandler() { 
  const windowsHandler = WindowsHandler()
  const [sideMenuAnimation, sideMenuAnimate] = useAnimate()
  const [currentSideMenuOpen, setCurrentSideMenuOpen] = useState("User Info")
  const [desktopSideMenuFooter, setDesktopSideMenuFooter] = useState("v0.3.7")  //TODO: this needs to update automatically

  const [sideMenusOpenData, setSideMenusOpenData] = useState({
    lunarEclipse: false,
    nakoProjects: false,
    userInfo: true
  })

  const [desktopSideMenuContent, setDesktopSideMenuContent] = useState(
    <span>
      profile picture<br/>
      username<br/>
      more info<br/>
    </span>
  )


  const closeAllSideMenus = async (e) => {
    const updatedState = Object.keys(sideMenusOpenData).reduce((acc, key) => {
      acc[key] = false
      return acc
    }, {})
      
    setSideMenusOpenData(updatedState)
  }

  const menuAnimation = async (e) => {
    if(!sideMenuAnimation.current){ return }
  
    if(e == "sideMenuClose"){
      await sideMenuAnimate(sideMenuAnimation.current, { x: -240 }, { duration: 0.4, delay: 0 })
      sideMenuAnimate(sideMenuAnimation.current, { x: -240 }, { duration: 0.0, delay: 0 })
      return
    }
  
    if(e == "sideMenuOpen"){
      sideMenuAnimate(sideMenuAnimation.current, { x: 0 }, { duration: 0.4, delay: 0.2 })
      return
    }
  
    if(windowsHandler.windowsOpen.desktopMenu){
      await sideMenuAnimate(sideMenuAnimation.current, { x: -240, y: 18, opacity: 0 }, { duration: 0.0, delay: 0 })
      sideMenuAnimate(sideMenuAnimation.current, { x: 0, opacity: 1 }, { duration: 0.6, delay: 0.2 })
    }
    else{ sideMenuAnimate(sideMenuAnimation.current, { x: -120 }, { duration: 0.6, delay: 0 }) }
  }


  //side menu open handling
  const handleSideMenuOpen = async (menuOpen, menuName) => {
    if(windowsHandler.windowsOpen.alert || sideMenusOpenData[menuOpen]){ return }
    
    //close all menus (and closing animation)
    setCurrentSideMenuOpen(menuName)
    await menuAnimation("sideMenuClose")
    closeAllSideMenus()
    
    //open new menu
    setSideMenusOpenData(prevState => ({ ...prevState, [menuOpen]: true }))
    switch(menuOpen){
      case "lunarEclipse":
        setDesktopSideMenuContent(
          <span>
            genshin events<br/>
            date and time<br/>
          </span>
        )
        setDesktopSideMenuFooter("v0.3.6")
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
        setDesktopSideMenuFooter("v0.3.6")
        break
    }
      
    //(and opening animation)
    menuAnimation("sideMenuOpen")
  }


  //menu handling properties export object
  const handlingProps = {
    sideMenusOpen: sideMenusOpenData,
    sideMenuContent: desktopSideMenuContent,
    currentSideMenuOpen: currentSideMenuOpen,
    sideMenuAnimation: sideMenuAnimation,
    sideMenuFooter: desktopSideMenuFooter,

    handleSideMenuOpen: handleSideMenuOpen
  }

  return handlingProps
}