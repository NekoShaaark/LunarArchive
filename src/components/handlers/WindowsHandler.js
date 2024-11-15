"use client"
import { useState, useEffect } from "react"


export function WindowsHandler() {
    const [windowsOpenData, setWindowsOpenData] = useState({
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

    const [windowsMinimizedData, setWindowsMinimizedData] = useState({
        archive: false,
        logs: false,
        settings: false,
        documents: false,
        portfolio: false,
        imageViewer: false,
        textEditor: false
    })

    const [windowsMaximizedData, setWindowsMaximizedData] = useState({
        imageViewer: false
    })

    const [windowFocused, setWindowFocused] = useState("none")
    const [changeFocusedWindow, setChangeFocusedWindow] = useState(false)
    const [windowFocusedData, setWindowFocusedData] = useState({
        none: true,
        archive: false,
        logs: false,
        settings: false,
        documents: false,
        portfolio: false,
        imageViewer: false,
        alert: false,
        textEditor: false
    })
    

    useEffect(() => {
        resetFocusedWindowsData()
        setWindowFocusedData(prevState => ({ ...prevState, [windowFocused]: true }))
    }, [windowFocused])


    const resetFocusedWindowsData = async () => {
        const updatedState = Object.keys(windowFocusedData).reduce((acc, key) => {
            acc[key] = false
            return acc
        }, {})
        
        setWindowFocusedData(updatedState)
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
    const handleWindowFocused = async (e) => { setWindowFocused(e) }
    const handleChangeFocusedWindow = async (e) => { setChangeFocusedWindow(e) }
  

    //windows handling properties export object
    const handlingProps = {
        windowsOpen: windowsOpenData,
        windowsMinimized: windowsMinimizedData,
        windowsMaximized: windowsMaximizedData,
        windowFocused: windowFocused,
        windowFocusedData: windowFocusedData,
        changeFocusedWindow: changeFocusedWindow,

        handleFocusedWindow: handleWindowFocused,
        handleChangeFocusedWindow: handleChangeFocusedWindow,
        
        desktopMenu: { handleOpen: handleDesktopMenuOpen },
        alert: { handleOpen: handleAlertWindowOpen },

        archive: {
            handleOpen: handleArchiveWindowOpen,
            handleMinimize: handleArchiveWindowMinimize,
        },

        logs: {
            handleOpen: handleLogsWindowOpen,
            handleMinimize: handleLogsWindowMinimize
        },

        settings: {
            handleOpen: handleSettingsWindowOpen,
            handleMinimize: handleSettingsWindowMinimize
        },

        documents: {
            handleOpen: handleDocumentsWindowOpen,
            handleMinimize: handleDocumentsWindowMinimize
        },

        portfolio: {
            handleOpen: handlePortfolioWindowOpen,
            handleMinimize: handlePortfolioWindowMinimize
        },

        imageViewer: {
            handleOpen: handleImageViewerWindowOpen,
            handleMinimize: handleImageViewerWindowMinimize,
            handleMaximize: handleImageViewerWindowMaximize
        },

        textEditor: {
            handleOpen: handleTextEditorWindowOpen,
            handleMinimize: handleTextEditorWindowMinimize
        }
    }
  
    return handlingProps
}