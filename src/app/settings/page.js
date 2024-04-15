import { useEffect, useState } from 'react'
import { Button, ThemeProvider, createTheme } from '@mui/material'
import { LeftIcon, RightIcon } from '@/components/SvgHandler'
import styles from '@/styles/Settings.module.css'

//--THEME--//
const theme = createTheme({
  typography: {
    fontFamily: 'eightbitFortress'
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          padding: 0,
          minWidth: '32px',
          '&:hover': {
            backgroundColor: '#d13a3a'
          }, 
        }
      },
    },
  }
})


export default function Settings() {
  const wallpaperArray = ["Asteroid", "Starry", "WorldMachine"]
  const themeArray = ["Purple", "Red", "Blue", "Green"]
  const [selectedWallpaper, setSelectedWallpaper] = useState(localStorage.getItem("selectedWallpaper"))
  const [selectedTheme, setSelectedTheme] = useState(localStorage.getItem("selectedTheme"))
  const [currentArrayIndex, setCurrentArrayIndex] = useState(0)


  useEffect(() => {
    var rootStyle = document.documentElement.style
    var wallpaper = `/Wallpapers/Wallpaper-${selectedWallpaper}.webp`
    var globalColor
    var globalColorHover
    var globalHoverBorderColor
    var globalHoverBackgroundColor

    switch(selectedTheme){
      case "Purple": 
        globalColor = "#9665ff"
        globalColorHover = "#6a3ad1"
        globalHoverBorderColor = "rgba(106, 64, 197, 0.5)"
        globalHoverBackgroundColor = "rgba(44, 24, 87, 0.5)"
        break

      case "Red":
        globalColor = "#c31c1c"
        globalColorHover = "#d13a3a"
        globalHoverBorderColor = "rgba(197, 64, 64, 0.5)"
        globalHoverBackgroundColor = "rgba(87, 24, 24, 0.5)"
        break

      case "Blue":
        globalColor = "#9665ff"
        globalColorHover = "#6a3ad1"
        globalHoverBorderColor = "rgba(106, 64, 197, 0.5)"
        globalHoverBackgroundColor = "rgba(44, 24, 87, 0.5)"
        break

      case "Green":
        globalColor = "#c31c1c"
        globalColorHover = "#d13a3a"
        globalHoverBorderColor = "rgba(197, 64, 64, 0.5)"
        globalHoverBackgroundColor = "rgba(87, 24, 24, 0.5)"
        break
    }

    rootStyle.setProperty("--desktopWallpaper", `url("${wallpaper}")`)
    rootStyle.setProperty("--globalColor", globalColor)
    rootStyle.setProperty("--globalColorHover", globalColorHover)
    rootStyle.setProperty("--globalHoverBorderColor", globalHoverBorderColor)
    rootStyle.setProperty("--globalHoverBackgroundColor", globalHoverBackgroundColor)
    console.log("set color to: " + selectedTheme)

    //if can, store css properties as local data
    if(typeof(Storage) !== "undefined"){
      localStorage.setItem("selectedWallpaper", selectedWallpaper)
      localStorage.setItem("selectedTheme", selectedTheme)
      localStorage.setItem("desktopWallpaper", `url("${wallpaper}")`)
      localStorage.setItem("globalColor", globalColor)
      localStorage.setItem("globalColorHover", globalColorHover)
      localStorage.setItem("globalHoverBorderColor", globalHoverBorderColor)
      localStorage.setItem("globalHoverBackgroundColor", globalHoverBackgroundColor)
    }
  }, [selectedWallpaper, selectedTheme])


  function cycleArray(array, direction){    
    //determine array direction
    var newArrayIndex
    if(direction == "upwards"){ newArrayIndex = currentArrayIndex + 1 }
    if(direction == "downwards"){ newArrayIndex = currentArrayIndex - 1 }
    
    //go to the other side of the array, if goes outside of array length
    if(newArrayIndex >= array.length){ newArrayIndex = 0 }
    if(newArrayIndex < 0){ newArrayIndex = wallpaperArray.length - 1 }
    setCurrentArrayIndex(newArrayIndex)
    // console.log("array: " + newArrayIndex)

    //update selection
    switch(array){
      case wallpaperArray:
        setSelectedWallpaper(wallpaperArray[newArrayIndex])
        break

      case themeArray:
        setSelectedTheme(themeArray[newArrayIndex])
        break
    }
  }


  return (
    <>
      <ThemeProvider theme={theme}>
        <div className={styles.grid}>

          <section className={styles.section}>
            <h1 className={styles.name}>Wallpaper</h1>
            <div className={styles.button}>

              <Button className={styles.icon} disableRipple onClick={() => cycleArray(wallpaperArray, "downwards")}>
                <LeftIcon width="3vh" height="3vh"/>
              </Button>

              <h2 className={styles.name}>{selectedWallpaper}</h2>

              <Button className={styles.icon} disableRipple onClick={() => cycleArray(wallpaperArray, "upwards")}>
                <RightIcon width="3vh" height="3vh"/>
              </Button>

            </div>
          </section>

          <section className={styles.section}>
            <h1 className={styles.name}>Brightness</h1>
          </section>

          <section className={styles.section}>
            <h1 className={styles.name}>Theme</h1>
            <div className={styles.button}>

              <Button className={styles.icon} disableRipple onClick={() => cycleArray(themeArray, "downwards")}>
                <LeftIcon width="3vh" height="3vh"/>
              </Button>

              <h2 className={styles.name}>{selectedTheme}</h2>

              <Button className={styles.icon} disableRipple onClick={() => cycleArray(themeArray, "upwards")}>
                <RightIcon width="3vh" height="3vh"/>
              </Button>

            </div>
          </section>

          <section className={styles.section}>
            <h1 className={styles.name}>Music Volume</h1>
          </section>

          <section className={styles.section}>
            <h1 className={styles.name}>View Wallpaper</h1>
          </section>

          <section className={styles.section}>
            <h1 className={styles.name}>Sound Volume</h1>
          </section>

        </div>
      </ThemeProvider>
    </>
  )
}