"use client"

import { Button } from '@mui/material'
import { AnimatePresence, motion } from 'framer-motion'


export default function DesktopHandler(){
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


export function NavbarIconButton({ windowOpen, className, onClick, Icon, label }){
    return(
        <AnimatePresence>
            {windowOpen &&
                <motion.li 
                    className={className}
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -6 }}
                    transition={{ duration: 0.5 }}
                >
                    <Button disableRipple onClick={onClick}>
                        <Icon width={24} height={24}/>
                        <span>{label}</span>
                    </Button>
                </motion.li>
            }
        </AnimatePresence>
    )
} 