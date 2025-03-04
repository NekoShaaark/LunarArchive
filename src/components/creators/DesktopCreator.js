"use client"

import { Button } from '@mui/material'
import { AnimatePresence, motion } from 'motion/react'


export default function DesktopCreator(){
    return(
        <></>
    )
}

export function DesktopIconButton({ index, className, onClick, Icon, label }){
    const duration = 0.3 + index * 0.2

    return(
        <AnimatePresence>
            <motion.div 
                id="icon"
                key={index}
                className={className}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration }}
            >
                <Button disableRipple onClick={onClick}>
                    <Icon width={56} height={56}/>
                    <h1>{label}</h1>
                </Button>
            </motion.div>
        </AnimatePresence>
    )
}


export function NavbarIconButton({ windowOpen, windowMinimized, windowFocused, className, onClick, Icon, label }){
    var openY = 0
    var focusedColor
    if(windowFocused){ openY = -4 }
    if(windowMinimized){ 
        focusedColor = "#6a3ad1"
    }

    return(
        <AnimatePresence>
            {windowOpen &&
                <motion.li 
                    className={className}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0, y: openY }}
                    exit={{ opacity: 0, x: -6 }}
                    transition={{ duration: 0.5 }}
                    // whileHover={{ y: 4 }}
                >
                    <Button style={{ color:focusedColor, fill:focusedColor }} disableRipple onClick={onClick}>
                        <Icon width={24} height={24}/>
                        <span>{label}</span>
                    </Button>
                </motion.li>
            }
        </AnimatePresence>
    )
} 


export function MenuIconButton({ index, onClick, Icon, label }){
    return(
        <AnimatePresence>
            <motion.li 
                key={index}
                onClick={onClick}
                initial={{ opacity: 0, scale: 0.75, z: 8, x: -32 }}
                animate={{ opacity: 1, scale: 1, z: 0, x: 0  }}
                transition={{ duration: (index*0.1) + 0.4 }}
                whileHover={{ x: 6 }}
            >
              <Icon width={18} height={18}/> 
              <span>{label}</span>
            </motion.li>
        </AnimatePresence>
    )
}