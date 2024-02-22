"use client"

import { useState, useEffect } from 'react'
import { usePathname } from 'next/navigation'
import '@/styles/globals.css'
// import SplashScreen from '@/components/SplashScreen'
import Navbar from '@/components/Navbar'


export default function RootLayout({ children }) {
  const pathname = usePathname()
  const isHome = pathname === "/"
  const [isLoading, setIsLoading] = useState(isHome)

  useEffect(() => {
    if(isLoading){ return }
  }, [isLoading])


  return (
    <html lang="en">
      <head/>
      <body>
        {/* {isLoading && isHome ? (
          <SplashScreen finishLoading={() => setIsLoading(false)}/>
        ) : ( */}
          <>
            <div className="layout">
              <div className="layout-content">
                {children}
              </div>
              <div className="layout-nav"><Navbar/></div>
            </div>
          </>
        {/* )} */}
      </body>
    </html>
  )
}