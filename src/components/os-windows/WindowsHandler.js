import { useState } from "react"


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
  
    //windows handling properties export object
    const handlingProps = {
        windowsOpen: windowsOpenData,
        windowsMinimized: windowsMinimizedData,

        onHandleDesktopMenu: handleDesktopMenuOpen,
        onHandleArchiveWindowOpen: handleArchiveWindowOpen,
        onHandleLogsWindowOpen: handleLogsWindowOpen,
        onHandleSettingsWindowOpen: handleSettingsWindowOpen,
        onHandleDocumentsWindow: handleDocumentsWindowOpen,
        onHandlePortfolioWindowOpen: handlePortfolioWindowOpen,
        onHandleImageViewerWindowOpen: handleImageViewerWindowOpen,
        onHandleAlertWindowOpen: handleAlertWindowOpen,
        onHandleTextEditorWindowOpen: handleTextEditorWindowOpen,

        onHandleArchiveWindowMinimize: handleArchiveWindowMinimize,
        onHandleLogsWindowMinimize: handleLogsWindowMinimize,
        onHandleSettingsWindowMinimize: handleSettingsWindowMinimize,
        onHandleDocumentsWindowMinimize: handleDocumentsWindowMinimize,
        onHandlePortfolioWindowMinimize: handlePortfolioWindowMinimize,
        onHandleImageViewerWindowMinimize: handleImageViewerWindowMinimize,
        onHandleTextEditorWindowMinimize: handleTextEditorWindowMinimize
    }
  
    return handlingProps
}