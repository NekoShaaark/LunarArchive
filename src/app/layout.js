// "use client"

// import { useState, useEffect } from 'react'
// import { usePathname } from 'next/navigation'
import '@/styles/globals.css'
// import SplashScreen from '@/components/SplashScreen'

export const metadata = {
  title: "Lunar Archive",
  description: "Project under the alias of Lunar Archive"
}

export default function RootLayout({ children }) {
  // const pathname = usePathname()
  // const isHome = pathname === "/"
  // const [isLoading, setIsLoading] = useState(isHome)

  // useEffect(() => {
  //   if(isLoading){ return }
  // }, [isLoading])


  return (
    <html lang="en" suppressHydrationWarning={true}>
      <head/>
      <body suppressHydrationWarning={true}>
        {/* {isLoading && isHome ? (
          <SplashScreen finishLoading={() => setIsLoading(false)}/>
        ) : ( */}
          {children}
        {/* )} */}
      </body>
    </html>
  )
}