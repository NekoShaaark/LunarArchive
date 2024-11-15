"use client"

import { motion } from "framer-motion"
import { DesktopMenuHandler } from "@/components/handlers/DesktopMenuHandler"
import { FolderIcon, MoonIcon, NoteIcon } from "@/components/SvgHandler"
import { MenuIconButton } from "@/components/creators/DesktopCreator"
import TypewriterEffect from "@/components/TypewriterEffect"


export default function DesktopMenu() {
    const desktopMenuHandler = DesktopMenuHandler()

    //STUB: maybe this can extracted into its own file
    const menuIconData = [
        {
            onClick: () => desktopMenuHandler.handleSideMenuOpen("lunarEclipse", "Lunar Eclipse"),
            Icon: MoonIcon,
            label: "Lunar Eclipse"
        },
        {
            onClick: () => desktopMenuHandler.handleSideMenuOpen("nakoProjects", `"I'm watching you."`),
            Icon: FolderIcon,
            label: "Nako Projects"
        },
        {
            onClick: () => desktopMenuHandler.handleSideMenuOpen("userInfo", "User Info"),
            Icon: NoteIcon,
            label: "User Info"
        }
    ]

    //actual page
    return (
        <motion.div 
            className="layout-menu"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 16 }}
            transition={{ duration: 0.5 }}
        >
        
            {/* left menu */}
            <div className="left-menu">
                <ul>
                    <span>
                        Selected: <TypewriterEffect text={desktopMenuHandler.currentSideMenuOpen} delay={30}/><br/>
                        ---
                    </span>
                    {menuIconData.map((data, index) => (
                        <MenuIconButton
                            key={index}
                            index={index}
                            onClick={data.onClick}
                            Icon={data.Icon}
                            label={data.label}
                        />
                    ))}
                </ul>
                     
                {/* bottom disclaimer */}
                <span style={{position:'fixed', bottom:0, left:0, padding:10, fontSize:"10px"}}>
                    <i>Disclaimer:<br/>
                    ~ Prototype - expect 3rrors ~</i>
                </span>
            </div>
        
            {/* right menu */}
            <motion.div 
                className="right-menu"
                ref={desktopMenuHandler.sideMenuAnimation}
                initial={{ opacity: 0, x: -240, y: 18 }}
                animate={{ opacity: 1, x: 0, y: 18 }}
                exit={{ opacity: 0, x: -100, transition: { duration: 0.6, delay: 0 } }}
                transition={{ duration: 0.6, delay: 0.2 }}
            >
                {desktopMenuHandler.sideMenuContent}
                <span style={{position:'fixed', bottom:0, right:0, padding:10}}>
                    {desktopMenuHandler.sideMenuFooter}
                </span>
            </motion.div>
                    
        </motion.div>
    )
}