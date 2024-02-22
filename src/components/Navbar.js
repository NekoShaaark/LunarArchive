"use client"

import { useState } from 'react'
import Link from 'next/link'
import { HomeIcon, ArchiveIcon, LogsIcon, NoteIcon } from '@/components/SvgHandler'


const Navbar = () => {
    const date = new Date()
    const now = date.toLocaleTimeString("en-US", { hour12:false, hour:"2-digit", minute:"2-digit" })
    const amORpm = date.getHours() >= 12 ? "PM" : "AM"
    
    const [currentTime, setCurrentTime] = useState(now + ` ${amORpm}`)

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
                    {/* TODO: when clicking on these, open the corresponding window */}
                    {/* <li className="home">{navbarContents("/", "Home", "home")}</li> */}
                    <li className="archive">{navbarContents("/", "Archive", "archive")}</li>
                    <li className="logs">{navbarContents("/", "Data Logs", "logs")}</li>
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