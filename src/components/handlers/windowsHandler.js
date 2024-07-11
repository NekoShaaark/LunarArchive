"use client"

export default function WindowsHandler() {

    // const [windowHandlers, setWindowHandlers] = useState({
    //     archive: {
    //         open: null,
    //         close: null,
    //         minimize: null
    //     }
    // })


    //--WINDOW OPEN/CLOSE/MINIMIZE/MAXIMIZE HANDLERS--//
    // const archiveHandleOpen = () => { 
        //if alert dialogue is open, allow nothing to be opened
        // if(windowsOpen.alert){ return }

        // if(denyAccess){
        //   alertHandleOpen()
        //   return
        // }

        // setCurrentFocusedWindow("archive")
        // setWindowsOpen({ ...windowsOpen, archive: true })
        
        // //check if window is minimized, if so, play animation to drag window back above navbar
        // if(windowsMinimized.archive){
        //   pullUpWindowAnimation("archive")
        //   setWindowsMinimized({ ...windowsMinimized, archive: false })
        // }

        // //check if entry doesn't exist, if so, add it (otherwise it will continuously add for every handleOpen() call) 
        // if(currentWindowsOpen.indexOf("archive") == -1){
        //   setNavbarOrder("open")
        //   setCurrentWindowsOpen([...currentWindowsOpen, "archive"]) //add "archive" to the array
        //   setCurrentNavbarIconsOpen([...currentNavbarIconsOpen, "archive"])
        // }
    // }


    //--ONCE ON SERVER INIT FOR HANDLER SETTING--//
    // useEffect(() => {

    //   //window handlers
    //   setWindowHandlers({
    //     archive: {
    //         // open: archiveHandleOpen,
    //         close: null,
    //         minimize: null
    //     }
    //   })
    // }, [])
}