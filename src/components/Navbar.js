"use client"

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import Link from 'next/link'
import { HomeIcon, ArchiveIcon, LogsIcon, NoteIcon } from '@/components/SvgHandler'


const Navbar = () => {
    const pathname = usePathname()
    const date = new Date()
    const now = date.toLocaleTimeString("en-US", { hour12:false, hour:"2-digit", minute:"2-digit" })
    const amORpm = date.getHours() >= 12 ? "PM" : "AM"
    
    const [currentTime, setCurrentTime] = useState(now + ` ${amORpm}`)

    //runs at server build time (so it can access the "document")
    useEffect(() => {
        var rootStyle = document.documentElement.style
        
        //set navbarBackground and navbarSelected colors to show which page the user is on
        switch(pathname){
            case("/"):
                rootStyle.setProperty('--navbarHomeBackgroundColor', '#9665ff')
                rootStyle.setProperty('--navbarArchiveBackgroundColor', '#000')
                rootStyle.setProperty('--navbarLogsBackgroundColor', '#000')

                rootStyle.setProperty('--navbarHomeSelectedColor', '#000')
                rootStyle.setProperty('--navbarArchiveSelectedColor', '#9665ff')
                rootStyle.setProperty('--navbarLogsSelectedColor', '#9665ff')
                break
            
            case("/archive"):
                rootStyle.setProperty('--navbarHomeBackgroundColor', '#000')
                rootStyle.setProperty('--navbarArchiveBackgroundColor', '#9665ff')
                rootStyle.setProperty('--navbarLogsBackgroundColor', '#000')

                rootStyle.setProperty('--navbarHomeSelectedColor', '#9665ff')
                rootStyle.setProperty('--navbarArchiveSelectedColor', '#000')
                rootStyle.setProperty('--navbarLogsSelectedColor', '#9665ff')
                break
            
            case("/logs"):
                rootStyle.setProperty('--navbarHomeBackgroundColor', '#000')
                rootStyle.setProperty('--navbarArchiveBackgroundColor', '#000')
                rootStyle.setProperty('--navbarLogsBackgroundColor', '#9665ff')

                rootStyle.setProperty('--navbarHomeSelectedColor', '#9665ff')
                rootStyle.setProperty('--navbarArchiveSelectedColor', '#9665ff')
                rootStyle.setProperty('--navbarLogsSelectedColor', '#000')
                break
        }
    }, [pathname])

    const iconHandler = (iconName) => {
        switch(iconName){
            case "home": return( <HomeIcon width={24} height={24}/> )
            case "archive": return( <ArchiveIcon width={24} height={24}/> )
            case "logs": return( <LogsIcon width={24} height={24}/> )
        }
    }
        
    //navbar contents
    const navbarContents = (pagePath, displayName, iconName) => {
        return( 
            <Link href={pagePath}>
                {iconHandler(iconName)}
                <span>{displayName}</span>
            </Link>
        )
    }
    
    //clock function
    function updateTime() {
        const date = new Date()
        const amORpm = date.getHours() >= 12 ? "PM" : "AM"

        const newTime = date.toLocaleTimeString('en-US', { hour12:false, hour:"2-digit", minute:"2-digit" })
        setCurrentTime(newTime + ` ${amORpm}`)
    }
    setInterval(updateTime, 1000)


    //actual page
    return ( 
        <nav id="navbar" className="navigation">

            {/* primary */}
            <div className ="navigation-primary">
                <ul>
                    <li className="home">{navbarContents("/", "Home", "home")}</li>
                    <li className="archive">{navbarContents("/archive", "Archive", "archive")}</li>
                    <li className="logs">{navbarContents("/logs", "Data Logs", "logs")}</li>
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
    )
}
 
export default Navbar;