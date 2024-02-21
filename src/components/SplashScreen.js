"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import anime from "animejs"
import styles from "@/styles/SplashScreen.module.css"


export default function SplashScreen({ finishLoading }) {
    const [isMounted, setIsMounted] = useState(false)

    // if(typeof window === "undefined"){ return }
    // import("@tauri-apps/api").then((tauri) => {    
        // use the api
        // tauri.window.appWindow.setPosition(new tauri.window.LogicalPosition(1000, 1000))
    // })
    

    const animate = () => {
        const loader = anime.timeline({
            // loop: true,
            complete: () => finishLoading(),
        })         
        loader.add({
            targets: "#splashLogo",
            translateY: 500,
            rotateZ: 270,
            duration: 0,
            opacity: 0,
            easing: "easeOutElastic(1, .8)"
        })
        .add({
            targets: "#splashLogo",
            translateY: 0,
            rotateZ: 0,
            duration: 3500,
            opacity: 1,
            easing: "easeOutElastic(1, .8)"
        })
        .add({
            targets: "#splashText",
            duration: 750,
            opacity: 1,
            easing: "easeOutElastic(1, .8)"
        }, "-=750")
    }

    useEffect(() => {
        const timeout = setTimeout(() => setIsMounted(true), 10)
        animate()
        return () => clearTimeout(timeout)
    })


    return (
        <div className={styles.splashDiv}>
            <Image priority id="splashLogo" className={styles.splashLogo} src="/eclipse.webp" alt="logo" width={320} height={320}/>
            <h1 id="splashText" className={styles.splashLogo}>Lunar Eclipse Project</h1>
        </div>
    )
}