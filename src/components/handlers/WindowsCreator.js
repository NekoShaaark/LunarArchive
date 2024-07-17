"use client"

import { AnimatePresence, motion } from "framer-motion"
import WindowHeader from "@/components/WindowHeader"


export default function WindowCreator({ 
    windowOpen, 
    id, 
    windowRef,
    headerProps,
    PageComponent, 
    pageProps
}) {
    return (
        <AnimatePresence>
            {windowOpen &&
                <motion.div
                    id={id}
                    className="draggable"
                    ref={windowRef}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: 16 }}
                    transition={{ duration: 0.5 }}
                >
                    {/* false window header */}
                    <div id="draggable-header">
                        <WindowHeader {...headerProps}/>
                    </div>

                    {/* actual page reference */}
                    <PageComponent {...pageProps}/>
                </motion.div>
            }
        </AnimatePresence>
    )
}