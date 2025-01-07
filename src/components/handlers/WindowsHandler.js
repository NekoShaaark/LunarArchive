"use client"
import { useAnimate } from "framer-motion"
import { useState, useEffect } from "react"
import { NavbarHandler } from "@/components/handlers/NavbarHandler"
import Archive from "@/app/archive/page"
import { AlertIcon, ArchiveIcon, FolderIcon, ImageViewerIcon, LogsIcon, MoonStarIcon, NoteIcon, PortfolioIcon } from "@/components/SvgHandler"
import Logs from "@/app/logs/page"
import Settings from "@/app/settings/page"
import AlertDialogue from "@/components/AlertDialogue"
import TextEditor from "@/components/TextEditor"
import ImageHandler from "../ImageHandler"
import Portfolio from "@/app/portfolio/page"
import Documents from "@/app/documents/page"


export function WindowsHandler() {
    const navbarHandler = NavbarHandler()

    //open windows states
    const [windowsOpenStack, setWindowsOpenStack] = useState([])
    const [windowsOpenData, setWindowsOpenData] = useState({
        none: true,
        desktopMenu: false,
        archive: false,
        logs: false,
        settings: false,
        documents: false,
        portfolio: false,
        imageViewer: false,
        alert: false,
        textEditor: false
    })

    //minimized windows states
    const [windowsMinimizedData, setWindowsMinimizedData] = useState({
        archive: false,
        logs: false,
        settings: false,
        documents: false,
        portfolio: false,
        imageViewer: false,
        textEditor: false
    })

    //maximized windows states
    const [windowsMaximizedData, setWindowsMaximizedData] = useState({
        imageViewer: false
    })

    //focused windows states 
    const [windowFocused, setWindowFocused] = useState("none")
    const [changeFocusedWindow, setChangeFocusedWindow] = useState(false)
    const [windowFocusedData, setWindowFocusedData] = useState({
        none: true,
        desktopMenu: false,
        archive: false,
        logs: false,
        settings: false,
        documents: false,
        portfolio: false,
        imageViewer: false,
        alert: false,
        textEditor: false
    })

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

    //windows animation states
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

    //misc. states
    const [documentsDirToOpen, setDocumentsDirToOpen] = useState("Documents")
    const [alertDescription, setAlertDescription] = useState()
    const [windowHeaderName, setWindowHeaderName] = useState()


    //handle dragging windows on server init & when dragging windows 
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
                if(windowsOpenData.alert){ return }

                //upon dragging/clicking-on, set that window that is being dragged to be the active window
                const windowId = e.target.parentElement.parentElement.id
                if(windowId.startsWith("window-")){
                    const activeWindow = windowId.slice(7) //remove "window-" prefix
                    setActiveWindow(activeWindow)
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


    //reset focused windows data on server init & on windowFocused change
    useEffect(() => {
        resetFocusedWindowsData()
        setWindowFocusedData(prevState => ({ ...prevState, [windowFocused]: true }))
        
        //remove item from windows open stack array and readd to end (handles which windows are open in which order)
        reorderWindowStack(windowsOpenStack, windowFocused)
    }, [windowsOpenData, windowFocused])


    //handle windows focus on server init & on windows open/focus/close
    useEffect(() => {
        // console.log("windows handler", windowsOpenData)

        const hasWindowsOpen = windowsOpenStack.length > 1 //more than just "none"
        const openWindowIndex = windowsOpenStack.length - 1 //currently open window
        const latestOpenWindowIndex = windowsOpenStack.length - 2 //window before currently active window
        const latestOpenWindow = windowsOpenStack[openWindowIndex]
        const nextOpenWindow = windowsOpenStack[latestOpenWindowIndex]

        //close desktopMenu if another window is focused, and shift focus to the new window 
        if(windowsOpenData.desktopMenu && windowFocused !== "desktopMenu"){
            handleDesktopMenuOpen(false)
            setActiveWindow(windowFocused)
            handleChangeFocusedWindow(false)
            return
        }

        //window focus handling
        if(changeFocusedWindow) {
            //if no windows open, focus "none"
            if(!hasWindowsOpen){ setActiveWindow("none") }

        //if focused window was closed (or minimized), set focus to the next available window
        else if(!windowsOpenData[latestOpenWindow] || windowsMinimizedData[latestOpenWindow]){ 
            if(windowsMinimizedData[nextOpenWindow]){ setActiveWindow("none"); return } //set active window to "none" if there is no active window after minimizing
            setActiveWindow(nextOpenWindow)
        }

            handleChangeFocusedWindow(false)
            return
        }

        //set active window to current focused if focus doesn't need to change
        setActiveWindow(windowFocused)
    }, [windowsOpenData, windowFocused, windowsOpenStack, changeFocusedWindow])


    //handle windows minimization on server init & windows minimize
    useEffect(() => {
        //convert all windows into an array to be filtered through below
        const windows = Object.keys(windowsMinimizedData)

        //play animation to drop window below navbar
        windows.forEach(window => {
            if(windowsMinimizedData[window]){ 
                handleChangeFocusedWindow(true)
                dropWindowAnimation(window)
            }
        })
    }, [windowsMinimizedData])


    //handle windows maximization on server init & windows maximize
    useEffect(() => {

        //play animation to maximize window
        if(windowsMaximizedData.imageViewer){
            enlargeWindowAnimation("imageViewer")
            document.getElementById("window-imageViewer").setAttribute("style", "width:100%; height:100%; top:0; left:0; border-width:0")
        }
        else if(!windowsMaximizedData.imageViewer && windowsOpenData.imageViewer){
            shrinkWindowAnimation("imageViewer")
            document.getElementById("window-imageViewer").setAttribute("style", "width:fit-content; height:fit-content; top:140px; left:360px; border-width:4px")
        }
    }, [windowsMaximizedData])


    //set Ivy and Notus handler objects here (on server init)
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


    const resetFocusedWindowsData = async () => {
        const updatedState = Object.keys(windowFocusedData).reduce((acc, key) => {
            acc[key] = false
            return acc
        }, {})
        
        setWindowFocusedData(updatedState)
    }

    const reorderWindowStack = async (array, window) => { 
        const index = array.indexOf(window)
        if(index !== -1){ array.splice(index, 1) }
        array.push(window)

        let filteredArray = array.filter(item => windowsOpenData[item])
        setWindowsOpenStack(filteredArray)
    }

    //set currently active window
    function setActiveWindow(currentActiveWindow){

        //create array of all windows
        const allWindowsArray = Object.keys(windowsOpenData)
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
            const index = windowsOpenStack.indexOf(id)
            acc[id] = index + (id == "alert" ? 20 : 10)
            return acc
        }, {})
    
        //check if active window is none
        if(currentActiveWindow == "none"){
            Object.values(windows).forEach(window => {
                if(window){ window.style.zIndex = 9 }
            })

            navbarHandler.setNavbarColors("none")
            handleFocusedWindow("none")
            return
        }

        //set all windows' zIndex
        //if window exists, set zIndex to above grabbed zIndex, otherwise set to null
        allWindowsArray.forEach(id => {
            if(windows[id]){ windows[id].style.zIndex = windowsIndexes[id] }
        })

        //set navbarColors and focusedWindow
        handleFocusedWindow(currentActiveWindow)
        navbarHandler.setNavbarColors(currentActiveWindow)
        navbarHandler.setNavbarOrder()
    }


    //windows open handling
    const handleDesktopMenuOpen = async (e) => { setWindowsOpenData({ ...windowsOpenData, desktopMenu: e }) }
    const handleArchiveWindowOpen = async (e) => { setWindowsOpenData({ ...windowsOpenData, archive: e }) }
    const handleLogsWindowOpen = async (e) => { setWindowsOpenData({ ...windowsOpenData, logs: e }) }
    const handleSettingsWindowOpen = async (e) => { setWindowsOpenData({ ...windowsOpenData, settings: e }) }
    const handleDocumentsWindowOpen = async (e) => { setWindowsOpenData({ ...windowsOpenData, documents: e }) }
    const handlePortfolioWindowOpen = async (e) => { setWindowsOpenData({ ...windowsOpenData, portfolio: e }) }
    const handleImageViewerWindowOpen = async (e) => { setWindowsOpenData({ ...windowsOpenData, imageViewer: e }) }
    const handleAlertWindowOpen = async (e) => { setWindowsOpenData({ ...windowsOpenData, alert: e }) }
    const handleTextEditorWindowOpen = async (e) => { setWindowsOpenData({ ...windowsOpenData, textEditor: e }) }

    //windows minimizing handling
    const handleArchiveWindowMinimize = async (e) => { setWindowsMinimizedData({ ...windowsMinimizedData, archive: e }) }
    const handleLogsWindowMinimize = async (e) => { setWindowsMinimizedData({ ...windowsMinimizedData, logs: e }) }
    const handleSettingsWindowMinimize = async (e) => { setWindowsMinimizedData({ ...windowsMinimizedData, settings: e }) }
    const handleDocumentsWindowMinimize = async (e) => { setWindowsMinimizedData({ ...windowsMinimizedData, documents: e }) }
    const handlePortfolioWindowMinimize = async (e) => { setWindowsMinimizedData({ ...windowsMinimizedData, portfolio: e }) }
    const handleImageViewerWindowMinimize = async (e) => { setWindowsMinimizedData({ ...windowsMinimizedData, imageViewer: e }) }
    const handleTextEditorWindowMinimize = async (e) => { setWindowsMinimizedData({ ...windowsMinimizedData, textEditor: e }) }

    //windows maximizing handling
    const handleImageViewerWindowMaximize = async (e) => { setWindowsMaximizedData({ ...windowsMaximizedData, imageViewer: e }) }

    //windows focused handling
    const handleFocusedWindow = async (e) => { setWindowFocused(e) }
    const handleChangeFocusedWindow = async (e) => { setChangeFocusedWindow(e) }

    //image viewer handling
    const handleIvyImage = async (e) => { if(!e){ return } setCurrentIvyImage(e) }
    const handleIvyImageWidth = async (e) => { if(!e){ return } setIvyImageWidth(e) }
    const handleIvyImageHeight = async (e) => { if(!e){ return } setIvyImageHeight(e) }
    const handleIvyImageDescription = async (e) => { if(!e){ return } setIvyImageDescription(e) }
    const handleIvyHeaderName = async (e) => { if(!e){ return } setIvyImageHeaderName(e) }
    const handleIvyArrayIndex = async (e) => { if(!e){ e = 0 } setIvyArrayIndex(e) }

    //text editor handling 
    const handleNotusText = async (e) => { if(!e){ return } setCurrentNotusText(e) }
    const handleNotusHeaderName = async (e) => { if(!e){ return } setNotusHeaderName(e) }
    const handleCurrentNotusFile = async (e) => { if(!e){ return } setCurrentNotusFile(e) }

    //desktop settings handling
    const handleSelectedWallpaper = async (e) => { if(!e){ return } setSelectedWallpaper(e) }
    const handleSelectedTheme = async (e) => { if(!e){ return } setSelectedTheme(e) }
    const handleCurrentArrayIndex = async (e) => { if(!e){ e = 0 } setCurrentArrayIndex(e) }

    //misc. states handling
    const handleDocumentsDirToOpen = async (e) => { if(!e){ return } setDocumentsDirToOpen(e) }
    const handleAlertDescription = async (e) => { setAlertDescription(e) }
    const handleWindowHeaderName = async (e) => { setWindowHeaderName(e) }


    //minimize animations
    //REVIEW: these animations might need to change to be more dynamic, or look better
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

    //maximize animations
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


    //window open/close/minimize/maximize handlers
    const archiveHandleOpen = async () => { 
        //if alert dialogue is open, allow nothing to be opened
        if(windowsOpenData.alert){ return }
    
        handleFocusedWindow("archive")
        handleArchiveWindowOpen(true)
        
        //check if window is minimized, if so, play animation to drag window back above navbar
        if(windowsMinimizedData.archive){
            pullUpWindowAnimation("archive")
            handleArchiveWindowMinimize(false)
        }
        
        //check if is already on navbar, and add to navbar if not already there
        if(!navbarHandler.navbarIconsOpen.archive){
            navbarHandler.setNavbarOrder()
            navbarHandler.archive.handleOpen(true)
        }
    }
    const archiveHandleClose = async () => { 
        //if alert dialogue is open, allow nothing to be closed
        if(windowsOpenData.alert){ return }
    
        handleChangeFocusedWindow(true)
        handleArchiveWindowOpen(false)
        navbarHandler.archive.handleOpen(false)
    }
    const archiveHandleMinimize = async () => {
        //if alert dialogue is open, allow nothing to be minimized
        if(windowsOpenData.alert){ return }
    
        handleChangeFocusedWindow(true) 
        handleArchiveWindowMinimize(true)
    }

    const logsHandleOpen = () => { 
        //if alert dialogue is open, allow nothing to be opened
        if(windowsOpenData.alert){ return }
    
        if(denyAccess){
            alertHandleOpen()
            return
        }
    
        handleFocusedWindow("logs") 
        handleLogsWindowOpen(true)
    
        //check if window is minimized, if so, play animation to drag window back above navbar
        if(windowsMinimizedData.logs){
            pullUpWindowAnimation("logs")
            handleLogsWindowMinimize(false)
        }
    
        //check if entry doesn't exist, if so, add it (otherwise it will continuously add for every handleOpen() call) 
        if(!navbarHandler.navbarIconsOpen.logs){
            navbarHandler.setNavbarOrder()
            navbarHandler.archive.handleOpen(true)
        }
    }
    const logsHandleClose = () => { 
        //if alert dialogue is open, allow nothing to be closed
        if(windowsOpenData.alert){ return }
    
        handleChangeFocusedWindow(true) 
        handleLogsWindowOpen(false)
        navbarHandler.logs.handleOpen(false)
    }
    const logsHandleMinimize = () => {
        //if alert dialogue is open, allow nothing to be minimized
        if(windowsOpenData.alert){ return }
    
        handleChangeFocusedWindow(true) 
        handleLogsWindowMinimize(true)
    }

    const settingsHandleOpen = () => { 
        //if alert dialogue is open, allow nothing to be opened
        if(windowsOpenData.alert){ return }
    
        handleFocusedWindow("settings") 
        handleSettingsWindowOpen(true)
    
        //check if window is minimized, if so, play animation to drag window back above navbar
        if(windowsMinimizedData.settings){
            pullUpWindowAnimation("settings")
            handleSettingsWindowMinimize(false)
        }
    
        //check if entry doesn't exist, if so, add it (otherwise it will continuously add for every handleOpen() call) 
        if(!navbarHandler.navbarIconsOpen.settings){
            navbarHandler.setNavbarOrder()
            navbarHandler.settings.handleOpen(true)
        }
    }
    const settingsHandleClose = () => { 
        //if alert dialogue is open, allow nothing to be closed
        if(windowsOpenData.alert){ return }
    
        handleChangeFocusedWindow(true) 
        handleSettingsWindowOpen(false)
        navbarHandler.settings.handleOpen(false)
    }
    const settingsHandleMinimize = () => {
        //if alert dialogue is open, allow nothing to be minimized
        if(windowsOpenData.alert){ return }
    
        handleChangeFocusedWindow(true) 
        handleSettingsWindowMinimize(true)
    }

    const documentsHandleOpen = () => { 
        //if alert dialogue is open, allow nothing to be opened
        if(windowsOpenData.alert){ return }
    
        handleFocusedWindow("documents") 
        handleDocumentsWindowOpen(true)
    
        //check if window is minimized, if so, play animation to drag window back above navbar
        if(windowsMinimizedData.documents){
            pullUpWindowAnimation("documents")
            handleDocumentsWindowMinimize(false)
        }
    
        //check if entry doesn't exist, if so, add it (otherwise it will continuously add for every handleOpen() call) 
        if(!navbarHandler.navbarIconsOpen.documents){
            navbarHandler.setNavbarOrder()
            navbarHandler.documents.handleOpen(true)
        }
    }
    const documentsHandleClose = () => {
        //if alert dialogue is open, allow nothing to be closed
        if(windowsOpenData.alert){ return }
        
        handleChangeFocusedWindow(true) 
        handleDocumentsWindowOpen(false)
        navbarHandler.documents.handleOpen(false)
    }
    const documentsHandleMinimize = () => {
        //if alert dialogue is open, allow nothing to be minimized
        if(windowsOpenData.alert){ return }
    
        handleChangeFocusedWindow(true) 
        handleDocumentsWindowMinimize(true)
    }

    const portfolioHandleOpen = () => { 
        //if alert dialogue is open, allow nothing to be opened
        if(windowsOpenData.alert){ return }
    
        handleFocusedWindow("portfolio") 
        handlePortfolioWindowOpen(true)
    
        //check if window is minimized, if so, play animation to drag window back above navbar
        if(windowsMinimizedData.portfolio){
            pullUpWindowAnimation("portfolio")
            handlePortfolioWindowMinimize(false)
        }
    
        //check if entry doesn't exist, if so, add it (otherwise it will continuously add for every handleOpen() call) 
        if(!navbarHandler.navbarIconsOpen.portfolio){
            navbarHandler.setNavbarOrder()
            navbarHandler.portfolio.handleOpen(true)
        }
    }
    const portfolioHandleClose = () => { 
        //if alert dialogue is open, allow nothing to be closed
        if(windowsOpenData.alert){ return }
    
        handleChangeFocusedWindow(true) 
        handlePortfolioWindowOpen(false)
        navbarHandler.portfolio.handleOpen(false)
    }
    const portfolioHandleMinimize = () => {
        //if alert dialogue is open, allow nothing to be minimized
        if(windowsOpenData.alert){ return }
    
        handleChangeFocusedWindow(true) 
        handlePortfolioWindowMinimize(true)
    }

    const imageViewerHandleOpen = () => { 
        //if alert dialogue is open, allow nothing to be opened
        if(windowsOpenData.alert){ return }
    
        handleFocusedWindow("imageViewer") 
        handleImageViewerWindowOpen(true)
    
        //check if window is minimized, if so, play animation to drag window back above navbar
        if(windowsMinimizedData.imageViewer){
            pullUpWindowAnimation("imageViewer")
            handleImageViewerWindowMinimize(false)
        }
    
        //check if entry doesn't exist, if so, add it (otherwise it will continuously add for every handleOpen() call) 
        if(!navbarHandler.navbarIconsOpen.imageViewer){
            navbarHandler.setNavbarOrder()
            navbarHandler.imageViewer.handleOpen(true)
        }
    }
    const imageViewerHandleClose = () => { 
        //if alert dialogue is open, allow nothing to be closed
        if(windowsOpenData.alert){ return }
    
        handleChangeFocusedWindow(true) 
        handleImageViewerWindowOpen(false)
        handleImageViewerWindowMaximize(false)
        navbarHandler.imageViewer.handleOpen(false)
        document.onkeyup = null  //detach onkeyup event listener
    }
    const imageViewerHandleMinimize = () => {
        //if alert dialogue is open, allow nothing to be minimized
        if(windowsOpenData.alert){ return }
    
        handleChangeFocusedWindow(true) 
        handleImageViewerWindowMinimize(true)
    }
    const imageViewerHandleMaximize = () => {
        //if alert dialogue is open, allow nothing to be maximized
        if(windowsOpenData.alert){ return }
    
        if(!windowsMaximizedData.imageViewer){ handleImageViewerWindowMaximize(true) }
        else{ handleImageViewerWindowMaximize(false) }
        handleChangeFocusedWindow(true)
    }

    const alertHandleOpen = () => { 
        handleFocusedWindow("alert") 
        handleAlertWindowOpen(true)
    
        //check if entry doesn't exist, if so, add it (otherwise it will continuously add for every handleOpen() call) 
        if(!navbarHandler.navbarIconsOpen.alert){
            navbarHandler.setNavbarOrder()
            navbarHandler.alert.handleOpen(true)
        }
    }
    const alertHandleClose = () => { 
        handleChangeFocusedWindow(true) 
        handleAlertWindowOpen(false)
        navbarHandler.alert.handleOpen(false)
    }

    const textEditorHandleOpen = () => { 
        //if alert dialogue is open, allow nothing to be opened
        if(windowsOpenData.alert){ return }

        handleFocusedWindow("textEditor") 
        handleTextEditorWindowOpen(true)

        //check if window is minimized, if so, play animation to drag window back above navbar
        if(windowsMinimizedData.textEditor){
            pullUpWindowAnimation("textEditor")
            handleTextEditorWindowMinimize(false)
        }

        //check if entry doesn't exist, if so, add it (otherwise it will continuously add for every handleOpen() call) 
        if(!navbarHandler.navbarIconsOpen.textEditor){
            navbarHandler.setNavbarOrder()
            navbarHandler.textEditor.handleOpen(true)
        }
    }
    const textEditorHandleClose = () => { 
        //if alert dialogue is open, allow nothing to be closed
        if(windowsOpenData.alert){ return }

        handleChangeFocusedWindow(true) 
        handleTextEditorWindowOpen(false)
        navbarHandler.textEditor.handleOpen(false)
    }
    const textEditorHandleMinimize = () => {
        //if alert dialogue is open, allow nothing to be minimized
        if(windowsOpenData.alert){ return }

        handleChangeFocusedWindow(true) 
        handleTextEditorWindowMinimize(true)
    }


    // const templateWindowData =
    // {
    //     windowOpen: windowsOpenData.NAMEHERE,
    //     id: "window-NAMEHERE",
    //     windowRef: NAMEHEREWindowAnimation,
    //     headerProps: {
    //         headerName: "NAME HERE",
    //         Icon: null,
    //         setClose: null,
    //         setMinimize: null,
    //     },
    //     PageComponent: null,
    //     pageProps: {
    //         //no page props
    //     }
    // }

    const archiveWindowData =
    {
        windowOpen: windowsOpenData.archive,
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
    }

    const logsWindowData =
    {
        windowOpen: windowsOpenData.logs,
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
            //no page props
        }
    }

    const settingsWindowData =
    {
        windowOpen: windowsOpenData.settings,
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
            setNotusOpen: textEditorHandleOpen,
            setAlertOpen: alertHandleOpen,
            setErrorDescription: handleAlertDescription,
            notusHandlers: notusHandlers,
            selectedWallpaper: selectedWallpaper,
            selectedTheme: selectedTheme,
            currentArrayIndex: currentArrayIndex,
        }
    }

    const documentsWindowData =
    {
        windowOpen: windowsOpenData.documents,
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
            ivyHandlers: ivyHandlers,
            notusHandlers: notusHandlers,
            setHeaderName: handleWindowHeaderName,
            setArchiveOpen: archiveHandleOpen,
            setAlertOpen: alertHandleOpen,
            setIvyOpen: imageViewerHandleOpen,
            setNotusOpen: textEditorHandleOpen,
            setErrorDescription: handleAlertDescription
        }
    }

    const portfolioWindowData =
    {
        windowOpen: windowsOpenData.portfolio,
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
    }

    const imageViewerWindowData =
    {
        windowOpen: windowsOpenData.imageViewer,
        id: "window-imageViewer",
        windowRef: imageViewerWindowAnimation,
        headerProps: {
            headerName: `Ivy - ${ivyImageHeaderName}`,
            Icon: ImageViewerIcon,
            setClose: imageViewerHandleClose,
            setMinimize: imageViewerHandleMinimize,
            setMaximize: imageViewerHandleMaximize,
            keepMaximize: true,
            maximized: windowsMaximizedData.imageViewer
        },
        PageComponent: ImageHandler,
        pageProps: {
            selectedImage: currentIvyImage,
            isOpen: windowsOpenData.imageViewer,
            isMaximized: windowsMaximizedData.imageViewer,
            imageWidth: ivyImageWidth,
            imageHeight: ivyImageHeight,
            imageDescription: ivyImageDescription,
            imageArrayIndex: ivyArrayIndex,
            setHeaderName: handleIvyHeaderName,
            imageHeader: ivyImageHeaderName
        }
    }

    const alertWindowData = 
    {
        windowOpen: windowsOpenData.alert,
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
    }

    const textEditorWindowData =
    {
        windowOpen: windowsOpenData.textEditor,
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
            isOpen: windowsOpenData.textEditor,
            selectedText: currentNotusText,
            selectedMdxFile: currentNotusFile 
        }
    }
  

    //windows handling properties export object
    const handlingProps = {
        windowsStack: windowsOpenStack,
        windowsOpen: windowsOpenData,
        windowsMinimized: windowsMinimizedData,
        windowsMaximized: windowsMaximizedData,
        windowFocused: windowFocused,
        windowFocusedData: windowFocusedData,
        changeFocusedWindow: changeFocusedWindow,
        
        selectedWallpaper: selectedWallpaper,
        selectedTheme: selectedTheme,
        currentArrayIndex: currentArrayIndex,
        alertDescription: alertDescription,
        windowHeaderName: windowHeaderName,
        documentsDirToOpen: documentsDirToOpen,
        ivyHandlers: ivyHandlers,
        notusHandlers: notusHandlers,
        
        setActiveWindow: setActiveWindow,
        handleFocusedWindow: handleFocusedWindow,
        handleChangeFocusedWindow: handleChangeFocusedWindow,
        pullUpWindowAnimation: pullUpWindowAnimation,
        dropWindowAnimation: dropWindowAnimation,

        handleSelectedWallpaper: handleSelectedWallpaper,
        handleSelectedTheme: handleSelectedTheme,
        handleCurrentArrayIndex: handleCurrentArrayIndex,
        handleDocumentsDirToOpen: handleDocumentsDirToOpen,
        handleAlertDescription: handleAlertDescription,
        handleWindowHeaderName: handleWindowHeaderName,
        
        desktopMenu: { handleOpen: handleDesktopMenuOpen },
        alert: { handleOpen: handleAlertWindowOpen },

        archive: {
            windowData: archiveWindowData,
            windowAnimation: archiveWindowAnimation,
            windowAnimate: archiveAnimate,
            openWindow: archiveHandleOpen,
            closeWindow: archiveHandleClose,
            minimizeWindow: archiveHandleMinimize
        },

        logs: {
            windowData: logsWindowData,
            windowAnimation: logsWindowAnimation,
            windowAnimate: logsAnimate,
            openWindow: logsHandleOpen,
            closeWindow: logsHandleClose,
            minimizeWindow: logsHandleMinimize
        },

        settings: {
            windowData: settingsWindowData,
            windowAnimation: settingsWindowAnimation,
            windowAnimate: settingsAnimate,
            openWindow: settingsHandleOpen,
            closeWindow: settingsHandleClose,
            minimizeWindow: settingsHandleMinimize
        },

        documents: {
            windowData: documentsWindowData,
            windowAnimation: documentsWindowAnimation,
            windowAnimate: documentsAnimate,
            openWindow: documentsHandleOpen,
            closeWindow: documentsHandleClose,
            minimizeWindow: documentsHandleMinimize
        },

        portfolio: {
            windowData: portfolioWindowData,
            windowAnimation: portfolioWindowAnimation,
            windowAnimate: portfolioAnimate,
            openWindow: portfolioHandleOpen,
            closeWindow: portfolioHandleClose,
            minimizeWindow: portfolioHandleMinimize
        },

        imageViewer: {
            windowData: imageViewerWindowData,
            windowAnimation: imageViewerWindowAnimation,
            windowAnimate: imageViewerAnimate,
            openWindow: imageViewerHandleOpen,
            closeWindow: imageViewerHandleClose,
            minimizeWindow: imageViewerHandleMinimize,
            maximizeWindow: imageViewerHandleMaximize,
            currentImage: currentIvyImage,
            imageWidth: ivyImageWidth,
            imageHeight: ivyImageHeight,
            imageDescription: ivyImageDescription
        },

        alert: {
            windowData: alertWindowData,
            openWindow: alertHandleOpen,
            closeWindow: alertHandleClose
        },

        textEditor: {
            windowData: textEditorWindowData,
            windowAnimation: textEditorWindowAnimation,
            windowAnimate: textEditorAnimate,
            openWindow: textEditorHandleOpen,
            closeWindow: textEditorHandleClose,
            minimizeWindow: textEditorHandleMinimize
        }
    }
  
    return handlingProps
}